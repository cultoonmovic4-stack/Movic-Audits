<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\MediaService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;
use Tests\TestCase;

class MediaServiceTest extends TestCase
{
    use RefreshDatabase;

    protected MediaService $mediaService;
    protected User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->mediaService = new MediaService();
        $this->adminUser = User::factory()->create(['role' => 'admin']);
        Storage::fake('public');
    }

    /**
     * Unauthenticated upload requests are strictly unauthorized.
     */
    public function test_unauthenticated_upload_is_rejected(): void
    {
        $file = UploadedFile::fake()->createWithContent('photo.jpg', "\xFF\xD8\xFF" . str_repeat('A', 50));

        $this->expectException(AuthorizationException::class);
        $this->mediaService->upload($file, 'No Auth', null);
    }

    /**
     * Non-admin user upload requests are strictly unauthorized.
     */
    public function test_non_admin_upload_is_rejected(): void
    {
        $editor = User::factory()->create(['role' => 'editor']);
        $file = UploadedFile::fake()->createWithContent('photo.jpg', "\xFF\xD8\xFF" . str_repeat('A', 50));

        $this->expectException(AuthorizationException::class);
        $this->mediaService->upload($file, 'Editor Upload', $editor);
    }

    /**
     * SVG upload is strictly prohibited in Phase 1 per ADR v1.1.1.
     */
    public function test_svg_upload_is_strictly_prohibited(): void
    {
        $file = UploadedFile::fake()->createWithContent('logo.svg', "<svg></svg>");

        $this->expectException(InvalidArgumentException::class);
        $this->mediaService->upload($file, 'Logo', $this->adminUser);
    }

    /**
     * Non-allowed formats (e.g. GIF, PDF) are rejected.
     */
    public function test_unsupported_mime_types_are_rejected(): void
    {
        $gif = UploadedFile::fake()->createWithContent('animation.gif', "GIF89a" . str_repeat('A', 50));

        $this->expectException(InvalidArgumentException::class);
        $this->mediaService->upload($gif, 'Animation', $this->adminUser);
    }

    /**
     * Files exceeding 10 MB are rejected.
     */
    public function test_files_exceeding_10_mb_are_rejected(): void
    {
        // 11 MB in Kilobytes = 11264
        $largeFile = UploadedFile::fake()->create('large.jpg', 11 * 1024, 'image/jpeg');

        $this->expectException(InvalidArgumentException::class);
        $this->mediaService->upload($largeFile, 'Too Large', $this->adminUser);
    }

    /**
     * Spoofed file extensions with invalid magic bytes are rejected.
     */
    public function test_spoofed_magic_bytes_are_rejected(): void
    {
        $fakeJpeg = UploadedFile::fake()->createWithContent('malicious.jpg', "<?php phpinfo(); ?>");

        $this->expectException(InvalidArgumentException::class);
        $this->mediaService->upload($fakeJpeg, 'Fake Image', $this->adminUser);
    }

    /**
     * Allowed formats (JPEG, PNG, WebP) with valid headers are uploaded successfully.
     */
    public function test_jpeg_png_webp_uploads_are_accepted(): void
    {
        // Valid 1x1 JPEG
        $jpegPayload = base64_decode('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=');
        $jpeg = UploadedFile::fake()->createWithContent('photo.jpg', $jpegPayload);
        $mediaJpeg = $this->mediaService->upload($jpeg, 'Test JPEG', $this->adminUser);
        $this->assertDatabaseHas('media', ['id' => $mediaJpeg->id, 'mime_type' => 'image/jpeg']);
        Storage::disk('public')->assertExists($mediaJpeg->path);

        // Valid 1x1 PNG
        $pngPayload = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
        $png = UploadedFile::fake()->createWithContent('graphic.png', $pngPayload);
        $mediaPng = $this->mediaService->upload($png, 'Test PNG', $this->adminUser);
        $this->assertDatabaseHas('media', ['id' => $mediaPng->id, 'mime_type' => 'image/png']);
        Storage::disk('public')->assertExists($mediaPng->path);

        // Valid 1x1 WebP
        $webpPayload = base64_decode('UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAD8D+JaQAA3AA/ua1AAA=');
        $webp = UploadedFile::fake()->createWithContent('banner.webp', $webpPayload);
        $mediaWebp = $this->mediaService->upload($webp, 'Test WebP', $this->adminUser);
        $this->assertDatabaseHas('media', ['id' => $mediaWebp->id, 'mime_type' => 'image/webp']);
        Storage::disk('public')->assertExists($mediaWebp->path);
    }
}
