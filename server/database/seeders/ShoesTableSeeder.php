<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ShoesTableSeeder extends Seeder


{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $shoes = [
            ['name' => 'Superstar', 'brand' => 'Adidas','image' => 'images/superstar.jpg'],
            ['name' => 'Air Force 1', 'brand' => 'Nike','image' => 'images/airforce1.jpg'],
            ['name' => 'Old Skool', 'brand' => 'Vans','image' => 'images/OldSkool.jpg'],
            ['name' => 'Chuck Taylor', 'brand' => 'Converse','image' => 'images/ChuckTaylor.jpg'],
            ['name' => 'Gel-Kayano', 'brand' => 'Asics','image' => 'images/Gel-Kayano.jpg'],
            ['name' => 'Classic Leather', 'brand' => 'Reebok','image' => 'images/ClassicLeather.jpg'],
            ['name' => 'Samba', 'brand' => 'Adidas','image' => 'images/Samba.jpg'],
            ['name' => 'Stan Smith', 'brand' => 'Adidas','image' => 'images/StanSmith.jpg'],
            ['name' => 'Air Max 90', 'brand' => 'Nike','image' => 'images/AirMax90.jpg'],
            ['name' => 'Sk8-Hi', 'brand' => 'Vans','image' => 'images/Sk8-Hi.jpg'],
        ];

        $colors = ['Black', 'White', 'Blue', 'Red', 'Green'];
        $sizes = ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

        foreach ($shoes as $shoe) {
            DB::table('shoes')->insert([
                'name' => $shoe['name'],
                'brand' => $shoe['brand'],
                'image' => $shoe['image'],
                'color' => $colors[array_rand($colors)],
                'size' => $sizes[array_rand($sizes)],
                'price' => rand(20, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
