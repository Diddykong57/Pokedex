import type { PokemonRepository } from "../../repositories/pokemonRepository";
import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import { Pokemon, PokemonListItem } from "../../models/pokemon";
import type { PokemonService } from "../pokemonService";
import { generateId } from "../../utils/idUtils";
import { getCurrentDate } from "../../utils/dateUtils";
import type { UpdatePokemonRequestDto } from "../../dto/pokemon/updatePokemonRequest.dto";
import { conflictError } from "../../utils/errorUtils";
import type { PokemonResponseDto } from "../../dto/pokemon/pokemonResponse.dto";

export class PokemonServiceImpl implements PokemonService {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    async createPokemon(userId: string, data: CreatePokemonRequestDto): Promise<PokemonResponseDto> {
        const existingPokemon = await this.pokemonRepository.getPokemonDetailsByName(userId, data.name);

        if (existingPokemon) {
            throw conflictError();
        }

        const id = generateId();
        const now = getCurrentDate();

        const pokemon: Pokemon = {
            id: id,
            name: data.name,
            types: data.types,
            description: data.description,
            region: data.region,
            level: data.level,
            hp: data.hp,
            attack: data.attack,
            defense: data.defense,
            createdAt: now,
        };
        await this.pokemonRepository.create(userId, pokemon);
        return pokemon;
    }

    async getPokemonList(userId: string): Promise<PokemonListItem[]> {
        return this.pokemonRepository.getPokemonList(userId);
    }

    async getPokemonDetails(userId: string, pokemonId:string): Promise<PokemonResponseDto> {
        return this.pokemonRepository.getPokemonDetails(userId, pokemonId);
    }

    async updatePokemon(userId: string, pokemonId: string, data: UpdatePokemonRequestDto): Promise<PokemonResponseDto> {
        const existingPokemon = await this.getPokemonDetails(userId, pokemonId);

        const { name, ...updatableFields } = data;

        const updatedPokemon: Pokemon = {
            ...existingPokemon,
            ...updatableFields,
        };

        await this.pokemonRepository.updatePokemon(userId, updatedPokemon);

        return updatedPokemon;
    }

    async deletePokemon(userId: string, pokemonId: string): Promise<void> {
        await this.pokemonRepository.deletePokemon(userId, pokemonId);
    }
}
