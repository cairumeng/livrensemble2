<?php

use App\Models\Command;
use App\Models\User;
use App\Models\Panier;
use Illuminate\Database\Seeder;

class PaniersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        $panierItems = [];
        $commands = Command::with('restaurant.dishes')->get();
        User::all()->each(function ($user) use (&$panierItems, &$commands, $faker) {
            $command = $faker->randomElement($commands);
            $dishes = $faker->randomElements($command->restaurant->dishes, $faker->numberBetween(1, $command->restaurant->dishes->count()));

            foreach ($dishes as $dish) {
                $panierItems[] = factory(Panier::class)->make([
                    'command_id' => $command->id,
                    'dish_id' => $dish->id,
                    'user_id' => $user->id
                ])->toArray();
            }
        });

        Panier::insert($panierItems);
    }
}
