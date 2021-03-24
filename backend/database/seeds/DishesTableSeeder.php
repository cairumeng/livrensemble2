<?php

use App\Models\Dish;
use App\Models\DishCategory;
use Illuminate\Database\Seeder;

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
        DishCategory::all()->each(function ($dishCategory) use (&$dishes) {
            $result = factory(Dish::class, 8)->make([
                'category_id' => $dishCategory->id,
                'restaurant_id' => $dishCategory->restaurant_id
            ])->toArray();
            $dishes = array_merge($dishes, $result);
        });

        Dish::insert($dishes);
    }
}
