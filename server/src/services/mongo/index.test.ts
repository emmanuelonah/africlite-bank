import { connectDb, disconnectDb } from './index.service';

const mockedOnSuccessCallback = jest.fn();

describe('mongoServices', () => {
    const consoleSpy = jest.spyOn(console, 'info');

    afterAll(async () => {
        consoleSpy.mockRestore();
        await disconnectDb();
    });

    it('should connect to mongo db', async () => {
        await connectDb(mockedOnSuccessCallback);

        expect(mockedOnSuccessCallback).toHaveBeenCalled();
    });

    it('should disconnect mongo db', async () => {
        await disconnectDb();

        expect(consoleSpy).toHaveBeenCalledWith('Successfully disconnected db');
    });
});
