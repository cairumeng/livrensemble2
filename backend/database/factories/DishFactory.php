<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Dish;
use Faker\Generator as Faker;

$factory->define(Dish::class, function (Faker $faker) {

    $images = [
        'https://i.ndtvimg.com/i/2015-07/asian-chicken-625_625x350_51436269921.jpg',
        'https://i.ndtvimg.com/i/2015-07/chicken-satay-625_625x350_81436267161.jpg',
        'https://i.ndtvimg.com/i/2015-07/sushi-625_625x350_81436269280.jpg',
        'https://i.ndtvimg.com/i/2015-07/chinese-chicken-625_625x350_41436267264.jpg',
        'https://i.ndtvimg.com/i/2015-07/thai-chicken-625_625x350_51436267337.jpg',
        'https://i.ndtvimg.com/i/2015-07/vietname-chicken-625_625x350_71436267465.jpg',
        'https://i.ndtvimg.com/i/2015-07/dumplings-625_625x350_71436268816.jpg',
        'https://i.ndtvimg.com/i/2015-07/khao-suey-625_625x350_61436267721.jpg',
        'https://i.ndtvimg.com/i/2015-07/chilli-chicken-625_625x350_61436268026.jpg',
        'https://i.ndtvimg.com/i/2015-07/prawns-625_625x350_71436268574.jpg',
        'https://i.ndtvimg.com/i/2015-07/asian-recipes_625x350_61436271266.jpg',
        'https://c.ndtvimg.com/2018-09/c1g471co_noodles_625x300_26_September_18.jpg',
        'https://i.ndtvimg.com/i/2016-09/kerala-fish-curry-625_625x350_41473752974.jpg',
        'https://i.ndtvimg.com/i/2017-04/pomfret-polichathu_620x350_41491991586.jpg',
        'https://i.ndtvimg.com/i/2016-07/fish-curry_625x350_41469780557.jpg',

    ];
    return [
        'restaurant_id' => $faker->numberBetween(1, 50),
        'name' => $faker->name,
        'price' => $faker->numberBetween(5, 50),
        'ingredients' => $faker->sentence(),
        'spicy_level' => $faker->numberBetween(0, 5),
        'image' => $faker->randomElement($images),
        'category_id' => $faker->numberBetween(1, 350)
    ];
});
