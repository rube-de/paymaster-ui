/// <reference types="vite/client" />

declare module '@metamask/jazzicon' {
  const jazzicon: (diameter: number, seed: number) => HTMLDivElement
  export default jazzicon
}
