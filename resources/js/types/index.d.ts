export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    status: string;
    created_at: string;
    updated_at: string;
}



export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    
};
