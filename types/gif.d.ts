declare module 'gif.js' {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    transparent?: number | string;
  }

  interface FrameOptions {
    delay?: number;
  }

  class GIF {
    constructor(options?: GIFOptions);
    addFrame(canvas: HTMLCanvasElement | ImageData, options?: FrameOptions): void;
    on(event: string, callback: (blob: Blob) => void): void;
    render(): void;
  }

  export = GIF;
}
