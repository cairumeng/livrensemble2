<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SousCommandDish;
use Faker\Generator as Faker;

$factory->define(SousCommandDish::class, function (Faker $faker) {
    return [
        'sous_command_id' => $faker->numberBetween(1, 500),
        'dish_id' => $faker->numberBetween(1, 50)
    ];
});
