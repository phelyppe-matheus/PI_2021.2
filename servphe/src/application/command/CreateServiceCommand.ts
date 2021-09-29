import { ServicesRepository } from "../repositories/ServicoRepositories";

interface CreateServiceRequestModel{
    title: string
    budget: string
    register: Date
    limit: Date
    comments: string
    description: string
}

export class CreateServiceCommand{
    private serviceRepository: ServicesRepository

    constructor(serviceRepository: ServicesRepository){
        this.serviceRepository = serviceRepository
    }

    public async execute(req: CreateServiceRequestModel): Promise<string>{
        const serviceId = this.serviceRepository.create(req)
        return serviceId
    }
}