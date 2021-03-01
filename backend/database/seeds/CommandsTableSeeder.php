<?php

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
        $commands = factory(App\Models\Command::class, 50)->make();

        Command::insert($commands->toArray());
    }
}
