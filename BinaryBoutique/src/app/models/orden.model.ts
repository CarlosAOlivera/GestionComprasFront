export interface Orden {
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    subtotal: number;
    tax: number;
    deliveryCost: number;
    total: number;
    ordenItems: OrdenItem[];
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    deliveryInfo?: string;
  }
  
  export interface OrdenItem {
    productName: string;
    quantity: number;
    price: number;
  }
  