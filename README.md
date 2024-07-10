![FLAT DESIGN TEMPLATES](https://github.com/RetroGhosty/laundry-system/assets/54449218/7037bcb8-694a-4618-98c6-fa726ad5eea8)

<p align="center">
A realtime laundry system made by Laravel and React with Inertia.js   
</p>
✅ Admin setup & admin dashboard<br/>
✅ Realtime transaction tracker for users<br/>
✅ Fully functional e-wallet and credit card payment using Paymongo gateway<br/>
✅ Mapbox integration to view the available laundry shop<br/>

# Installation

1. `sudo apt install php8.1 (check: php --version)`
2. disable apache2
3. install composer (check: composer --version)
4. `composer install`
5. `npm install`
6. put the authorization details in the .env file
7. `php artisan migrate`

## Database refresher

1. `php artisan migrate:reset`
2. `php artisan migrate`

## How to run the website

1. Open two command prompt
2. First CLI (backend) `php artisan serve`
3. Second CLI (frontend) `npm run dev`
