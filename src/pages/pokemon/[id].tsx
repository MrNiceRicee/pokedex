import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ctl from '@netlify/classnames-template-literals';
import { z } from 'zod';
import colors from 'tailwindcss/colors';
import autoAnimate from '@formkit/auto-animate';
import { trpc } from '../../utils/trpc';
import Layout from '../../components/layout';
import useEscapeBack from '../../hooks/EscapeBack';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

const PokemonLoaderComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg">
      <figure className="flex flex-col items-center rounded-t-lg justify-center w-full h-full p-4 border-b-4 border-yellow-300">
        <div className="relative w-48 h-48">
          <Image
            layout="fill"
            src="/swag-placement.png"
            alt="who's that pokemon"
            placeholder="blur"
            blurDataURL="/swag-placement.png"
            objectFit="contain"
          />
        </div>
      </figure>
      <h2 className="text-2xl font-bold text-gray-700">
        Who&apos;s that pokemon!
      </h2>
    </div>
  );
};

const PokemonMoves = ({
  moves,
}: {
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
}) => {
  const [all, setAll] = useState(false);
  const [viewMoves, setViewMoves] = useState(moves.slice(0, 5));
  const ref = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    ref.current && autoAnimate(ref.current);
  }, [ref]);

  const viewMore = () => {
    if (viewMoves.length === moves.length) {
      setAll(true);
    }
    setViewMoves((old) => [
      ...old,
      ...moves.slice(old.length, old.length + 15),
    ]);
  };
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800">Moves</h3>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left text-gray-700">Name</th>
            <th className="text-left text-gray-700">Level learned</th>
            <th className="text-left text-gray-700">Method</th>
          </tr>
        </thead>
        <tbody ref={ref}>
          {viewMoves.map((move) => (
            <tr key={move.move.name}>
              <td className="text-gray-800">{move.move.name}</td>
              <td className="text-gray-800">
                {move.version_group_details[0]?.level_learned_at}
              </td>
              <td className="text-gray-800">
                {move.version_group_details[0]?.move_learn_method.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className={`my-5 px-4 py-2 w-full text-sm font-medium text-gray-700 rounded-md 
          bg-yellow-300 hover:bg-yellow-400
          focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 
          transition-all duration-300
          ${all ? 'hidden' : ''}
          `}
        onClick={viewMore}
        disabled={all}
      >
        {all ? 'No more moves' : 'View more moves'}
      </button>
    </div>
  );
};

const PokemonFlavorText = ({
  flavorText,
}: {
  flavorText: Array<{
    flavor_text: string;
  }>;
}) => {
  const [selected, setSelected] = useState(flavorText[0]);
  const handleUniqueRandomizedText = () => {
    const randomIndex = Math.floor(Math.random() * flavorText.length);
    if (
      randomIndex !==
      flavorText.findIndex((t) => t.flavor_text === selected?.flavor_text)
    ) {
      return setSelected(flavorText[randomIndex]);
    } else {
      handleUniqueRandomizedText();
    }
  };
  return (
    <>
      <p className="text-gray-800">{selected?.flavor_text}</p>
      <button
        className="my-5 px-4 py-2 text-sm font-medium text-gray-700 rounded-md
        bg-yellow-300 hover:bg-yellow-400
        focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-opacity-75
        transition-all duration-300"
        onClick={handleUniqueRandomizedText}
      >
        Randomize
      </button>
    </>
  );
};

const PokemonDetails = ({ id }: { id: string }) => {
  const pokemon = trpc.useQuery(['pokemonApi.getPokemon', { name: id }]);

  if (!pokemon.data) {
    return <PokemonLoaderComponent />;
  }

  const backgroundColor =
    colors[pokemon.data.color.name as keyof DefaultColors] ?? colors.gray;

  return (
    <>
      <article
        className={ctl(
          `max-w-md flex flex-col items-center justify-center rounded-lg
          shadow-lg
          border-8 border-yellow-300
          bg-yellow-300
          `
        )}
      >
        <figure
          className="flex flex-col items-center rounded-t-lg justify-center w-full h-full p-4 border-b-4 border-yellow-300"
          style={{
            background: `linear-gradient(0deg, ${backgroundColor[500]}, ${backgroundColor[200]})`,
          }}
        >
          <div className="relative w-48 h-48">
            <Image
              layout="fill"
              src={`https://serebii.net/art/th/${id}.png`}
              alt={`${pokemon.data?.name}-art`}
              placeholder="blur"
              blurDataURL="swag-placement.png"
              objectFit="contain"
            />
          </div>
          <div className="flex  flex-row">
            <div className="relative w-24 h-24">
              <Image
                layout="fill"
                src={pokemon.data.sprites.front_default}
                alt={`${pokemon.data?.name}-front-sprite`}
                placeholder="blur"
                blurDataURL="swag-placement.png"
                objectFit="contain"
              />
            </div>
            <div className="relative w-24 h-24">
              <Image
                layout="fill"
                src={pokemon.data.sprites.back_default}
                alt={`${pokemon.data?.name}-back-sprite`}
                placeholder="blur"
                blurDataURL="swag-placement.png"
                objectFit="contain"
              />
            </div>
          </div>
        </figure>
        <header className="w-full bg-gray-50 px-4 pt-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {pokemon.data?.name}
            <span
              style={{
                color: backgroundColor[500],
              }}
              className="ml-3"
            >
              # {pokemon.data.id.toString().padStart(3, '0')}
            </span>
          </h2>
          <PokemonFlavorText flavorText={pokemon.data.flavor_text_entries} />
          {/* <p className="text-gray-700">
            {randomFlavorText?.toLocaleLowerCase()}
          </p> */}
        </header>
        <section className="w-full flex flex-col p-4 gap-4 bg-gray-50 rounded-b-lg">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Types</h3>
            <ul className="flex flex-row flex-wrap">
              {pokemon.data.types.map((type) => (
                <li
                  key={type.type.name}
                  className="flex flex-row w-24 items-center justify-center px-2 py-1 m-1 text-sm font-bold text-white bg-gray-800 rounded-full"
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-700">Height</span>
                <span className="text-gray-800">
                  {pokemon.data.height / 10}m
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700">Weight</span>
                <span className="text-gray-800">
                  {pokemon.data.weight / 10}kg
                </span>
              </div>
            </div>
          </div>
          <PokemonMoves
            moves={pokemon.data.moves.sort(
              (a, b) =>
                (a.version_group_details[0]?.level_learned_at || 0) -
                (b.version_group_details[0]?.level_learned_at || 0)
            )}
          />
        </section>
      </article>
      <div className="flex flex-row items-center justify-center pt-3 space-x-3">
        <Link href="/">
          <a
            className="px-4 py-2 text-sm font-medium text-blue-500 outline-blue-500 outline outline-2 rounded-md
          hover:bg-yellow-500 hover:text-white duration-300 ease-in-out
          focus:bg-yellow-500 focus:text-white"
          >
            Back
          </a>
        </Link>
      </div>
    </>
  );
};

export const Pokemon = () => {
  const id = useRouter().query.id;
  const idString = z.string();

  useEscapeBack();

  try {
    idString.parse(id);
  } catch (err) {
    return <div>Invalid Pokemon Id or Name</div>;
  }

  return (
    <Layout>
      <Suspense>
        <PokemonDetails id={id as string} />
      </Suspense>
    </Layout>
  );
};

export default Pokemon;