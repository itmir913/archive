import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

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
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
    },
  },

  integrations: [tailwind(), sitemap()],
});
