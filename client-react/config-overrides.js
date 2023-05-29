const webpack = require('webpack');

module.exports = function override(config, env) {
  // Adicione o fallback "util" ao resolve fallback
  config.resolve.fallback = {
    ...config.resolve.fallback,
    util: require.resolve('util/'),
  };

  // Retorna a configuração atualizada
  return config;
};
