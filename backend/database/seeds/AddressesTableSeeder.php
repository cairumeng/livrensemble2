<?php

use App\Models\Address;
use App\Models\City;
use App\Models\User;
use Illuminate\Database\Seeder;

class AddressesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker\Generator $faker)
    {
        $addresses = [];
        $cityIds = City::select('id')->get();
        User::all()->each(function ($user) use (&$addresses, &$cityIds, $faker) {
            $result = factory(Address::class, 3)->make([
                'user_id' => $user->id,
                'city_id' => $faker->randomElement($cityIds),
                'is_default' => false
            ])->toArray();

            $result[0]['is_default'] = true;
            $addresses = array_merge($addresses, $result);
        });
        Address::insert($addresses);
    }
}
