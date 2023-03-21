export interface Admin {
    adminId: number;
    name: string | null;
    username: string | null;
    password: string | null;
    isActive: boolean;
}