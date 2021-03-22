<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Models\Command as RestaurantCommand;

class ClearUnvalidCommands extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'commands:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set expired commands invalid';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $count = RestaurantCommand::where('closed_time', '<=', Carbon::now())->where('is_valid', 1)->count();

        $this->info("${count} commands will be cleared");
        return RestaurantCommand::where('closed_time', '<=', Carbon::now())->where('is_valid', 1)->update(['is_valid' => 0]);
    }
}
