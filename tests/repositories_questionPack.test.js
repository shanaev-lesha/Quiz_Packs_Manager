import { jest } from '@jest/globals';

// ===== MOCK FUNCTIONS =====
const mockReturning = jest.fn();
const mockDel = jest.fn();
const mockFirst = jest.fn();
const mockUpdate = jest.fn();
const mockInsert = jest.fn();
const mockWhere = jest.fn();
const mockKnex = jest.fn();

// ===== SETUP CHAIN MOCKS =====
function setupChains() {
    mockInsert.mockReturnValue({ returning: mockReturning });
    mockUpdate.mockReturnValue({ returning: mockReturning });

    mockWhere.mockReturnValue({
        first: mockFirst,
        update: mockUpdate,
        del: mockDel,
    });

    mockKnex.mockReturnValue({
        insert: mockInsert,
        where: mockWhere,
    });
}

// ===== MOCK KNEX MODULE =====
jest.unstable_mockModule('../src/knex.js', () => ({
    default: mockKnex,
}));

const { create, findById, findAllByUserId, update, remove } =
    await import('../src/repositories/questionPack.js');

describe('questionPack repository', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        setupChains();
    });

    test('create: должен создать пакет и вернуть его', async () => {
        const fakeData = { title: 'Тест', user_id: 'user-1' };
        const fakePack = { id: 'pack-1', ...fakeData };

        mockReturning.mockResolvedValue([fakePack]);

        const result = await create(fakeData);

        expect(mockInsert).toHaveBeenCalledWith(fakeData);
        expect(result).toEqual(fakePack);
    });

    test('findById: должен найти пакет по id', async () => {
        const fakePack = { id: 'pack-1', title: 'Тест' };

        mockFirst.mockResolvedValue(fakePack);

        const result = await findById('pack-1');

        expect(mockWhere).toHaveBeenCalledWith({ id: 'pack-1' });
        expect(result).toEqual(fakePack);
    });

    test('findById: должен вернуть undefined если пакет не найден', async () => {
        mockFirst.mockResolvedValue(undefined);

        const result = await findById('не-существует');

        expect(result).toBeUndefined();
    });

    test('findAllByUserId: должен вернуть все пакеты пользователя', async () => {
        const fakePacks = [
            { id: 'pack-1', user_id: 'user-1' },
            { id: 'pack-2', user_id: 'user-1' },
        ];

        mockWhere.mockResolvedValue(fakePacks);

        const result = await findAllByUserId('user-1');

        expect(mockWhere).toHaveBeenCalledWith({ user_id: 'user-1' });
        expect(result).toEqual(fakePacks);
    });

    test('findAllByUserId: должен вернуть пустой массив если пакетов нет', async () => {
        mockWhere.mockResolvedValue([]);

        const result = await findAllByUserId('user-без-пакетов');

        expect(result).toEqual([]);
    });

    test('update: должен обновить пакет и вернуть обновлённый', async () => {
        const updatedPack = { id: 'pack-1', title: 'Новый заголовок' };

        mockReturning.mockResolvedValue([updatedPack]);

        const result = await update('pack-1', { title: 'Новый заголовок' });

        expect(mockWhere).toHaveBeenCalledWith({ id: 'pack-1' });
        expect(result).toEqual(updatedPack);
    });

    test('remove: должен удалить пакет', async () => {
        mockDel.mockResolvedValue(1);

        await remove('pack-1');

        expect(mockWhere).toHaveBeenCalledWith({ id: 'pack-1' });
        expect(mockDel).toHaveBeenCalledTimes(1);
    });

});