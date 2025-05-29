'use client';

import { FormGenerator } from '@/components/forms/form-generator';
import { useCreateWorkspace } from '@/hooks/use-create-workspace';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/global/loader';

export function WorkspaceForm() {
  const form = useCreateWorkspace();

  return (
    <form className='flex flex-col gap-4'>
      <FormGenerator
        name='name'
        placeholder='Enter workspace name'
        label='Workspace Name'
        inputType='input'
        type='text'
        register={form.register}
        errors={form.formState.errors}
      />

      <Button
        type='submit'
        disabled={form.isPending}
        className='text-sm w-full mt-2'
      >
        <Loader state={form.isPending}>Create Workspace</Loader>
      </Button>
    </form>
  );
}
