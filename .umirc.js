const PROXY = 'http://localhost:3000/';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: {
          immer: true,
        },
        antd: true,
        dll: true,
      }
    ],
  ],
  proxy: {
    '/api': {
      'target': PROXY,
      'changeOrigin': true,
    },
  }
};
