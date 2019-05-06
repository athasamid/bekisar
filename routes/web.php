<?php
use Illuminate\Http\Request;
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

Route::post('login', 'Auth\LoginController@login');
Route::get('logout', 'Auth\LoginController@logout')->name('logout');

Route::group([
    'prefix' => 'resources'
], function (){
    Route::group([
        'middleware' => ['auth']
    ], function(){
        Route::resource('inbox', 'InboxController', ['except' => ['edit', 'create']]);
        Route::resource('outbox', 'OutboxController', ['except' => ['edit', 'create']]);
        Route::resource('sentitem', 'SentitemController', ['except' => ['edit', 'create']]);
    });

    Route::post('gatekeeper', function (Request $request){
        $user = auth()->user();

        $response['passed'] = auth()->check();

        if ($response['passed']){
            if ($request->input('clientHasUserInfo') === false){
                $response['userInfo'] = [
                    'nama' => $user->pemilik->nama
                ];
            }
        }

        return response()->json($response);
    });
});

Route::get('/{vue_capture?}', function (Request $request) {
    return view('welcome');
})->where('vue_capture', '[\/\w\.-]*');