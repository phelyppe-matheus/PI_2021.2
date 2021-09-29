import { Service } from "../../domain/entities/Services";
import { ServicesRepository } from "../repositories/ServicoRepositories";

export class GetAllServicesQuery{
    private movieRepository: ServicesRepository

    constructor(movieRepository: ServicesRepository){
        this.movieRepository = movieRepository
    }

    public async execute(): Promise<Service[]>{
        return this.movieRepository.all()
    }

}
