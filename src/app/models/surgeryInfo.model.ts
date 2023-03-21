import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface SurgeryInfo {
    surgeryId: number;
    pId: number | null;
    patient: Patient | null;
    docId: number | null;
    doctor: Doctor | null;
    date: string | null;
    isActive: boolean;
}