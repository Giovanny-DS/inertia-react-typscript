<p align="center" style="margin-top: 5px;"><img src="https://laravel.com/assets/img/components/logo-jetstream.svg"></p>

## Information

This is a Laravel Jetstream scaffolding Using the Inertia stack but React instead Vue. Feel free to Contirbuting, open Issues and rate if you want. Build something amazing

## Instructions

### Without Teams:

* `Git clone https://github.com/Giovanny-DS/inertia-react-typscript.git <YourFolderName>`
* `cd <YourFolderName>`
* `composer install`
* `npm install && npm run dev`
* Set up you .Env file. ,ake sure your set the following configurations:
    * Set you Database Credentials.
    * your **`APP_URL`** including the port. Example: (**`http://127.0.0.1:8080`**)
    * set **`SANCTUM_STATEFUL_DOMAINS`**, **`APP_URL`**, **`SESSION_DOMAIN`**. if you Get code 419, Page Expired, or cors errores. please check this Configurations.*
* `php artisan migrate --seed`
* `php artisan serve`. if you ser a custom host and port. use `php artisan serve --host=<yourhost> --port=<yourposrt>`. and config your .Env variables.
* user: `admin@admin.com` 
* password: `password`

### With Teams:

* This is on Development proccess

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Documentation Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## About Jetstream

Laravel Jetstream is a beautifully designed application scaffolding for Laravel. Jetstream provides the perfect starting point for your next Laravel application and includes login, registration, email verification, two-factor authentication, session management, API support via [Laravel Sanctum](https://github.com/laravel/sanctum), and optional team management.

Jetstream is designed using [Tailwind CSS](https://tailwindcss.com) and offers your choice of [Livewire](https://jetstream.laravel.com/1.x/stacks/livewire.html) or [Inertia](https://jetstream.laravel.com/1.x/stacks/inertia.html) scaffolding.

## Documentation Jetstrean

Documentation for Jetstream can be found on the [Jetstream website](https://jetstream.laravel.com).

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
