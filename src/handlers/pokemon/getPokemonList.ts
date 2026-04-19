import type {PokemonRepository} from "../../repositories/pokemonRepository";
import {LocalPokemonRepository} from "../../repositories/impl/local/localPokemonRepository";
import type {PokemonService} from "../../services/pokemonService";
import {PokemonServiceImpl} from "../../services/impl/pokemonServiceImpl";
import type {ApiResponse} from "../../global/types/api";
import {handleRequest} from "../utils/handleRequest";
import {toPokemonListResponseDto} from "../../mappers/pokemonMapper";

const repository: PokemonRepository = new LocalPokemonRepository();
const service: PokemonService = new PokemonServiceImpl(repository);

export const handler = async (): Promise<ApiResponse> => {
    return handleRequest( async () => {
        const pokemonList = await service.getPokemonList();
        return pokemonList.map(toPokemonListResponseDto);
    })
}