module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
};
