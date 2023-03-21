import { InPatient } from "./inpatient.model";
import { OutPatient } from "./outPatient.model";
import { SurgeryInfo } from "./surgeryInfo.model";

export interface Doctor {
    docId: number;
    name: string;
    username: string;
    password: string;
    department: string | null;
    specialization: string | null;
    phone: string | null;
    address: string | null;
    email: string | null;
    modifyTime: string;
    inPatient: InPatient[] | null;
    outPatient: OutPatient[] | null;
    surgeryInfo: SurgeryInfo[] | null;
    isActive: boolean;
}