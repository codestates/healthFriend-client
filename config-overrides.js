const { override, fixBabelImports } = require('customize-cra');
// import 형태로 변환이 안됨.

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
