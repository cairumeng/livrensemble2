<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Panier;
use Faker\Generator as Faker;

$factory->define(Panier::class, function (Faker $faker) {
    return [

        'dish_quantity' => $faker->numberBetween(1, 3),
    ];
});
