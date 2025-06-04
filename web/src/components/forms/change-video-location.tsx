import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

interface ChangeVideoLocationProps {
  videoId?: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
}

export function ChangeVideoLocation({}: // videoId,
// currentWorkspace,
// currentFolder,
// currentFolderName,
ChangeVideoLocationProps) {
  return (
    <div className='flex flex-col gap-y-5'>
      <div className='border-[1px] rounded-xl p-5'>
        <h2 className='text-xs mb-5 text-[#a4a4a4]'>Current</h2>
        <p className='text-[#a4a4a4]'>Workspace</p>
        <p className='text-[#a4a4a4] text-sm'>This video has no folder</p>
      </div>

      <Separator orientation='horizontal' />

      <div className='flex flex-col gap-y-5 p-5 border-[1px] rounded-xl'>
        <h2 className='text-xs text-[#a4a4a4]'>To</h2>
        <Label className='flex-col gap-y-2 flex'>
          <p className='text-xs'>Workspace</p>

          <select className='rounded-xl text-base bg-transparent'>
            <option className='text-[#a4a4a4]' value='placeholder'>
              Select a workspace
            </option>
          </select>
        </Label>
      </div>
    </div>
  );
}
