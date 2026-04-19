import type { PokemonService } from "../../services/pokemonService";
import type { ApiResponse } from "../../global/types/api";
import { handleRequest } from "../utils/handleRequest";
import { toPokemonListResponseDto } from "../../mappers/pokemonMapper";

export const getPokemonListHandler = async (service: PokemonService): Promise<ApiResponse> => {
    return handleRequest(async () => {
        const pokemonList = await service.getPokemonList();
        return pokemonList.map(toPokemonListResponseDto);
    });
};
