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
        Schema::create('models', function (Blueprint $table) {
            $table->id();
            $table->string('nom_model');
            $table->string('type_carburant');
            $table->boolean('gps')->default(false);
            $table->integer('capacite_assises');
            $table->unsignedBigInteger('marque_id');
            $table->timestamps();

            $table->foreign('marque_id')->references('id')->on('marque')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('models');
    }
};