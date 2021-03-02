<?php

use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;
use SebastianBergmann\Environment\Console;

class DishesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dishes = [];
        Restaurant::all()->each(function ($restaurant) use (&$dishes) {
            $result = factory(Dish::class, 1)->make([
                'restaurant_id' => $restaurant->id
            ])->toArray();
            $dishes = array_merge($dishes, $result);
        });

        Dish::insert($dishes);
    }
}
