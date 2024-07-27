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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('num_matricule')->unique();
            $table->float('kilomitrage');
            $table->integer('annee');
            $table->string('couleur');
            $table->float('prix');
            $table->string('etat');
            $table->string('image');
            $table->string('marque');
            $table->unsignedBigInteger('model_id');
            $table->timestamps();

            $table->foreign('model_id')->references('id')->on('models')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
