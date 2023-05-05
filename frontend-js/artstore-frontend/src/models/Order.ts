export interface Order {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    zip_code: number;
    finished: boolean;
    payment_method_id: number;
    delivery_method_id: number;
    user_id: number;
    voucher_id: number;
}
