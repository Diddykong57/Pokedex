import type { PokemonRepository } from "../../repositories/pokemonRepository";
import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import type { Pokemon, PokemonListItem } from "../../models/pokemon";
import type { PokemonService } from "../pokemonService";
import { generateId } from "../../utils/idUtils";
import { getCurrentDate } from "../../utils/dateUtils";

export class PokemonServiceImpl implements PokemonService {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    async createPokemon(data: CreatePokemonRequestDto): Promise<Pokemon> {
        const id = generateId();
        const now = getCurrentDate();

        const pokemon: Pokemon = {
            id: id,
            name: data.name,
            types: data.types,
            description: data.description,
            region: data.region,
            maxLevel: data.maxLevel,
            maxHp: data.maxHp,
            maxAttack: data.maxAttack,
            maxDefense: data.maxDefense,
            createdAt: now,
        };
        await this.pokemonRepository.create(pokemon);
        return pokemon;
    }

    async getPokemonList(): Promise<PokemonListItem[]> {
        return this.pokemonRepository.getPokemonList();
    }
}
