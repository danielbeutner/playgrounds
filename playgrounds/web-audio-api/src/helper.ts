import { States } from './constants';

/**
 * Reads the contents of a file and returns an ArrayBuffer.
 * @param file {File} File to read.
 * @returns {Promise<ArrayBuffer>} ArrayBuffer of the file.
 */
function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsArrayBuffer(file);
  });
}

type Success<T = Record<string, any>> = { kind: typeof States.SUCCESS } & T;
type ErrorWithMessage = { kind: typeof States.ERROR; message: string };
type Error<T = void> = T extends void ? ErrorWithMessage : Error & T;

type FileMetaData =
  | Success<{
      data: ArrayBuffer;
      name: string;
      size: number;
      type: string;
    }>
  | Error<{ name: string }>;

/**
 * Reads a file and returns the an file data along with the file name, size, and type.
 * @param file {File} File to read.
 * @returns {Promise<FileMetaData>} Meta data of the file.
 */
export async function getFileData(file: File): Promise<FileMetaData> {
  try {
    const result = await readFile(file);

    return {
      kind: States.SUCCESS,
      data: result,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        kind: States.ERROR,
        name: file.name,
        message: error.message,
      };
    }

    return {
      kind: States.ERROR,
      name: file.name,
      message: 'Unknown error in getFileMetaData',
    };
  }
}

type AudioMetaData =
  | Success<{
      channels: number;
      duration: number;
      length: number;
      sampleRate: number;
    }>
  | Error;

/**
 * Returns the AudioContext instance.
 * @returns {AudioContext} The AudioContext instance.
 */
function getAudioContext(): AudioContext {
  if ('webkitAudioContext' in window) {
    return new window.webkitAudioContext();
  }

  return new window.AudioContext();
}

/**
 * Function to get the duration and size of an audio file.
 * @param result {AudioMetaData} ArrayBuffer to decode.
 * @returns {Promise<AudioMetaData>} Duration and size of the audio file.
 */
export async function getAudioMetaData(
  result: ArrayBuffer
): Promise<AudioMetaData> {
  if (!(result instanceof ArrayBuffer)) {
    return {
      kind: States.ERROR,
      message: 'Argument of getAudioMetaData must be type of ArrayBuffer.',
    };
  }

  const audioContext = getAudioContext();

  try {
    const audioBuffer = await audioContext.decodeAudioData(result);

    return {
      kind: States.SUCCESS,
      channels: audioBuffer.numberOfChannels,
      duration: audioBuffer.duration,
      length: audioBuffer.length,
      sampleRate: audioBuffer.sampleRate,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        kind: States.ERROR,
        message: error.message,
      };
    }

    return {
      kind: States.ERROR,
      message: 'Unknown error in decodeAudioData. Is it really an audio file?',
    };
  }
}

/**
 * Function to get the audio length in format of mm:ss
 * @param duration in seconds
 * @returns {string} in format of mm:ss
 */
export function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Function to get the size in MegaBytes
 * @param bytes in bytes
 * @returns {number} MegaBytes
 */
export function formatMegaBytes(bytes: number): number {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

/**
 * Generates a hash string from a given string
 * @param string String to hash
 * @returns {string} Hash string
 */
export function generateHashFromString(string: string): string {
  var chk = 0x12345678;
  var len = string.length;
  for (var i = 0; i < len; i++) {
    chk += string.charCodeAt(i) * (i + 1);
  }

  return (chk & 0xffffffff).toString(16);
}
