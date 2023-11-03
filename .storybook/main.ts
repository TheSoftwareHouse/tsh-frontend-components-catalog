import { mergeConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { default as viteTsConfigPaths } from 'vite-tsconfig-paths';

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
module.exports = {
  stories: ['../packages/components/**/*.stories.mdx', '../packages/components/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  features: {
    emotionAlias: false,
    storyStoreV7: true,
  },

  async viteFinal(config, { configType }) {
    /** @type {import('vite').UserConfig} */
    const decoratedConfig = {
      plugins: [viteTsConfigPaths()],
      optimizeDeps: {
        include: ['storybook-dark-mode'],
        esbuildOptions: {
          define: {
            global: 'globalThis',
          },
        },
      },
      build: {
        rollupOptions: {
          plugins: [rollupNodePolyFill()],
        },
        chunkSizeWaringLimit: '1mb',
      },
    };

    if (configType === 'DEVELOPMENT') {
      decoratedConfig.build = {
        ...decoratedConfig.build,
      };
    }

    return mergeConfig(config, decoratedConfig);
  },

  docs: {
    autodocs: true,
  },
};
