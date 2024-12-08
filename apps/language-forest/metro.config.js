const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver = {
    nodeModulesPaths: [
        path.resolve(projectRoot, 'node_modules'),
        path.resolve(workspaceRoot, 'node_modules'),
    ],
};

config.transformer = {
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
        },
    }),
};

// config.resolver.disableHierarchicalLookup = true;

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
