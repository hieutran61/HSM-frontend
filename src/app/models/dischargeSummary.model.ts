import { Patient } from "./patient.model";

export interface DischargeSummary {
    dischargeSumId: number;
    pId: number | null;
    patient: Patient | null;
    joinOnDate: string | null;
    dischargeDate: string | null;
    isActive: boolean;
}