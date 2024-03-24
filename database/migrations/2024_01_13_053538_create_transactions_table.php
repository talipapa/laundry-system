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
            $table->string("status")->default("unpaid");
            $table->string("service_type");
            $table->integer("total_price");
            $table->dateTime("reserved_at");
            $table->json("add_ons")->nullable();
            $table->longText('address')->nullable();
            $table->string('payment_intent_id')->nullable();
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
