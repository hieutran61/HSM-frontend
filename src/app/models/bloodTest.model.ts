import { Patient } from "./patient.model";

export interface BloodTest {
    bloodTestId: number;
    pId: number | null;
    patient: Patient | null;
    mediclatestype: string | null;
    bloodGroup: string | null;
    bloodSugar: string | null;
    sacid: string | null;
    description: string | null;
    isActive: boolean;
}