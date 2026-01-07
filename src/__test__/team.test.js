import Team from '../js/team';
import Bowman from '../js/bowman.js';
import Swordsman from '../js/swordsman.js';
import Magician from '../js/magician.js';
import ErrorRepository from '../js/errorRepository.js';

describe('Team class', () => {
    let team;
    let character1;
    let character2;
    let character3;
    let errorRepo;

    beforeEach(() => {
        team = new Team();
        character1 = new Bowman('Лучник');
        character2 = new Swordsman('Мечник');
        character3 = new Magician('Волшебник');
        errorRepo = new ErrorRepository();
    });

    afterEach(() => {
        team.clear && team.clear();
    });

    describe('Constructor', () => {
        test('should create empty team', () => {
            expect(team.members).toBeInstanceOf(Set);
            expect(team.size()).toBe(0);
            expect(team.toArray()).toEqual([]);
        });

        test('should have error repository instance', () => {
            expect(team.errorRepo).toBeInstanceOf(ErrorRepository);
        });
    });

    describe('add method', () => {
        test('should throw error with code 1005 when adding duplicate character', () => {
            team.add(character1);

            expect(() => team.add(character1)).toThrow(errorRepo.translate(1005));
            expect(() => team.add(character1)).toThrow('The character is already on the team');
            expect(team.size()).toBe(1);
        });

        test('should throw error with code 1006 when adding non-Character object', () => {
            const testCases = [
                { input: {}, description: 'empty object' },
                { input: null, description: 'null' },
                { input: undefined, description: 'undefined' },
                { input: 'string', description: 'string' },
                { input: 123, description: 'number' },
                { input: [], description: 'array' }
            ];

            testCases.forEach(({ input }) => {
                expect(() => team.add(input)).toThrow(errorRepo.translate(1006));
                expect(() => team.add(input)).toThrow('Can only add Character class objects');
            });
        });

        test('should allow adding different character instances with same properties', () => {
            const character1Copy = new Bowman('Legolas');

            team.add(character1);
            team.add(character1Copy);

            expect(team.size()).toBe(2);
            expect(team.has(character1)).toBe(true);
            expect(team.has(character1Copy)).toBe(true);
        });
    });

    describe('addAll method', () => {
        test('should work with array spread', () => {
            const characters = [character1, character2, character3];
            team.addAll(...characters);

            expect(team.size()).toBe(3);
        });

        test('should mix existing and new characters', () => {
            team.add(character1);
            team.addAll(character1, character2, character3);

            expect(team.size()).toBe(3);
        });

        test('should throw error with code 1006 for non-Character arguments', () => {
            expect(() => team.addAll(character1, {}, character2))
                .toThrow(errorRepo.translate(1006));
            expect(() => team.addAll(character1, {}, character2))
                .toThrow('Can only add Character class objects');
            expect(team.size()).toBe(0);
        });
    });

    describe('remove method', () => {
        test('should throw error with code 1007 when removing non-existent character', () => {
            expect(() => team.remove(character1)).toThrow(errorRepo.translate(1007));
            expect(() => team.remove(character1)).toThrow('Character not found in team');
        });

        test('should successfully remove existing character', () => {
            team.add(character1);
            expect(team.size()).toBe(1);

            team.remove(character1);
            expect(team.size()).toBe(0);
            expect(team.has(character1)).toBe(false);
        });
    });

    describe('getCharacterByName method', () => {
        test('should throw error with code 1007 when character not found', () => {
            expect(() => team.getCharacterByName('NonExistent')).toThrow(errorRepo.translate(1007));
            expect(() => team.getCharacterByName('NonExistent')).toThrow('Character not found in team');
        });

        test('should return character when found by name', () => {
            team.add(character1);
            team.add(character2);

            const found = team.getCharacterByName('Лучник');
            expect(found).toBe(character1);
            expect(found.name).toBe('Лучник');
            expect(found.type).toBe('Bowman');
        });
    });

    describe('ErrorRepository integration', () => {
        test('should use correct error codes for different scenarios', () => {
            // Тест кода 1005 - дубликат персонажа
            team.add(character1);
            expect(() => {
                team.add(character1);
            }).toThrow(errorRepo.translate(1005));

            expect(errorRepo.getCodeByMessage('The character is already on the team'))
                .toBe(1005);

            // Тест кода 1006 - неверный тип объекта
            expect(() => team.add({})).toThrow(errorRepo.translate(1006));

            // Тест кода 1007 - персонаж не найден
            expect(() => team.remove(character2)).toThrow(errorRepo.translate(1007));
        });

        test('should use getErrorMessage method correctly', () => {
            expect(team.getErrorMessage(1005))
                .toBe('The character is already on the team');
            expect(team.getErrorMessage(1006))
                .toBe('Can only add Character class objects');
            expect(team.getErrorMessage(1007))
                .toBe('Character not found in team');
            expect(team.getErrorMessage(9999))
                .toBe('Unknown error');
        });
    });

    describe('Utility methods', () => {
        test('toArray method should convert Set to array', () => {
            team.addAll(character1, character2);
            const array = team.toArray();

            expect(Array.isArray(array)).toBe(true);
            expect(array.length).toBe(2);
            expect(array[0]).toBe(character1);
            expect(array[1]).toBe(character2);
        });

        test('size method should return correct count', () => {
            expect(team.size()).toBe(0);
            team.add(character1);
            expect(team.size()).toBe(1);
            team.add(character2);
            expect(team.size()).toBe(2);
        });

        test('has method should check for character presence', () => {
            expect(team.has(character1)).toBe(false);
            team.add(character1);
            expect(team.has(character1)).toBe(true);
            expect(team.has(character2)).toBe(false);
        });

        test('clear method should remove all members', () => {
            team.addAll(character1, character2, character3);
            expect(team.size()).toBe(3);

            team.clear();
            expect(team.size()).toBe(0);
            expect(team.toArray()).toEqual([]);
        });

        test('isEmpty method should work correctly', () => {
            expect(team.isEmpty()).toBe(true);
            team.add(character1);
            expect(team.isEmpty()).toBe(false);
            team.clear();
            expect(team.isEmpty()).toBe(true);
        });
    });

    describe('Error code constants accessibility', () => {
        test('should be able to reference error codes from tests', () => {
            // Проверка существования кодов ошибок
            expect(errorRepo.translate(1005)).toBe('The character is already on the team');
            expect(errorRepo.translate(1006)).toBe('Can only add Character class objects');
            expect(errorRepo.translate(1007)).toBe('Character not found in team');

            // Проверка неизвестного кода
            expect(errorRepo.translate(9999)).toBe('Unknown error');
        });

        test('should handle edge cases in error codes', () => {
            expect(() => errorRepo.translate('not-a-number')).toThrow(TypeError);
            expect(() => errorRepo.translate(null)).toThrow(TypeError);
            expect(() => errorRepo.translate(undefined)).toThrow(TypeError);
        });
    });
});