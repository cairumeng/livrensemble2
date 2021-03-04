<?php

use App\Models\DishCategory;
use App\Models\SousCommand;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(RestaurantsTableSeeder::class);
        $this->call(DishCategoriesTableSeeder::class);
        $this->call(CitiesTableSeeder::class);
        $this->call(CommandsTableSeeder::class);
        $this->call(DishesTableSeeder::class);
        $this->call(SousCommandsTableSeeder::class);
        $this->call(SousCommandDishesTableSeeder::class);
    }
}
