<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use App\Models\Restaurant;
use Faker\Generator as Faker;

$factory->define(Restaurant::class, function (Faker $faker) {
    $images = [
        'https://blog-assets.lightspeedhq.com/img/2020/01/1e5ac4db-restaurant-soft-openings.jpg',
        'https://www.sortiraparis.com/images/1001/89011/511683-les-pipalottes-la-table-restaurant-16.jpg',
        'https://www.anousparis.fr/app/uploads/2018/12/le-train-bleu-008_2800x2100.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/10129/restaurant-romantique-a-paris.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/9794/rooftop-a-paris.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/9098/restaurant-romantique-a-paris-de-sers.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/9076/restaurant-romantique-a-paris-hotel-vernet.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/9023/le-pavillon-du-lac.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/9020/angelina-cafe-richelieu.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/8985/jardins-du-marais-paris-bar-insolite.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/7914/restaurant-romantique-paris-pas-cher-relais-du-parc.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/7841/restaurant-romantique-le-keller-paris.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/2284/restaurant-insolite_le-wagon-bleu.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/7837/restaurant-terrasse-paris-warwick-promotion.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/2261/walyf-fay.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/1935/restaurant-sola.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/1615/bon-plan-restaurants-insolite-chalet-des-iles-paris.jpg',
        'https://www.paris-friendly.fr/images/bons_plans_paris/364/sormani-restaurant-paris.jpg'

    ];
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone_number' => $faker->phoneNumber,
        'address' => $faker->address,
        'front_image' => $faker->randomElement($images),
        'description' => $faker->sentence()
    ];
});
