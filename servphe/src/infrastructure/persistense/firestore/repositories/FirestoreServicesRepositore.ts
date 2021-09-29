import { database } from "..";
import { ServicesRepository } from "../../../../application/repositories/ServicoRepositories";
import { Service } from "../../../../domain/entities/Services";

export class FirestoreServicesRepository implements ServicesRepository{
    public async all(): Promise<Service[]>{
        const servicosRef = database.collection('servicos')

        const servicosDoc = await servicosRef.get()

        const servicos = servicosDoc.docs.map(doc=>({id: doc.id, ...doc.data()}))

        return servicos as Service[]
    }

    public async create(service: FirebaseFirestore.DocumentData): Promise<string>{
        const servicosRef = database.collection('servicos')

        const servicosDoc = await servicosRef.add(service)

        return servicosDoc.id
    } 
}
