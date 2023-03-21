import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface OutPatient {
    outId: number;
    pId: number | null;
    patient: Patient | null;
    docId: number | null;
    doctor: Doctor | null;
    familyPhone: string | null;
    date: string | null;
    isActive: boolean;
}