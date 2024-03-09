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
        Schema::create('conducteur', function (Blueprint $table) {
            $table->id();
            $table->string('num_cin')->unique();
            $table->string('nom');
            $table->string('prenom');
            $table->string('num_tel');
            $table->string('email')->unique();
            $table->string('numero_permis_conduire');
            $table->string('adress');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conducteur');
    }
};