<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\CartItem;
use Faker\Generator as Faker;

$factory->define(CartItem::class, function (Faker $faker) {
    return [

        'dish_quantity' => $faker->numberBetween(1, 3),
    ];
});
