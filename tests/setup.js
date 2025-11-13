// Jest setup file
global.console = {
    ...console,
    // Suppress console.log during tests to keep output clean
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

// Set test environment variables
process.env.NODE_ENV = 'test';