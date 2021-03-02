<?php

use App\Models\City;
use App\Models\Command;
use Illuminate\Database\Seeder;

class CommandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $commands = [];
        City::all()->each(function ($city) use (&$commands) {
            $result = factory(Command::class, 15)->make([
                'city_id' => $city->id
            ])->toArray();
            $commands = array_merge($commands, $result);
        });
        Command::insert($commands);
    }
}
