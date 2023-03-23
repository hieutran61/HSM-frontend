export interface Doctor {
  docId: number;
  name: string;
  username: string;
  password: string;
  department?: string;
  specialization?: string;
  phone?: string;
  address?: string;
  email?: string;
  modifyTime?: string;
  isActive: boolean;
}
