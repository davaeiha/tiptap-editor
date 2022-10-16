module.exports = api => {
  api.cache.using(() => process.env.FAST_REFRESH)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          corejs: 3,
          useBuiltIns: 'usage',
          targets: 'ie 11'
        }
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic'
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      '@babel/transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-arrow-functions',
      ...(api.env('FAST_REFRESH') === 'true' ? ['react-refresh/babel'] : []),
      'babel-plugin-styled-components',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@schemas': './src/auto-generated-gql-schema',
            '^@gql/(.+)': './src/graphql/\\1',
            '^@apolloContext/(.+)': './src/apollo/\\1',
            '^@component/(.+)': './src/component/\\1',
            '^@pages/(.+)': './src/pages/\\1',
            '^@kb/(.+)': './src/pages/panel/knowledge-base/\\1',
            '^@module/(.+)': './src/module/\\1',
            '^@context/(.+)': './src/context/\\1',
            '^@hooks/(.+)': './src/hooks/\\1',
            '^@mocks/(.+)': './src/mocks/\\1',
            '^@helpers': './src/helpers\\1',
          }
        }
      ]
    ],
    overrides: [
      {
        test: './node_modules',
        sourceType: 'unambiguous'
      }
    ]
  }
}
