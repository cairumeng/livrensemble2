<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SousCommand;
use Faker\Generator as Faker;

$factory->define(SousCommand::class, function (Faker $faker) {
    return [
        'command_id' => $faker->numberBetween(1, 100),
        'user_id' => $faker->numberBetween(1, 50),
        'amount' => $faker->numberBetween(25, 60),
        'address' => $faker->address,
        'note' => $faker->sentence()
    ];
});
