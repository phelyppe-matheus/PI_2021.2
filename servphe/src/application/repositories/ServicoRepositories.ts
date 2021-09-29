import { Service } from "../../domain/entities/Services";

export interface ServicesRepository{
    all(): Promise<Service[]>
    create(service: FirebaseFirestore.DocumentData): Promise<string>
}