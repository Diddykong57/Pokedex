import type { PokemonRepository } from "../../repositories/pokemonRepository";
import type { CreatePokemonRequestDto } from "../../dto/pokemon/createPokemonRequest.dto";
import type { Pokemon } from "../../models/pokemon";
import type { PokemonService } from "../pokemonService";
import { generateId } from "../../utils/idUtils";
import { getCurrentDate } from "../../utils/dateUtils";
import type { UpdatePokemonRequestDto } from "../../dto/pokemon/updatePokemonRequest.dto";
import {conflictError} from "../../utils/errorUtils";
import type {PokemonListResponseDto, PokemonResponseDto} from "../../dto/pokemon/pokemonResponse.dto";

export class PokemonServiceImpl implements PokemonService {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

    async createPokemon(data: CreatePokemonRequestDto): Promise<PokemonResponseDto> {
        const existingPokemon = await this.pokemonRepository.getPokemonDetailsByName(data.name);

        if (existingPokemon){
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
            maxLevel: data.maxLevel,
            maxHp: data.maxHp,
            maxAttack: data.maxAttack,
            maxDefense: data.maxDefense,
            createdAt: now,
        };
        await this.pokemonRepository.create(pokemon);
        return pokemon;
    }

    async getPokemonList(): Promise<PokemonListResponseDto[]> {
        return this.pokemonRepository.getPokemonList();
    }

    async getPokemonDetails(id: string): Promise<PokemonResponseDto> {
        return this.pokemonRepository.getPokemonDetails(id);
    }

    async updatePokemon(id: string, data: UpdatePokemonRequestDto): Promise<PokemonResponseDto> {
        const existingPokemon = await this.getPokemonDetails(id);

        const { name, ...updatableFields } = data;

        const updatedPokemon: Pokemon = {
            ...existingPokemon,
            ...updatableFields,
        };

        await this.pokemonRepository.updatePokemon(updatedPokemon);

        return updatedPokemon;
    }

    async deletePokemon(pk: string): Promise<void> {
        await this.pokemonRepository.deletePokemon(pk);
    }
}
