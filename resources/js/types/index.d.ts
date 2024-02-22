export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string;
    address: string;
}

export interface Order {
    id: number;
    user_id: number;
    is_reviewed: number | boolean;
    addons: Array<string> | string | any;
    status: string;
    service_type: string;
    reserved_at: string;
    total_price: number;
    created_at: string;
    updated_at: string;
    address: string;
}

export interface Review {
    reviewAverage: number,
    reviewCount: number, 
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    webInfo: {
        websiteName: string;
        merchantEmail: string;
        merchantPhoneNumber: string;
        review: any;
    };
    geoLocation: {
        merchantAddress: string,
        longitude: any,
        latitude: any
    }
    currentUserReservation: Order;
    pastUserReservation: Order[];
};
