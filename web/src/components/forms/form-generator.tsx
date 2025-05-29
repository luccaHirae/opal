import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormGeneratorProps {
  inputType: 'select' | 'input' | 'textarea';
  type?: 'text' | 'email' | 'password' | 'number';
  options?: { label: string; value: string; id?: string }[];
  label?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name?: string;
  errors?: FieldErrors<FieldValues>;
  lines?: number;
}

export function FormGenerator({
  inputType,
  type = 'text',
  options,
  label,
  placeholder,
  register,
  name = label?.toLowerCase().replace(/\s+/g, '-'),
  errors,
  lines = 1,
}: FormGeneratorProps) {
  switch (inputType) {
    case 'input':
      return (
        <Label
          htmlFor={`input-${label}`}
          className='flex flex-col gap-2 text-[#9d9d9d]'
        >
          {label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className='bg-transparent border-themeGray text-themeGray'
            {...register(name || label || '', {
              required: `${label} is required`,
            })}
          />
          <ErrorMessage
            errors={errors}
            name={name || label || ''}
            render={({ message }) => (
              <span className='text-red-400 mt-2'>{message}</span>
            )}
          />
        </Label>
      );

    case 'select':
      return (
        <Label htmlFor={`select-${label}`} className='flex flex-col gap-2'>
          {label}
          <select
            id={`select-${label}`}
            className='w-full bg-transparent border-[1px] p-3 rounded-lg'
            {...register(name || label || '', {
              required: `${label} is required`,
            })}
          >
            {options?.map((option) => (
              <option
                value={option.value}
                key={option.id}
                className='dark:bg-muted'
              >
                {option.label}
              </option>
            ))}
          </select>

          <ErrorMessage
            errors={errors}
            name={name || label || ''}
            render={({ message }) => (
              <span className='text-red-400 mt-2'>{message}</span>
            )}
          />
        </Label>
      );

    case 'textarea':
      return (
        <Label htmlFor={`textarea-${label}`} className='flex flex-col gap-2'>
          {label}
          <Textarea
            id={`textarea-${label}`}
            placeholder={placeholder}
            rows={lines}
            className='bg-transparent border-themeGray text-themeGray'
            {...register(name || label || '', {
              required: `${label} is required`,
            })}
          />

          <ErrorMessage
            errors={errors}
            name={name || label || ''}
            render={({ message }) => (
              <span className='text-red-400 mt-2'>{message}</span>
            )}
          />
        </Label>
      );

    default:
      return (
        <Label
          htmlFor={`input-${label}`}
          className='flex flex-col gap-2 text-[#9d9d9d]'
        >
          {label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className='bg-transparent border-themeGray text-themeGray'
            {...register(name || label || '', {
              required: `${label} is required`,
            })}
          />
          <ErrorMessage
            errors={errors}
            name={name || label || ''}
            render={({ message }) => (
              <span className='text-red-400 mt-2'>{message}</span>
            )}
          />
        </Label>
      );
  }
}
