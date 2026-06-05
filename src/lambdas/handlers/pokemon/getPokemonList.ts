import type { PokemonService } from "../../services/pokemonService";
import { toPokemonListResponseDto } from "../../mappers/pokemonMapper";
import { PokemonListResponseDto } from "../../dto/pokemon/pokemonResponse.dto";

export const getPokemonListHandler = async (
    service: PokemonService,
    userId: string
): Promise<PokemonListResponseDto[]> => {
    const pokemonList = await service.getPokemonList(userId);
    return pokemonList.map(toPokemonListResponseDto);
};
