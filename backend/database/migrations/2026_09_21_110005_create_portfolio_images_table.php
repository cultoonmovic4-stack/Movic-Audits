<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolio_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained('portfolio_albums')->onDelete('cascade');
            $table->foreignId('media_id')->constrained('media')->onDelete('restrict');
            $table->text('caption')->nullable();
            $table->string('alt_text', 255)->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index('album_id');
            $table->index('media_id');
            $table->index('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_images');
    }
};
