<?php

use App\Models\Command;
use App\Models\SousCommand;
use Illuminate\Database\Seeder;

class SousCommandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sousCommands = [];

        Command::all()->each(function ($command) use (&$sousCommands) {
            $result = factory(SousCommand::class, 5)->make([
                'command_id' => $command->id
            ])->toArray();
            $sousCommands = array_merge($sousCommands, $result);
        });

        SousCommand::insert($sousCommands);
    }
}
