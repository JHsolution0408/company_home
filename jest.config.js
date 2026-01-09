/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp|avif)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^gatsby$': '<rootDir>/test/__mocks__/gatsby.js',
  },
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  verbose: false,
}
