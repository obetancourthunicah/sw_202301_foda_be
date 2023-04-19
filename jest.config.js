const  {compilerOptions} = require('./tsconfig.json');
const {pathsToModuleNameMapper} = require('ts-jest');
const path = require('path');
const rootDirector = path.resolve(__dirname);
const paths = pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'});
const mongoPreset = require('@shelf/jest-mongodb/jest-preset');
const tsPreset = require('ts-jest/jest-preset');
console.log('paths', paths);
module.exports ={...mongoPreset, ...tsPreset, ...{
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 70,
      function: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    ...paths,
  },
  reporters: [
    'default',
    [
      path.resolve(__dirname, 'node_modules', 'jest-html-reporter'),
      {
        pageTitle: 'Demo test Report',
        outputPath: 'test-report.html',
      },
    ],
  ],
  rootDir: rootDirector,
  roots: [rootDirector],
  setupFiles:[
    'dotenv/config',
  ],
  setupFilesAfterEnv: [`${rootDirector}/__tests__/setup.js`],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/build',
    `${rootDirector}/__tests__/fixtures`,
    `${rootDirector}/__tests__/setup.js`,
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest', {
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      },
    ],
  },
  testRegex: ['((/__tests__/.*)|(\\.|/)(test|spec))\\.tsx?$'],
  watchPathIgnorePatterns: ['globalConfig'],
}};
