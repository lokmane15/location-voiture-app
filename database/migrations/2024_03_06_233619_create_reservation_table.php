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
        Schema::create('reservations', function (Blueprint $table) {
            // Reservations Migration
            $table->id();
            $table->timestamp('date_debut')->default(now());
            $table->timestamp('date_fin')->default(now());
            $table->decimal('prix_total', 8, 2);
            $table->string('marque');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('car_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('car_id')->references('id')->on('cars')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['car_id']);
        });

        Schema::dropIfExists('reservations');
        Schema::dropIfExists('users');
        Schema::dropIfExists('cars');
    }
};
