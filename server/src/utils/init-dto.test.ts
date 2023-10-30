import { validate } from 'class-validator';

import { initDto } from './init-dto.util';
import { HttpException } from '../services/http-exception/index.service';

jest.mock('class-validator', () => ({ validate: jest.fn() }));

describe('initDto', () => {
    it('should not throw an error when validation succeeds', async () => {
        (validate as jest.Mock).mockResolvedValue([]);

        const reqBody = {};
        const Dto = class TestDto {};

        try {
            await initDto(Dto, reqBody);
        } catch (error) {
            expect(error).toBeUndefined();
        }
    });

    it('should throw an HttpException with a 400 status code when validation fails', async () => {
        (validate as jest.Mock).mockResolvedValue([
            { constraints: { prop1: 'error1', prop2: 'error2' } },
        ]);

        const reqBody = {};
        const Dto = class TestDto {};

        try {
            await initDto(Dto, reqBody);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.statusCode).toBe(400);
        }
    });
});
