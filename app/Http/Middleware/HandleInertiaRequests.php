<?php

namespace App\Http\Middleware;

use App\Http\Controllers\WebsiteOptions;
use App\Models\Review;
use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $websiteDetails = WebsiteSetting::all()->first();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'token' => csrf_token(),
            ],
            'webInfo' => [
                'websiteName' => ($websiteDetails?->name == null) ? env('APP_NAME') : $websiteDetails->name,
                'merchantEmail' => ($websiteDetails?->email == null) ? env('MERCHANT_MAIL_FROM_ADDRESS') : $websiteDetails->email,
                'merchantPhoneNumber' => ($websiteDetails?->phone == null) ? env('MERCHANT_PHONE_NUMBER') : $websiteDetails->phone,
                'review' => [
                    'reviewCount' => Review::all()->sum('rating'),
                    'reviewMessages' => Review::orderBy('created_at', 'desc')->take(50)->get(),
                    'reviewAverage' => Review::all()->sum('rating') / Review::all()->count(),
                ],
            ],
            'geoLocation' => [
                'merchantAddress' => ($websiteDetails?->address == null) ? env('MERCHANT_ADDRESS') : $websiteDetails->address,
                'longitude' => ($websiteDetails?->shop_longitude == null) ? env('MERCHANT_LONGITUDE') : $websiteDetails->shop_longitude,
                'latitude' => ($websiteDetails?->shop_latitude == null) ? env('MERCHANT_LATITUDE') : $websiteDetails->shop_latitude,
            ]
        ];
    }
}
