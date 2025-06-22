
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add support for TypeScript path aliases
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
};

// Add support for additional file extensions
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json');

module.exports = config;
