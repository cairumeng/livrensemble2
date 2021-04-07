<?php

namespace App\Exports;

use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;


class CommandExport implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles, WithColumnFormatting
{
    private $command;

    public function __construct($command)
    {
        $this->command = $command;
    }

    public function array(): array
    {
        return [
            [
                $this->command->id,
                $this->command->city->city,
                $this->command->current_price,
                $this->command->total_price,
                Date::dateTimeToExcel($this->command->delivery_time),
                $this->command->address
            ]

        ];
    }

    public function title(): string
    {
        return 'Command#' . $this->command->id;
    }

    public function headings(): array
    {
        return [
            ['ID', 'City', 'Current Price', 'Delivery Price', 'Delivery Time', 'Delivery Address'],
        ];
    }
    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],
        ];
    }

    public function columnFormats(): array
    {
        return [
            'C' => NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE,
            'D' => NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE,
            'E' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }
}
