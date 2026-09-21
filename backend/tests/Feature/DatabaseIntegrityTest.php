<?php

namespace Tests\Feature;

use App\Models\BlogPost;
use App\Models\Booking;
use App\Models\ContactMessage;
use App\Models\Media;
use App\Models\PortfolioAlbum;
use App\Models\PortfolioCategory;
use App\Models\PortfolioImage;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use App\Services\MediaService;
use DomainException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use InvalidArgumentException;
use Tests\TestCase;

class DatabaseIntegrityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test soft deletes on approved entities.
     */
    public function test_approved_entities_support_soft_deletes(): void
    {
        $service = Service::factory()->create();
        $service->delete();

        $this->assertSoftDeleted('services', ['id' => $service->id]);
        $this->assertNull(Service::find($service->id));
        $this->assertNotNull(Service::withTrashed()->find($service->id));

        $album = PortfolioAlbum::factory()->create();
        $album->delete();
        $this->assertSoftDeleted('portfolio_albums', ['id' => $album->id]);

        $post = BlogPost::factory()->create();
        $post->delete();
        $this->assertSoftDeleted('blog_posts', ['id' => $post->id]);

        $testimonial = Testimonial::factory()->create();
        $testimonial->delete();
        $this->assertSoftDeleted('testimonials', ['id' => $testimonial->id]);
    }

    /**
     * Soft-deleting an album must NOT delete portfolio_images or media.
     */
    public function test_soft_deleting_album_preserves_images_and_media(): void
    {
        $media = Media::factory()->create();
        $album = PortfolioAlbum::factory()->create();
        $image = PortfolioImage::factory()->create([
            'album_id' => $album->id,
            'media_id' => $media->id,
        ]);

        $album->delete();

        $this->assertSoftDeleted('portfolio_albums', ['id' => $album->id]);
        $this->assertDatabaseHas('portfolio_images', ['id' => $image->id]);
        $this->assertDatabaseHas('media', ['id' => $media->id]);
    }

    /**
     * Physical deletion of bookings is strictly prohibited.
     */
    public function test_bookings_cannot_be_physically_deleted(): void
    {
        $booking = Booking::factory()->create();

        $this->expectException(DomainException::class);
        $booking->delete();
    }

    /**
     * Physical deletion of contact messages is strictly prohibited.
     */
    public function test_contact_messages_cannot_be_physically_deleted(): void
    {
        $message = ContactMessage::factory()->create();

        $this->expectException(DomainException::class);
        $message->delete();
    }

    /**
     * Deleting a service sets bookings.service_id to null (ON DELETE SET NULL).
     */
    public function test_deleting_service_sets_booking_service_id_to_null(): void
    {
        $service = Service::factory()->create();
        $booking = Booking::factory()->create(['service_id' => $service->id]);

        $this->assertEquals($service->id, $booking->fresh()->service_id);

        // Force delete service to test database constraint behavior
        $service->forceDelete();

        $this->assertNull($booking->fresh()->service_id);
    }

    /**
     * Media reference protection prevents deleting media referenced by services.
     */
    public function test_media_referenced_by_service_blocks_deletion(): void
    {
        $media = Media::factory()->create();
        Service::factory()->create(['media_id' => $media->id]);

        $this->expectException(DomainException::class);
        $media->delete();
    }

    /**
     * Media referenced by album cover blocks deletion.
     */
    public function test_media_referenced_by_album_cover_blocks_deletion(): void
    {
        $media = Media::factory()->create();
        PortfolioAlbum::factory()->create(['cover_media_id' => $media->id]);

        $this->expectException(DomainException::class);
        $media->delete();
    }

    /**
     * Media referenced by portfolio image junction blocks deletion.
     */
    public function test_media_referenced_by_portfolio_image_blocks_deletion(): void
    {
        $media = Media::factory()->create();
        PortfolioImage::factory()->create(['media_id' => $media->id]);

        $this->expectException(DomainException::class);
        $media->delete();
    }

    /**
     * Media referenced by blog post featured image blocks deletion.
     */
    public function test_media_referenced_by_blog_post_blocks_deletion(): void
    {
        $media = Media::factory()->create();
        BlogPost::factory()->create(['featured_media_id' => $media->id]);

        $this->expectException(DomainException::class);
        $media->delete();
    }

    /**
     * Media referenced by testimonial client image blocks deletion.
     */
    public function test_media_referenced_by_testimonial_blocks_deletion(): void
    {
        $media = Media::factory()->create();
        Testimonial::factory()->create(['client_image_media_id' => $media->id]);

        $this->expectException(DomainException::class);
        $media->delete();
    }

    /**
     * Media referenced by archived records is protected.
     */
    public function test_media_referenced_by_archived_record_is_protected(): void
    {
        $media = Media::factory()->create();
        BlogPost::factory()->create([
            'featured_media_id' => $media->id,
            'status' => BlogPost::STATUS_ARCHIVED,
        ]);

        $this->assertTrue($media->isReferenced());
        $this->expectException(DomainException::class);
        $media->delete();
    }

    /**
     * Media referenced by soft-deleted record is still protected.
     */
    public function test_media_referenced_by_soft_deleted_record_is_still_protected(): void
    {
        $media = Media::factory()->create();
        $service = Service::factory()->create(['media_id' => $media->id]);
        $service->delete();

        $this->assertSoftDeleted('services', ['id' => $service->id]);
        $this->assertTrue($media->isReferenced());

        $mediaService = new MediaService();
        $this->expectException(\RuntimeException::class);
        $mediaService->delete($media);
    }

    /**
     * Unreferenced media file can be physically deleted from both database and filesystem.
     */
    public function test_unreferenced_media_can_be_physically_deleted(): void
    {
        \Illuminate\Support\Facades\Storage::fake('public');
        $filePath = 'media/2026/09/sample-unreferenced.jpg';
        \Illuminate\Support\Facades\Storage::disk('public')->put($filePath, 'binary_data');

        $media = Media::factory()->create([
            'disk' => 'public',
            'path' => $filePath,
        ]);

        $this->assertEquals(0, $media->getReferenceCount());
        $this->assertFalse($media->isReferenced());

        $mediaService = new MediaService();
        $deleted = $mediaService->delete($media);

        $this->assertTrue($deleted);
        $this->assertDatabaseMissing('media', ['id' => $media->id]);
        \Illuminate\Support\Facades\Storage::disk('public')->assertMissing($filePath);
    }

    /**
     * Force deletion of bookings is strictly blocked.
     */
    public function test_bookings_force_delete_is_blocked(): void
    {
        $booking = Booking::factory()->create();

        $this->expectException(DomainException::class);
        $booking->forceDelete();
    }

    /**
     * Force deletion of contact messages is strictly blocked.
     */
    public function test_contact_messages_force_delete_is_blocked(): void
    {
        $message = ContactMessage::factory()->create();

        $this->expectException(DomainException::class);
        $message->forceDelete();
    }

    /**
     * Invalid lifecycle states are strictly rejected at the model layer.
     */
    public function test_invalid_lifecycle_states_are_rejected(): void
    {
        $this->expectException(InvalidArgumentException::class);

        $service = Service::factory()->make(['status' => 'invalid_status']);
        $service->save();
    }

    /**
     * Valid lifecycle states are accepted.
     */
    public function test_valid_lifecycle_states_are_accepted(): void
    {
        $draft = Service::factory()->create(['status' => Service::STATUS_DRAFT]);
        $this->assertEquals(Service::STATUS_DRAFT, $draft->status);

        $published = Service::factory()->create(['status' => Service::STATUS_PUBLISHED]);
        $this->assertEquals(Service::STATUS_PUBLISHED, $published->status);

        $archived = Service::factory()->create(['status' => Service::STATUS_ARCHIVED]);
        $this->assertEquals(Service::STATUS_ARCHIVED, $archived->status);
    }
}
