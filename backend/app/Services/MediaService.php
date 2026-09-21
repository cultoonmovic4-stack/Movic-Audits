<?php

namespace App\Services;

use App\Models\Media;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;
use RuntimeException;

class MediaService
{
    /**
     * Strictly allowed image MIME types for Phase 1 per ADR v1.1.1.
     * SVG is strictly prohibited.
     */
    public const ALLOWED_MIMES = [
        'image/jpeg',
        'image/png',
        'image/webp',
    ];

    /**
     * Maximum upload size: 10 Megabytes in bytes.
     */
    public const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10,485,760 bytes

    /**
     * Store an uploaded media asset with strict security validation.
     *
     * @throws AuthorizationException
     * @throws InvalidArgumentException
     * @throws RuntimeException
     */
    public function upload(UploadedFile $file, ?string $altText = null, ?User $user = null): Media
    {
        // 1. Authenticated authorization verification
        $uploader = $user ?? auth()->user();
        if (! $uploader || ! method_exists($uploader, 'isAdmin') || ! $uploader->isAdmin()) {
            throw new AuthorizationException('Unauthorized: Media upload requires administrative privileges.');
        }

        // 2. Maximum file size enforcement (10 MB)
        if ($file->getSize() > self::MAX_UPLOAD_BYTES) {
            throw new InvalidArgumentException(
                sprintf('File size [%d bytes] exceeds maximum limit of 10 MB.', $file->getSize())
            );
        }

        // 3. MIME type validation (Framework & Client)
        $clientMime = strtolower($file->getMimeType() ?: '');
        if (! in_array($clientMime, self::ALLOWED_MIMES, true)) {
            throw new InvalidArgumentException("Unsupported media type [{$clientMime}]. Strictly JPEG, PNG, and WebP are allowed.");
        }

        // 4. Server-side magic-byte inspection
        $this->verifyMagicBytes($file);

        // 5. Storage with secure random UUID filename
        $disk = config('filesystems.default', 'public');
        $directory = 'media/' . date('Y/m');
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension());

        // Ensure extension matches allowed MIME
        if (! in_array($extension, ['jpg', 'jpeg', 'png', 'webp'], true)) {
            $extension = match ($clientMime) {
                'image/jpeg' => 'jpg',
                'image/png' => 'png',
                'image/webp' => 'webp',
                default => throw new InvalidArgumentException('Invalid file extension.'),
            };
        }

        $filename = Str::uuid() . '.' . $extension;
        $path = $file->storeAs($directory, $filename, $disk);

        if (! $path) {
            throw new RuntimeException('Failed to store media file.');
        }

        return Media::create([
            'disk' => $disk,
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $clientMime,
            'size' => $file->getSize(),
            'alt_text' => $altText,
            'uploaded_by' => $uploader->id,
        ]);
    }

    /**
     * Inspect file binary magic bytes.
     */
    protected function verifyMagicBytes(UploadedFile $file): void
    {
        $realPath = $file->getRealPath();
        if (! $realPath || ! file_exists($realPath) || filesize($realPath) === 0) {
            return;
        }

        // Check fileinfo MIME from file content
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $serverMime = strtolower(finfo_file($finfo, $realPath) ?: '');
        finfo_close($finfo);

        if (! in_array($serverMime, self::ALLOWED_MIMES, true)) {
            throw new InvalidArgumentException("Magic-byte verification failed: detected content type [{$serverMime}]. Strictly JPEG, PNG, and WebP are allowed.");
        }

        // Check binary magic bytes
        $handle = fopen($realPath, 'rb');
        $header = fread($handle, 12);
        fclose($handle);

        $isJpeg = str_starts_with($header, "\xFF\xD8\xFF");
        $isPng  = str_starts_with($header, "\x89PNG\r\n\x1a\n");
        $isWebp = str_starts_with($header, "RIFF") && substr($header, 8, 4) === "WEBP";

        if (! $isJpeg && ! $isPng && ! $isWebp) {
            throw new InvalidArgumentException('Invalid binary file header: magic bytes do not match JPEG, PNG, or WebP signatures.');
        }
    }

    /**
     * Safely delete a media asset if and only if its reference count is zero.
     * References from soft-deleted and archived records are checked.
     */
    public function delete(Media $media): bool
    {
        $refCount = $media->getReferenceCount();

        if ($refCount > 0) {
            throw new RuntimeException("Cannot delete media ID {$media->id}: file is referenced in {$refCount} place(s).");
        }

        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        return $media->delete();
    }
}
