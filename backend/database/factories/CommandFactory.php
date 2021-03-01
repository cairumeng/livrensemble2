<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Command;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

$factory->define(Command::class, function (Faker $faker) {
    $start_time =  $faker->dateTimeBetween('-2 month', 'now');
    $closed_time = Carbon::parse($start_time)->addDays($faker->numberBetween(1, 30));
    $delivery_time = Carbon::parse($closed_time)->addDays($faker->numberBetween(1, 7));
    $current_price = $faker->randomFloat(2, 30, 350);
    $total_price = $faker->numberBetween(100, 600);
    return [
        'restaurant_id' => $faker->numberBetween(1, 50),
        'city_id' => $faker->numberBetween(1, 50),
        'current_price' => $current_price,
        'total_price' => $total_price,
        'start_time' => $start_time,
        'closed_time' => $closed_time,
        'delivery_time' => $delivery_time,
        'is_valid' => $current_price >= $total_price
    ];
});
