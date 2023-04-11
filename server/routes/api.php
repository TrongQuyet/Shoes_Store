<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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
Route::post('/login',[UserController::class,'login'])->name('login');
Route::post('/register',[UserController::class,'register'])->name('register');
Route::get('/allshoes',[UserController::class,'allshoes'])->name('allshoes');
Route::post('/search',[UserController::class,'search'])->name('search');
Route::post('/addcart',[UserController::class,'addcart'])->name('addcart');
Route::post('/cartnotification',[UserController::class,'cartnotification'])->name('cartnotification');
Route::post('/getcart',[UserController::class,'getcart'])->name('getcart');
Route::post('/removeshoe',[UserController::class,'removeshoe'])->name('removeshoe');
Route::post('/addorder',[UserController::class,'addorder'])->name('addorder');
