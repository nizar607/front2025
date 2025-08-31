export interface Role {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    enabled: boolean;
    subscribed: boolean;
    phoneNumber: string | null;
    address: string | null;
    image: string | null;
    roles: Role[];
    accesses: any[];
    createdAt: string;
    updatedAt: string;
}
