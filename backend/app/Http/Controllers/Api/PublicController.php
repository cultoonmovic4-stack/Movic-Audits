<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Booking;
use App\Models\ContactMessage;
use App\Models\PortfolioAlbum;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    /**
     * Get published services list.
     */
    public function services(): JsonResponse
    {
        $services = Service::published()
            ->with('media')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Published services retrieved.',
            'data' => $services,
        ]);
    }

    /**
     * Get single published service detail by slug.
     */
    public function serviceDetail(string $slug): JsonResponse
    {
        $service = Service::published()
            ->where('slug', $slug)
            ->with('media')
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Service detail retrieved.',
            'data' => $service,
        ]);
    }

    /**
     * Get published portfolio albums.
     */
    public function portfolio(Request $request): JsonResponse
    {
        $query = PortfolioAlbum::published()->with(['category', 'coverMedia']);

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->input('category'));
            });
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        $albums = $query->orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio albums retrieved.',
            'data' => $albums,
        ]);
    }

    /**
     * Get single published portfolio album detail with images.
     */
    public function portfolioDetail(string $slug): JsonResponse
    {
        $album = PortfolioAlbum::published()
            ->where('slug', $slug)
            ->with(['category', 'coverMedia', 'images.media'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio album detail retrieved.',
            'data' => $album,
        ]);
    }

    /**
     * Get published blog posts.
     */
    public function blog(): JsonResponse
    {
        $posts = BlogPost::published()
            ->with(['category', 'author:id,name', 'featuredMedia'])
            ->orderByDesc('published_at')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Blog posts retrieved.',
            'data' => $posts,
        ]);
    }

    /**
     * Get single published blog post by slug.
     */
    public function blogDetail(string $slug): JsonResponse
    {
        $post = BlogPost::published()
            ->where('slug', $slug)
            ->with(['category', 'author:id,name', 'featuredMedia'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Blog post retrieved.',
            'data' => $post,
        ]);
    }

    /**
     * Get published testimonials.
     */
    public function testimonials(): JsonResponse
    {
        $testimonials = Testimonial::published()
            ->with('avatarMedia')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Testimonials retrieved.',
            'data' => $testimonials,
        ]);
    }

    /**
     * Submit contact form message.
     */
    public function submitContact(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $message = ContactMessage::create([
            ...$validated,
            'status' => ContactMessage::STATUS_NEW,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you. Your message has been received.',
            'data' => [
                'id' => $message->id,
            ],
        ], 201);
    }

    /**
     * Submit booking inquiry.
     */
    public function submitBooking(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'service_id' => ['nullable', 'exists:services,id'],
            'event_date' => ['nullable', 'date'],
            'event_location' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]);

        $booking = Booking::create([
            ...$validated,
            'status' => Booking::STATUS_NEW,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking inquiry submitted successfully.',
            'data' => [
                'id' => $booking->id,
            ],
        ], 201);
    }
}
