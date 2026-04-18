import { randomUUID } from "crypto";
import type {PokemonRepository} from "../../repositories/pokemonRepository";
import type {CreatePokemonRequestDto} from "../../dto/pokemon/createPokemonRequest.dto";
import type {Pokemon} from "../../models/pokemon";
import type {PokemonService} from "../pokemonService";

export class PokemonServiceImpl implements PokemonService{
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    async createPokemon(data: CreatePokemonRequestDto): Promise<Pokemon> {
        const now = new Date().toISOString();

        const pokemon: Pokemon = {
            id: randomUUID(),
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
}