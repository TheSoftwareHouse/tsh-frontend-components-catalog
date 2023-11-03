import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Dropzone } from './Dropzone';

export default {
  title: 'Dropzone',
  component: Dropzone,
};
export const FileUploadExample = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dropzone
      acceptedFiles={files}
      setAcceptedFiles={setFiles}
      onFileDialogCancel={() => console.log('OnFileDialogCancel')}
      onFileDialogOpen={() => console.log('OnFileDialogOpen')}
      onDropAccepted={() => console.log('onDropAccepted')}
      maxFiles={5}
      accept={{}}
      onDragOver={() => console.log('OnDragOver')}
      onDragLeave={() => console.log('OnDragLeave')}
      onDropRejected={() => console.log('OnDropRejected')}
      onDragEnter={() => console.log('OnDragEnter')}
    />
  );
};

export const FileUploadExampleWithForm = () => {
  const { handleSubmit, control, setValue, watch } = useForm<{ files: File[] }>({
    defaultValues: {
      files: [],
    },
  });

  const acceptedFiles = watch('files');

  const onSubmit = ({ files }: { files: File[] }) => {
    console.log('Files accepted:', files);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="files"
        control={control}
        render={() => (
          <Dropzone
            acceptedFiles={acceptedFiles}
            setAcceptedFiles={(newFiles) => setValue('files', newFiles)}
            onFileDialogCancel={() => console.log('OnFileDialogCancel')}
            onFileDialogOpen={() => console.log('OnFileDialogOpen')}
            onDropAccepted={() => console.log('onDropAccepted')}
            accept={{}}
            onDragOver={() => console.log('OnDragOver')}
            onDragLeave={() => console.log('OnDragLeave')}
            onDropRejected={() => console.log('OnDropRejected')}
            onDragEnter={() => console.log('OnDragEnter')}
          />
        )}
      />
      <button type="submit">Wyślij</button>
    </form>
  );
};
