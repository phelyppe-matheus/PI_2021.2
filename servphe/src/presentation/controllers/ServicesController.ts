import { Request, Response } from "express";
import { CreateServiceCommand } from "../../application/command/CreateServiceCommand";
import { GetAllServicesQuery } from "../../application/query/GetAllServicesQuery";
import { database } from "../../infrastructure/persistense/firestore";
import { FirestoreServicesRepository } from "../../infrastructure/persistense/firestore/repositories/FirestoreServicesRepositore";

export class ServicesController{
    public async getAll(req: Request, res: Response): Promise<Response>{
        const repoService = new FirestoreServicesRepository()
        
        const query = new GetAllServicesQuery(repoService)

        const movies = await query.execute()

        return res.json(movies)
    }

    public async getById(req: Request, res: Response){

        const id = req.params.id
      
        const servico = await database.collection('servicos').doc(id).get()

        return res.json({id: servico.id, ...servico.data()})
    }

    public async create(req: Request, res: Response) {
        const {budget, register, title, limit, comments, description} = req.body
    
        const repoService = new FirestoreServicesRepository()
        const createServiceCommand = new CreateServiceCommand(repoService)

        const serviceId = await createServiceCommand.execute({title, budget, register, limit, comments, description})

        // const resultado = await database.collection('servicos').add(servico)
    
        return res.status(201).json({id:serviceId})
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id

        const servico = await database.collection('servicos').doc(id).update(req.body)

        return res.json(servico)
    }

    public async delete(req: Request, res: Response) {
        const {id} = req.params

        const servico = await database.collection('servicos').doc(id).delete()

        return res.status(204).json({'deleted': 'true'})
      }
}