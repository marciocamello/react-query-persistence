import { QueryClient } from "@tanstack/react-query";

import {
    PersistQueryClientProvider,
    PersistedClient,
    Persister
} from "@tanstack/react-query-persist-client";

import { get, set, del } from 'idb-keyval';

interface CustomQueryProviderProps {
    children: React.ReactNode;
}

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
    return {
        persistClient: async (client: PersistedClient) => {
            await set(idbValidKey, client)
        },
        restoreClient: async () => {
            return await get<PersistedClient>(idbValidKey)
        },
        removeClient: async () => {
            await del(idbValidKey)
        },
    } satisfies Persister
}

export function CustomQueryProvider({ children }: CustomQueryProviderProps) {

    const queryClient = new QueryClient({
    });

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister: createIDBPersister('pokemon-db'),
                buster: `${window.location.pathname}-pokemon-db`,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
            }}
        >
            {children}
        </PersistQueryClientProvider>
    );
}