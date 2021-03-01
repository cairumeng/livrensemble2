<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Models\Restaurant;
use Faker\Generator as Faker;

$factory->define(Restaurant::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone_number' => $faker->phoneNumber,
        'address' => $faker->address,
        'front_image' => $faker->imageUrl(),
        'description' => $faker->sentence()
    ];
});
