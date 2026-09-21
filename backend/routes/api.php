<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Version 1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Public API Ping / Health Check
    Route::get('/ping', function () {
        return response()->json([
            'success' => true,
            'message' => 'Movic Audits API v1 online.',
            'data' => [
                'environment' => config('app.env'),
                'timestamp' => now()->toISOString(),
            ],
        ]);
    });

    // Public Content & Submission Routes
    Route::get('/services', [\App\Http\Controllers\Api\PublicController::class, 'services'])->name('public.services');
    Route::get('/services/{slug}', [\App\Http\Controllers\Api\PublicController::class, 'serviceDetail'])->name('public.services.detail');
    Route::get('/portfolio', [\App\Http\Controllers\Api\PublicController::class, 'portfolio'])->name('public.portfolio');
    Route::get('/portfolio/{slug}', [\App\Http\Controllers\Api\PublicController::class, 'portfolioDetail'])->name('public.portfolio.detail');
    Route::get('/blog', [\App\Http\Controllers\Api\PublicController::class, 'blog'])->name('public.blog');
    Route::get('/blog/{slug}', [\App\Http\Controllers\Api\PublicController::class, 'blogDetail'])->name('public.blog.detail');
    Route::get('/testimonials', [\App\Http\Controllers\Api\PublicController::class, 'testimonials'])->name('public.testimonials');
    Route::post('/contact', [\App\Http\Controllers\Api\PublicController::class, 'submitContact'])->name('public.contact');
    Route::post('/bookings', [\App\Http\Controllers\Api\PublicController::class, 'submitBooking'])->name('public.bookings');

    // Authentication Routes
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login');

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/me', [AuthController::class, 'me'])->name('auth.me');
            Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
        });
    });

    // Administrative Protected Routes
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::get('/ping', function () {
            return response()->json([
                'success' => true,
                'message' => 'Administrative API accessible.',
                'data' => [
                    'authorized' => true,
                ],
            ]);
        })->name('admin.ping');
    });

});
