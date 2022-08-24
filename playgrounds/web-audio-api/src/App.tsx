import React from 'react';
import { States } from './constants';
import { AudioListItem } from './components/AudioListItem';
import {
  formatDuration,
  generateHashFromString,
  getAudioMetaData,
  getFileData,
  formatMegaBytes,
} from './helper';

type Status = typeof States[keyof typeof States];

interface AudioFile {
  duration: number;
  error?: string;
  id: string;
  name: string;
  size: number;
  status: Status;
}

function generateIdFromFile(file: File): string {
  return generateHashFromString(file.name + file.size + file.lastModified);
}

const hasFiles = (files: File[] | undefined): files is File[] =>
  files !== undefined && files.length > 0;
const hasAudioFiles = (
  audioFiles: AudioFile[] | undefined
): audioFiles is AudioFile[] =>
  audioFiles !== undefined && audioFiles.length > 0;

export function App() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [files, setFiles] = React.useState<File[]>();
  const [audioFiles, setAudioFiles] = React.useState<AudioFile[]>();

  const handleFormOnChange = (event: React.FormEvent) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === 'file' &&
      event.target.files
    ) {
      setFiles([...event.target.files]);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const files = formData.getAll('files');

      setAudioFiles(
        files
          .map((file): AudioFile | undefined => {
            if (file instanceof File) {
              return {
                duration: 0,
                error: undefined,
                id: generateIdFromFile(file),
                name: file.name,
                size: file.size,
                status: States.PENDING,
              };
            }

            return undefined;
          })
          .filter((file): file is AudioFile => file !== undefined)
      );

      const audioFiles = await Promise.all(
        files.map(async (file, index): Promise<AudioFile> => {
          if (file instanceof File) {
            const id = generateIdFromFile(file);
            const fileData = await getFileData(file);

            if (fileData.kind === States.ERROR) {
              return {
                duration: 0,
                error: fileData.message,
                id,
                name: file.name,
                size: file.size,
                status: States.ERROR,
              };
            }

            const metaData = await getAudioMetaData(fileData.data);

            if (metaData.kind === States.ERROR) {
              return {
                duration: 0,
                error: metaData.message,
                id,
                name: file.name,
                size: file.size,
                status: States.ERROR,
              };
            }

            return {
              duration: metaData.duration,
              error: undefined,
              id,
              name: file.name,
              size: file.size,
              status: States.DECODED,
            };
          }

          return {
            duration: 0,
            error: 'File is not an instance of File',
            id: index.toString(),
            name: 'unknown',
            size: 0,
            status: States.ERROR,
          };
        })
      );

      setAudioFiles(audioFiles);
    }
  };

  const clearStates = () => {
    setAudioFiles(undefined);
    setFiles([]);
  };

  const result = hasAudioFiles(audioFiles) && audioFiles.length > 0 && (
    <ul>
      {audioFiles.map((file) => (
        <AudioListItem
          duration={formatDuration(file.duration)}
          error={file.error}
          id={file.id}
          key={file.id}
          name={file.name}
          size={formatMegaBytes(file.size)}
          status={file.status}
        />
      ))}
    </ul>
  );

  const fileList = hasFiles(files) && (
    <ul>
      {files.map((file) => (
        <li key={file.name}>{file.name}</li>
      ))}
    </ul>
  );

  return (
    <div>
      <h1>web audio api</h1>
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        onChange={handleFormOnChange}
      >
        <fieldset>
          <legend>Upload</legend>
          <label htmlFor="fileinput">File:</label>
          <input name="files" type="file" id="fileinput" multiple />
          {fileList}
        </fieldset>
        <button type="submit">Decode</button>
        <button type="button" onClick={clearStates}>
          Clear
        </button>
      </form>
      {result}
    </div>
  );
}
