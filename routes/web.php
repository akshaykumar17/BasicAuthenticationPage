<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('register/users','UserController@store');
Route::post('login/userAuth','UserController@login');
Route::post('logout','UserController@logout');
Route::get('/password/email', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');

Route::get('/password/reset/{token?}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('/password/reset', 'Auth\ResetPasswordController@reset');
// cors problem....
Route::options(
'/{any:.*}',
[
'middleware' => ['cors'],
function (){
return response(['status' => 'success']);
}
]
);

/*Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
*/
