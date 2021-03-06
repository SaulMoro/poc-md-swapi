module.exports = {
  moduleNameMapper: {
    '@md-starwars/environment': '<rootDir>/src/environments/environment.prod.ts',
    '@md-starwars/mocks/(.*)': '<rootDir>/src/mocks/$1',
    '@md-starwars/(.*)': '<rootDir>/src/app/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: ['e2e'],
};
