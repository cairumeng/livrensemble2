<?php

use App\Models\DishCategory;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class DishCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dishCategories = [];

        Restaurant::all()->each(function ($restaurant) use (&$dishCategories) {
            $result = factory(DishCategory::class, 5)->make([
                'restaurant_id' => $restaurant->id
            ])->toArray();
            $dishCategories = array_merge($dishCategories, $result);
        });

        DishCategory::insert($dishCategories);
    }
}
