<?php

namespace Tests\Unit;

use App\Models\BlogPost;
use App\Models\PortfolioAlbum;
use App\Models\Service;
use App\Services\SlugService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SlugServiceTest extends TestCase
{
    use RefreshDatabase;

    protected SlugService $slugService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->slugService = new SlugService();
    }

    /**
     * Test standard slug generation.
     */
    public function test_generates_basic_slug(): void
    {
        $slug = $this->slugService->generate('Wedding Photography in Kampala');
        $this->assertEquals('wedding-photography-in-kampala', $slug);
    }

    /**
     * Test collision suffixing (-2, -3, etc.).
     */
    public function test_handles_collision_suffixing(): void
    {
        Service::factory()->create(['slug' => 'wedding-photography']);

        $second = $this->slugService->generate('wedding-photography');
        $this->assertEquals('wedding-photography-2', $second);

        Service::factory()->create(['slug' => 'wedding-photography-2']);

        $third = $this->slugService->generate('wedding-photography');
        $this->assertEquals('wedding-photography-3', $third);
    }

    /**
     * Test global uniqueness across different entities.
     * A slug taken by a Service cannot be reused by a BlogPost or Album.
     */
    public function test_enforces_cross_table_global_uniqueness(): void
    {
        Service::factory()->create(['slug' => 'corporate-branding']);

        $this->assertFalse($this->slugService->isGloballyUnique('corporate-branding'));

        $albumSlug = $this->slugService->generate('corporate-branding');
        $this->assertEquals('corporate-branding-2', $albumSlug);
    }

    /**
     * Test that soft-deleted records still reserve their slug.
     */
    public function test_soft_deleted_records_retain_slug_reservation(): void
    {
        $service = Service::factory()->create(['slug' => 'exclusive-coverage']);
        $service->delete();

        $this->assertSoftDeleted('services', ['id' => $service->id]);
        $this->assertFalse($this->slugService->isGloballyUnique('exclusive-coverage'));

        $newSlug = $this->slugService->generate('exclusive-coverage');
        $this->assertEquals('exclusive-coverage-2', $newSlug);
    }

    /**
     * Test that updating an existing model ignores its own slug.
     */
    public function test_updating_existing_model_preserves_own_slug(): void
    {
        $service = Service::factory()->create(['slug' => 'commercial-video']);

        $this->assertTrue($this->slugService->isGloballyUnique('commercial-video', $service));
        $generated = $this->slugService->generate('commercial-video', $service);
        $this->assertEquals('commercial-video', $generated);
    }

    /**
     * Test atomic reservation directly registers into slug_registry.
     */
    public function test_atomic_reservation_registers_into_slug_registry(): void
    {
        $reserved = $this->slugService->reserve('creative-directing', Service::class, 10);
        $this->assertEquals('creative-directing', $reserved);

        $this->assertDatabaseHas('slug_registry', [
            'slug' => 'creative-directing',
            'sluggable_type' => Service::class,
            'sluggable_id' => 10,
        ]);

        // Second reservation of the same slug atomically resolves with suffix
        $second = $this->slugService->reserve('creative-directing', BlogPost::class, 20);
        $this->assertEquals('creative-directing-2', $second);

        $this->assertDatabaseHas('slug_registry', [
            'slug' => 'creative-directing-2',
            'sluggable_type' => BlogPost::class,
            'sluggable_id' => 20,
        ]);
    }

    /**
     * Test archived content retains slug reservation.
     */
    public function test_archived_content_retains_slug_reservation(): void
    {
        $service = Service::factory()->create([
            'slug' => 'archived-service-package',
            'status' => Service::STATUS_ARCHIVED,
        ]);

        $this->assertFalse($this->slugService->isGloballyUnique('archived-service-package'));

        $newSlug = $this->slugService->generate('archived-service-package');
        $this->assertEquals('archived-service-package-2', $newSlug);
    }

    /**
     * Test manual duplicate slug assignment is rejected by model lifecycle.
     */
    public function test_manual_duplicate_slug_assignment_throws_exception(): void
    {
        Service::factory()->create(['slug' => 'unique-brand-story']);

        $this->expectException(\DomainException::class);
        BlogPost::factory()->create(['slug' => 'unique-brand-story']);
    }
}
