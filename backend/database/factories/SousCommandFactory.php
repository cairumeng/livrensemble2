<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Address;
use App\Models\SousCommand;
use Faker\Generator as Faker;

$factory->define(SousCommand::class, function (Faker $faker) {
    $userId = $faker->numberBetween(1, 50);
    $userAddressIds = Address::select('id')->where('user_id', $userId)->get();

    return [
        'command_id' => $faker->numberBetween(1, 100),
        'user_id' => $userId,
        'amount' => $faker->numberBetween(25, 60),
        'note' => $faker->sentence(),
        'address_id' => $faker->randomElement($userAddressIds)

    ];
});
