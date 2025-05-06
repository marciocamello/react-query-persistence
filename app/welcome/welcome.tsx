import { useQuery } from "@tanstack/react-query";
import { handleGetPokemons } from "~/api/pokemon";

export function Welcome() {

  const { data: PogemonsData, isLoading, error } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => handleGetPokemons('limit=10&offset=0'),
    gcTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {PogemonsData && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Welcome to the Pokemon App!</h1>
          <ul className="mt-4">
            {PogemonsData.results.map((pokemon: any) => (
              <li key={pokemon.name} className="text-lg">
                {pokemon.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}