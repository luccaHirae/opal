import { searchUsers } from '@/actions/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface SearchResult {
  id: string;
  subscription: {
    plan: 'PRO' | 'FREE';
  } | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  email: string | null;
}

export function useSearch(key: string, type: 'USERS') {
  const [query, setQuery] = useState<string>('');
  const [debounce, setDebounce] = useState('');
  const [onUsers, setOnUsers] = useState<SearchResult[] | undefined>(undefined);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      setDebounce(query);
    }, 1000);

    return () => {
      clearTimeout(delayInputTimeout);
    };
  }, [query]);

  const { refetch, isFetching } = useQuery({
    queryKey: [key, debounce],
    queryFn: async ({ queryKey }) => {
      if (type === 'USERS') {
        const data = await searchUsers(queryKey[1] as string);

        if (data.status === 200) setOnUsers(data.users);
      }
    },
    enabled: !!debounce,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);

    return () => {
      setOnUsers(undefined);
    };
  }, [debounce, refetch]);

  return {
    query,
    onSearchQuery,
    isFetching,
    onUsers,
  };
}
