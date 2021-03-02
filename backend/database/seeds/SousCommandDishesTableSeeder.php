<?php

use App\Models\SousCommandDish;
use Illuminate\Database\Seeder;

class SousCommandDishesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sousCommandDishes = factory(App\Models\SousCommandDish::class, 500)->create()->make();

        SousCommandDish::insert($sousCommandDishes->toArray());
    }
}
