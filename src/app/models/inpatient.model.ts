import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface InPatient {
    inId: number | null;
    pId: number | null;
    patient: Patient | null;
    familyPhone: string | null;
    date: string | null;
    status: string | null;
    symptoms: string | null;
    wardNo: string | null;
    bedNo: string | null;
    docId: number | null;
    doctor: Doctor | null;
    isActive: boolean | null;
}