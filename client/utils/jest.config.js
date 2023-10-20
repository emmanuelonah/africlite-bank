module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    roots: ['<rootDir>/src'],
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
    testMatch: ['**/__tests__/**/*.+(ts|js|tsx)', '**/?(*.)+(spec|test).+(ts|js|tsx)'],
    transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
    coverageThreshold: { '<rootDir>/src/**/*.test.@(js|jsx|ts|tsx)': { lines: 85 } },

    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};
