interface CreateFoldersProps {
  workspaceId: string;
}

export function CreateFolders({}: CreateFoldersProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-lg font-semibold'>Create Folders</h2>
      <p className='text-sm text-gray-500'>
        Create folders to organize your files and documents.
      </p>
      <div className='flex flex-col gap-4 mt-4'>
        <button className='btn btn-primary'>Create Folder</button>
        <button className='btn btn-secondary'>Create Subfolder</button>
      </div>
    </div>
  );
}
