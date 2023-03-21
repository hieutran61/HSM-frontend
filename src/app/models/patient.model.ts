import { BloodTest } from "./bloodTest.model";
import { DischargeSummary } from "./dischargeSummary.model";
import { InPatient } from "./inpatient.model";
import { OutPatient } from "./outPatient.model";
import { PharmacyInfo } from "./pharmacyInfo.model";
import { SurgeryInfo } from "./surgeryInfo.model";
import { UrineTest } from "./urineTest.model";

export interface Patient {
    pId: number;
    name: string | null;
    gender: string | null;
    phone: string | null;
    department: string | null;
    inPatient: InPatient[] | null;
    outPatient: OutPatient[] | null;
    pharmacyInfo : PharmacyInfo[] | null;
    surgeryInfo: SurgeryInfo[] | null;
    urineTest: UrineTest[] | null;
    bloodTest: BloodTest[] | null;
    dischargeSummaries: DischargeSummary[] | null;
    isActive: boolean | null;
}