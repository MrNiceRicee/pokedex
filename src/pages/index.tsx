import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import Layout from '../components/layout';
import ctl from '@netlify/classnames-template-literals';

const PokemonLoaderComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="h-24 w-24">
        <Image
          width={96}
          height={96}
          layout="responsive"
          src="/swag-placement.png"
          alt={'whos that pokemon'}
          // placeholder="blur"
          blurDataURL="swag-placement.png"
          className="h-24 w-24"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
        {"who's that pokemon!"}
      </h2>
      <div className="flex flex-row items-center justify-center pt-3 space-x-3">
        <div className="px-4 py-2 text-sm font-medium text-gray-600 bg-grey-500 rounded-md dark:text-gray-300 dark:bg-gray-700">
          loading
        </div>
      </div>
    </div>
  );
};

const PokemonComponent = ({
  pokemon,
}: {
  pokemon: { name: string; url: string };
}) => {
  const initialNumber = pokemon.url.match(/\/(\d+)\//)?.[1];
  return (
    <Link href={`/pokemon/${initialNumber}`}>
      <a className={ctl(`group focus:outline-none`)}>
        <div
          key={pokemon.name}
          className={ctl(`flex flex-col items-center justify-center
              p-4 rounded-lg shadow-hard w-full
              bg-white dark:bg-gray-800
              transition-colors duration-300
              border-4 border-[#2563eb]
              group-focus:outline
              relative
              overflow-clip
              before:inset-0
              before:w-full
              before:h-full
              before:absolute
              before:bg-gradient-to-t
              before:from-transparent
              before:via-transparent
              before:to-yellow-400  
              before:opacity-0
              before:transition-opacity
              before:duration-300
              before:ease-in-out
              before:group-hover:opacity-100
              before:group-focus:opacity-100
        `)}
        >
          <div className="w-24 h-24 relative">
            <Image
              layout="fill"
              src={`https://serebii.net/art/th/${initialNumber}.png`}
              alt={pokemon.name}
              placeholder="blur"
              blurDataURL="swag-placement.png"
              objectFit="contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {pokemon.name}
          </h2>
          <div className="flex flex-row items-center justify-center pt-3 space-x-3"></div>
        </div>
      </a>
    </Link>
  );
};

{
  /* <a
className={ctl(`px-4 py-2 text-sm font-medium text-blue-500 border-blue-500 border-2 
rounded-md
hover:bg-yellow-500 hover:text-white 
focus:bg-yellow-500 focus:text-white
duration-300 ease-in-out
`)}
>
Details
</a> */
}

const Home: NextPage = () => {
  const allPokemon = trpc.useInfiniteQuery(['pokemonApi.getAllPokemon', {}], {
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const loadNext = () => {
    allPokemon.fetchNextPage();
  };

  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1
          className="font-pokemon text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700
        dark:text-gray-50
          transition-colors duration-300

        "
        >
          Poke
          <span
            className="text-yellow-300 text-stroke drop-shadow-text
          dark:text-yellow-400
            transition-colors duration-300
          "
          >
            dex
          </span>{' '}
          App
        </h1>
        <div
          className={ctl(`
          grid gap-3 pt-3 mt-3 text-center grid-cols-1 w-full lg:max-w-6xl
          lg:grid-cols-4 md:grid-cols-2
         `)}
        >
          <>
            {allPokemon.data?.pages.map((page) =>
              page.results.map((pokemon, index) => (
                <PokemonComponent
                  key={`${pokemon.name}-${index}`}
                  pokemon={pokemon}
                />
              ))
            )}
            {allPokemon.isLoading ? <PokemonLoaderComponent /> : null}
          </>
        </div>
        <button
          className={ctl(`my-5 px-4 py-2 w-full text-sm font-medium text-gray-700 rounded-md 
          bg-yellow-300 hover:bg-yellow-400
          focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 
          transition-all duration-300
          `)}
          onClick={loadNext}
        >
          load more
        </button>
      </Layout>
    </>
  );
};

export default Home;
