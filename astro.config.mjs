// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],  // integrations tag helps add frameworks - allows usage of react components in code
  output: "static",         // output: server could be used for server side rendering, unlike current pre-rendered HTML
  vite: {                   // Astro is build on top of Vite
    plugins: [tailwindcss()],
    define: {
      __TEI_BASE_ENABLED__: true, // Change to false to remove <teiBaseStyle>
    }
  },
});