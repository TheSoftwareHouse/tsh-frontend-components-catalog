import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { CSSProperties, useMemo } from 'react';

import { baseStyle, acceptStyle, focusedStyle, rejectStyle } from './Dropzone.styles';

interface DropzoneProps {
  acceptedFiles: File[];
  setAcceptedFiles: (files: File[]) => void;
}

export const Dropzone = ({ acceptedFiles, setAcceptedFiles, onDrop, ...props }: DropzoneProps & DropzoneOptions) => {
  const { getRootProps, getInputProps, isDragReject, isFocused, isDragAccept } = useDropzone({
    ...props,
    onDrop: (...params) => {
      onDrop && onDrop(...params);
      setAcceptedFiles([...params[0], ...acceptedFiles]);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div>
      <div {...getRootProps()} style={style as CSSProperties}>
        <input {...getInputProps()} />
        <p>Drag and drop files here</p>
      </div>
      <div>
        <h4>Files selected:</h4>
        <ul>
          {acceptedFiles.map((file: { name: string }, index) => (
            <li key={file.name}>
              {file.name}
              <button
                type="button"
                onClick={() => {
                  const updatedFiles = acceptedFiles.filter((_, fileIndex) => fileIndex !== index);
                  setAcceptedFiles(updatedFiles);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
