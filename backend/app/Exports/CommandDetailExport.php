<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CommandDetailExport implements WithMultipleSheets
{
    private $command;
    private $sousCommands;

    public function __construct($command, $sousCommands)
    {
        $this->command = $command;
        $this->sousCommands = $sousCommands;
    }

    /**
     * @return array
     */
    public function sheets(): array
    {
        $sheets = [];

        $sheets[] = new CommandExport($this->command);

        foreach ($this->sousCommands as $sousCommand) {
            $sheets[] = new SousCommandExport($sousCommand);
        }

        return $sheets;
    }
}
