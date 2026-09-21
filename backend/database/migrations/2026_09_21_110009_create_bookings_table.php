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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('email', 255);
            $table->string('phone', 50);
            $table->foreignId('service_id')->nullable()->constrained('services')->onDelete('set null');
            $table->date('event_date')->nullable();
            $table->text('event_location')->nullable();
            $table->longText('message')->nullable();
            $table->string('status', 50)->default('new');
            $table->longText('internal_notes')->nullable();
            $table->timestamps();

            $table->index('service_id');
            $table->index('status');
            $table->index('event_date');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
