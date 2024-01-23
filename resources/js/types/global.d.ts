import { AxiosInstance } from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import ziggyRoute from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        Pusher: any;
        Echo: any;
    }

    var route: typeof ziggyRoute;
}
