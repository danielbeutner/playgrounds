/// <reference types="vite/client" />
export declare global {
  interface Window {
    webkitAudioContext: {
      prototype: AudioContext;
      new (contextOptions?: AudioContextOptions): AudioContext;
    };
  }
}
