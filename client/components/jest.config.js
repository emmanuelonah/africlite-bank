module.exports = {
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
    setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    coveragePathIgnorePatterns: ['./node_modules', './coverage', './jest.config.js'],
    coverageThreshold: {
        '<rootDir>/src/**/*.test.@(js|jsx|ts|tsx)': {
            lines: 85,
        },
    },
};
