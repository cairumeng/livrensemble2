<?php

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
        $restaurants = factory(App\Models\Restaurant::class, 50)->create()->make();

        Restaurant::insert($restaurants->toArray());
    }
}
