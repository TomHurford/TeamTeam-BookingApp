module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.css$": "some-css-transformer",
  },
  "collectCoverage": true,
  "coverageReporters": ["json", "lcov", "text", "clover"],
  "coverageDirectory": "coverage",
  "covergeThreshold": {
    "global": {
      "branches": 0,
      "functions": 0,
      "lines": 0,
      "statements": 0
    },
    "moduleDirectories": ["node_modules", "client"],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
