import { defineConfig, passthroughImageService } from 'astro/config';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://luminousky.com',
  base: '/archive',
  output: 'static',

  image: {
    // 이미 압축된 아카이브 이미지이므로 최적화 비활성화
    service: passthroughImageService(),
  },

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },

  integrations: [tailwind()],
});