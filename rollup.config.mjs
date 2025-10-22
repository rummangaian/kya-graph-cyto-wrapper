import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'CytoscapeService',
      globals: {
        cytoscape: 'cytoscape'
      }
    }
  ],
  external: ['cytoscape'],
  plugins: [typescript()],
};
