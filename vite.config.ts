import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';
import obfuscatorBox from 'rollup-plugin-obfuscator';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscatorBox({
      global:true,
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        rotateUnicodeArray: true,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        debugProtectionInterval: 2000,
        disableConsoleOutput: true,
        domainLock: [],
        identifierNamesGenerator: "hexadecimal",
        identifiersPrefix: "",
        inputFileName: "",
        log: true,
        renameGlobals: true,
        reservedNames: [],
        reservedStrings: [],
        seed: 0,
        selfDefending: true,
        sourceMap: false,
        sourceMapBaseUrl: "",
        sourceMapFileName: "",
        sourceMapMode: "separate",
        stringArray: true,
        stringArrayEncoding: ["base64"],
        stringArrayThreshold: 0.75,
        target: "browser",
        transformObjectKeys: true,
        unicodeEscapeSequence: true,

        
        domainLockRedirectUrl: "about:blank",
        forceTransformStrings: [],
        identifierNamesCache: null,
        identifiersDictionary: [],
        ignoreImports: true,
        optionsPreset: "default",
        renameProperties: false,
        renamePropertiesMode: "safe",
        sourceMapSourcesMode: "sources-content",
       
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.5,
       
        stringArrayIndexesType: ["hexadecimal-number"],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: "variable",
      },
    }),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name:"愛哭包專用 - 盛趣腳本",
        icon: 'https://cdn-icons-png.flaticon.com/512/3712/3712589.png',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://**.sdo.com/*'],  
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
});
