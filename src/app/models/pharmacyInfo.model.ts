import { Patient } from "./patient.model";

export interface PharmacyInfo {
    pharmacyId: number;
    pId: number | null;
    department: string | null;
    medicine: string | null;
    modifyTime: string;
    isActive: boolean;
}