import { jest } from '@jest/globals';

const mockFindByEmail = jest.fn();
const mockCreate = jest.fn();
const mockHash = jest.fn();
const mockCompare = jest.fn();

jest.unstable_mockModule('../src/repositories/users.js', () => ({
    findByEmail: mockFindByEmail,
    create: mockCreate,
}));


jest.unstable_mockModule('bcrypt', () => ({
    default: {
        hash: mockHash,
        compare: mockCompare,
    },
    hash: mockHash,
    compare: mockCompare,
}));

const { register, validateUser } = await import('../src/resources/auth/service.js');
const { AppError } = await import('../src/common/appError.js');

describe('Auth Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {

        it('должен создать пользователя если email свободен', async () => {
            mockFindByEmail.mockResolvedValue(null);
            mockHash.mockResolvedValue('hashed_password');
            mockCreate.mockResolvedValue({ id: '123', email: 'test@test.com' });

            const result = await register({ email: 'test@test.com', password: 'Password1!' });

            expect(result.email).toBe('test@test.com');
            expect(mockCreate).toHaveBeenCalledTimes(1);
        });

        it('должен выбросить ошибку 409 если email уже занят', async () => {
            mockFindByEmail.mockResolvedValue({ id: '123', email: 'test@test.com' });

            await expect(
                register({ email: 'test@test.com', password: 'Password1!' })
            ).rejects.toThrow(AppError);
        });

    });

    describe('validateUser', () => {

        it('должен вернуть пользователя если пароль верный', async () => {
            mockFindByEmail.mockResolvedValue({ id: '123', email: 'test@test.com', password_hash: 'hashed' });
            mockCompare.mockResolvedValue(true);

            const result = await validateUser('test@test.com', 'Password1!');

            expect(result.email).toBe('test@test.com');
        });

        it('должен выбросить 404 если пользователь не найден', async () => {
            mockFindByEmail.mockResolvedValue(null);

            await expect(
                validateUser('notexist@test.com', 'Password1!')
            ).rejects.toThrow(AppError);
        });

        it('должен выбросить 401 если пароль неверный', async () => {
            mockFindByEmail.mockResolvedValue({ id: '123', email: 'test@test.com', password_hash: 'hashed' });
            mockCompare.mockResolvedValue(false);

            await expect(
                validateUser('test@test.com', 'wrongpassword')
            ).rejects.toThrow(AppError);
        });

    });
});