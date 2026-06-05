import type { PokemonService } from "../../services/pokemonService";
import { toPokemonResponseDto } from "../../mappers/pokemonMapper";
import { PokemonResponseDto } from "../../dto/pokemon/pokemonResponse.dto";

export const getPokemonDetailsHandler = async (
    service: PokemonService,
    userId: string,
    pokemonId: string
): Promise<PokemonResponseDto> => {
    const pokemon = await service.getPokemonDetails(userId, pokemonId);
    return toPokemonResponseDto(pokemon);
};
