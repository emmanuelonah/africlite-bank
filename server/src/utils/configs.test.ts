import { configs } from './configs.util';

describe('configs', () => {
    it('should return configuration object', () => {
        expect(configs.serverPort).toBe(8080);
        expect(configs.clientPort).toBe(4000);
        expect(configs.serverUrl).toBe('https://localhost:8080/');
        expect(configs.clientUrl).toBe('http://localhost:4000/');
        expect(typeof configs.serverDbUri).toBe('string');
    });
});
