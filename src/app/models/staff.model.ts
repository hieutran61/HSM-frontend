export interface Staff {
    staffId: number;
    name: string;
    username: string;
    password: string;
    department: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    modifyTime: string;
    isActive: boolean;
}