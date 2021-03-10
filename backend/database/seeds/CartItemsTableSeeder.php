<?php

use App\Models\CartItem;
use App\Models\Command;
use App\Models\User;
use Illuminate\Database\Seeder;

class CartItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        $cartItems = [];
        $commands = Command::with('restaurant.dishes')->get();
        User::all()->each(function ($user) use (&$cartItems, &$commands, $faker) {
            $command = $faker->randomElement($commands);
            $dishes = $faker->randomElements($command->restaurant->dishes, $faker->numberBetween(1, $command->restaurant->dishes->count()));

            foreach ($dishes as $dish) {
                $cartItems[] = factory(CartItem::class)->make([
                    'command_id' => $command->id,
                    'dish_id' => $dish->id,
                    'user_id' => $user->id
                ])->toArray();
            }
        });

        CartItem::insert($cartItems);
    }
}
