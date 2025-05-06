//https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0

export const handleGetPokemons = async (params?: string) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
    }
}