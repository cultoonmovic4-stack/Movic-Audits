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
        Schema::create('slug_registry', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 255)->unique();
            $table->string('sluggable_type', 255);
            $table->unsignedBigInteger('sluggable_id')->nullable();
            $table->timestamps();

            $table->index(['sluggable_type', 'sluggable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slug_registry');
    }
};
