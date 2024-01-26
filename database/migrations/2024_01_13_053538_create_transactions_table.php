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
        Schema::create('transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId("user_id")->nullable(true)->constrained('users', 'id')->onDelete('set null');
            $table->string("status")->default("waiting");
            $table->boolean("is_reviewed")->default(false);
            $table->string("service_type");
            $table->integer("total_price");
            $table->json("addons")->nullable();
            $table->timestamps();
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
