import { createRouter } from './context';
import { z } from 'zod';

interface AllPokemon {
  count: number;
  next: string;
  previous: string;
  results: Array<{ name: string; url: string }>;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Array<{ type: { name: string } }>;
  species: { name: string; url: string };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string; url: string };
  }>;
  color: { name: string };
  moves: Array<{
    move: { name: string; url: string };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: { name: string; url: string };
      version_group: { name: string; url: string };
    }>;
  }>;
}

export const pokemonApi = createRouter()
  .query('getPokemon', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input }) {
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${input.name}`
      );
      const pokemon: Pokemon = await pokemonData.json();

      const pokemonSpecies = await fetch(pokemon.species.url);
      const species: {
        flavor_text_entries: Pokemon['flavor_text_entries'];
        color: Pokemon['color'];
      } = await pokemonSpecies.json();

      const filterToEnglishSpecies = species.flavor_text_entries.filter(
        (entry) => entry.language.name === 'en'
      );

      return {
        ...pokemon,
        flavor_text_entries: filterToEnglishSpecies,
        color: species.color,
      };
    },
  })
  .query('getAllPokemon', {
    input: z.object({
      cursor: z.string().optional(),
    }),

    async resolve({ input }) {
      const { cursor } = input;
      const res = await fetch(
        cursor || `https://pokeapi.co/api/v2/pokemon?limit=25`
      );
      const data: AllPokemon = await res.json();
      return data;
    },
  });
