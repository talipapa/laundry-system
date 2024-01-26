<?php

use App\Http\Controllers\AdminDashboard;
use App\Http\Controllers\AdminSetupController;
use App\Http\Controllers\MessageBroadcastController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationQueueController;

use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\WebsiteOptions;
use App\Models\Transaction;
use App\Models\User;
use App\Selections\ServiceAddons;
use App\Selections\TransactionStatus;
use App\Selections\UserLevel;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function (){
    Route::get('/admin-setup', [AdminSetupController::class, 'index'])->name('admin-setup');
    Route::post('/admin-setup', [AdminSetupController::class, 'claimOwnership'])->name('claim-ownership');
});



// Route for admins / owner
Route::middleware(['auth', 'verified', 'admin-clearance', 'detect-owner'])->group(function (){
    Route::get('/admin/dashboard', [AdminDashboard::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/reservation', [ReservationQueueController::class, 'index'])->name('admin.reservation-queue');
    Route::get('/admin/customer', [CustomerController::class, 'index'])->name('admin.customer');
    
    Route::get('/admin/transaction', [TransactionController::class, 'index'])->name('admin.transaction');
    Route::put('/admin/transaction', [ReservationQueueController::class, 'changeStatus'])->name('admin.transaction.status');



    Route::get('/admin/profile', [ProfileController::class, 'index'])->name('admin.account-settings');
    Route::get('/admin/web-settings', [WebsiteOptions::class, 'index'])->name('admin.web-settings');

    Route::put('/admin/customer', [CustomerController::class, 'update'])->name('admin.customer.update');
    Route::put('/admin/customer/password', [CustomerController::class, 'changePassword'])->name('admin.customer.password');
    Route::put('/admin/customer/role', [CustomerController::class, 'changeUserRole'])->name('admin.customer.role');
    Route::delete('/admin/customer/{id}', [CustomerController::class, 'destroy'])->name('admin.customer.destroy');

    Route::put('/admin/web-settings/contact-info', [WebsiteOptions::class, 'changeContactInfo'])->name('admin.web-settings.contact-info');
    Route::put('/admin/web-settings/coordinates', [WebsiteOptions::class, 'changeCoordinates'])->name('admin.web-settings.coordinates');


});

// Route for customers
Route::middleware(['auth', 'verified'])->group(function (){
    Route::get('/dashboard', function() {
        $array = [
            UserLevel::OWNER->value,
            UserLevel::STAFF->value
        ];
        if (in_array(auth()->user()->role, $array)){
            return redirect()->route('admin.dashboard');
        }  
        return Inertia::render('Customer/Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('admin.profile.destroy');
});

Route::post('/send-message', [MessageBroadcastController::class, 'sendMessage'])->name('send.message');


require __DIR__.'/auth.php';
