<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Seeds a development administrator account.
     * NOTE: This credential is for local development only and MUST be changed in production.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@movicaudits.test'],
            [
                'name' => 'Movic Audits Administrator',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
