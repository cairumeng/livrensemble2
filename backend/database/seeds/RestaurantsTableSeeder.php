<?php

use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $restaurants = [];
        $userIds = User::where('role', 'restaurant')->get();
        $userIds->each(function ($userId) use (&$restaurants) {
            $restaurants[] = factory(Restaurant::class)->make([
                'user_id' => $userId
            ])->toArray();
        });

        Restaurant::insert($restaurants);
    }
}
