<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::get('users/delivery-info', 'UsersController@deliveryInfo');
Route::resource('users', 'UsersController')->only(['store', 'update']);
Route::post('users/{user}/avatar', 'UsersController@uploadAvatar');
Route::put('users/{user}/password-change', 'UsersController@passwordChange');
Route::resource('commands', 'CommandsController')->only(['index',  'show']);
Route::resource('sous-commands', 'SousCommandsController')->only(['store', 'index', 'show']);
Route::resource('cities', 'CitiesController')->only(['index',]);
Route::resource('cart-items', 'CartItemsController')->only(['index', 'store', 'destroy']);
Route::get('addresses/delivery-address', 'AddressesController@deliveryAddress');
Route::post('addresses/change-default-address', 'AddressesController@changeDefaultAddress');

Route::resource('addresses', 'AddressesController')->only(['index', 'store', 'update', 'destroy', 'show']);
Route::post('restaurants/front-image', 'RestaurantsController@frontImageUpload');

Route::resource('/restaurants', 'RestaurantsController')->only(['index', 'store']);

Route::post('/restaurant-modify', 'RestaurantsController@update');
Route::resource('/dish-categories', 'DishCategoriesController')->only(['index', 'store', 'update', 'destroy']);
Route::resource('/dishes', 'DishesController')->only(['index', 'store', 'update', 'destroy']);
Route::post('/dishes/image', 'DishesController@imageUploader');
Route::resource('/restaurant/commands', 'RestaurantCommandsController')->only(['index', 'store', 'update', 'destroy']);
Route::get('/restaurant/new-commands', 'RestaurantCommandsController@newCommands');
Route::get('/restaurant/commands/{id}/sous-commands', 'RestaurantSousCommandsController@index');

Route::get('/restaurant/sous-commands/{id}', 'RestaurantSousCommandsController@show');

Route::get('/restaurant/commands/{id}/export-excel', 'RestaurantCommandsController@exportExcel');
