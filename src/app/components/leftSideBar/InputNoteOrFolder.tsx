import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardEvent } from 'react';

function InputNoteOrFolder({ valueProps, onSubmit }: { valueProps?: string; onSubmit: (data: any) => void }) {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: valueProps || '',
    },
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default Enter key behavior (e.g., new line in the text field)
      handleSubmit(() => {
        const formData = getValues(); // Get the form values
        onSubmit(formData); // Pass the form data to the onSubmit prop
      })();
    }
  };

  return (
    <form>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="..."
            autoComplete="off"
            fullWidth
            InputProps={{
              sx: {
                height: 32,
                width: '100%',
                '& input': {
                  color: '#dadada',
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor: 'gray' },
              },
            }}
            onKeyDown={handleKeyDown}
          />
        )}
      />
    </form>
  );
}

export default InputNoteOrFolder;
