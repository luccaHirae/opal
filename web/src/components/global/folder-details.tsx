'use client';

import { getFolderDetails } from '@/actions/workspace';
import { QUERY_KEYS } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

interface FolderDetailsProps {
  folderId: string;
}

export function FolderDetails({ folderId }: FolderDetailsProps) {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.FOLDER_DETAILS],
    queryFn: () => getFolderDetails(folderId),
  });

  return (
    <div className='flex items-center'>
      <h2 className='text-[#bdbdbd] text-2xl'>{data?.folder?.name}</h2>
    </div>
  );
}
