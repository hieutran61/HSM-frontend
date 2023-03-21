import { Patient } from "./patient.model";

export interface UrineTest {
    urineTestId: number;
    pId: number | null;
    patient: Patient | null;
    mediclatestype: string | null;
    color: string | null;
    clarity: string | null;
    odor: string | null;
    specificGravity: string | null;
    glucose: string | null;
    description: string | null;
    isActive: boolean;
}