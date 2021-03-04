<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\DishCategory;
use Faker\Generator as Faker;

$factory->define(DishCategory::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'restaurant_id' => $faker->numberBetween(1, 50)
    ];
});
