<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Command;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

$factory->define(Command::class, function (Faker $faker) {
    $start_time =  $faker->dateTimeBetween('-1 month', 'now');
    $closed_time = Carbon::parse($start_time)->addDays($faker->numberBetween(15, 60));
    $delivery_time = Carbon::parse($closed_time)->addDays($faker->numberBetween(1, 7));
    $current_price = $faker->randomFloat(2, 30, 350);
    $total_price = $faker->numberBetween(100, 600);
    $delivery_option = $faker->numberBetween(0, 1);
    $addressess = ['Gare Antony', 'Gare Robinson', 'Gare Lhay-les-roses', 'Gare villejuif', 'Gare AAA'];

    return [
        'restaurant_id' => $faker->numberBetween(1, 50),
        'city_id' => $faker->numberBetween(1, 50),
        'current_price' => $current_price,
        'total_price' => $total_price,
        'start_time' => $start_time,
        'closed_time' => $closed_time,
        'delivery_time' => $delivery_time,
        'address' => $delivery_option == 0 ? $faker->randomElement($addressess) : null,
        'is_valid' => $current_price >= $total_price
    ];
});
