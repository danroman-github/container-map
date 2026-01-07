import ErrorRepository from '../js/errorRepository';

describe('ErrorRepository', () => {
    let repository;

    beforeEach(() => {
        repository = new ErrorRepository();
    });

    describe('translate method', () => {
        it('should correctly translate known errors', () => {
            expect(repository.translate(1001)).toBe('Invalid input');
            expect(repository.translate(1002)).toBe('Server unavailable');
            expect(repository.translate(1003)).toBe('Database connection failed');
            expect(repository.translate(1005)).toBe('The character is already on the team');
            expect(repository.translate(1006)).toBe('Can only add Character class objects');
            expect(repository.translate(1007)).toBe('Character not found in team');

        });

        it('should return Unknown error for unknown codes', () => {
            expect(repository.translate(999)).toBe('Unknown error');
            expect(repository.translate(-1)).toBe('Unknown error');
        });

        it('should throw TypeError when given non-integer arguments', () => {
            expect(() => repository.translate('not-a-number')).toThrow(TypeError);
            expect(() => repository.translate('1001')).toThrow(TypeError);
            expect(() => repository.translate(null)).toThrow(TypeError);
            expect(() => repository.translate(undefined)).toThrow(TypeError);
        });

        it('should handle edge cases', () => {
            expect(repository.translate(Number.MAX_SAFE_INTEGER)).toBe('Unknown error');
            expect(repository.translate(Number.MIN_SAFE_INTEGER)).toBe('Unknown error');
        });
    });

    describe('getCodeByMessage method', () => {
        it('should return correct code for existing messages', () => {
            expect(repository.getCodeByMessage('Invalid input'))
                .toBe(1001);
            expect(repository.getCodeByMessage('Server unavailable'))
                .toBe(1002);
            expect(repository.getCodeByMessage('Database connection failed'))
                .toBe(1003);
            expect(repository.getCodeByMessage('Incorrect object type'))
                .toBe(1004);
            expect(repository.getCodeByMessage('The character is already on the team'))
                .toBe(1005);
            expect(repository.getCodeByMessage('Can only add Character class objects'))
                .toBe(1006);
            expect(repository.getCodeByMessage('Character not found in team'))
                .toBe(1007);
        });

        it('should return null for non-existent messages', () => {
            expect(repository.getCodeByMessage('Non-existent error')).toBe(null);
            expect(repository.getCodeByMessage('')).toBe(null);
            expect(repository.getCodeByMessage('Unknown error')).toBe(null);
            expect(repository.getCodeByMessage('invalid input')).toBe(null);
        });
    });
});
