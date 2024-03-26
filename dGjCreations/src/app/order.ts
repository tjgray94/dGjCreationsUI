export class Order {
    orderId?: number;
    products: String[];
    total: number;
    paymentType: string;
    name: string;
    address: string;
    orderTime?: string;
}