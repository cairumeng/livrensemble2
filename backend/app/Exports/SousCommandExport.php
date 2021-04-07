<?php

namespace App\Exports;

use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SousCommandExport implements FromArray, WithTitle, WithHeadings, ShouldAutoSize, WithStyles, WithColumnFormatting
{
    private $sousCommand;

    public function __construct($sousCommand)
    {
        $this->sousCommand = $sousCommand;
    }

    public function array(): array
    {
        $address = $this->sousCommand->address;

        $data = [
            [
                $this->sousCommand->id,
                $address->name,
                $address->phone_number,
                $address->address,
                $this->sousCommand->amount,
                $this->sousCommand->note
            ]
        ];

        $dishesHeader = ['id', 'name', 'quantity'];
        $data[] = $dishesHeader;
        foreach ($this->sousCommand->sousCommandDishes as $sousCommandDish) {
            $data[] = [$sousCommandDish->dish->id, $sousCommandDish->dish->name, $sousCommandDish->dish_quantity];
        }
        return $data;
    }

    public function title(): string
    {
        return 'SousCommand#' . $this->sousCommand->id;
    }

    public function headings(): array
    {
        return [
            ['Id', 'Receiver', 'Phone', 'Address', 'Amount', 'Note'],
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],
            3    => ['font' => ['bold' => true]],
        ];
    }

    public function columnFormats(): array
    {
        return [
            'E2' => NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE,
        ];
    }
}
