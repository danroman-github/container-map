import Character from '../js/character';
import ErrorRepository from '../js/errorRepository.js';

describe('Character class', () => {
    let errorRepo;

    beforeEach(() => {
        errorRepo = new ErrorRepository();
    });

    test('should create character with valid name and type', () => {
        const character = new Character('ValidName', 'Bowman');

        expect(character.name).toBe('ValidName');
        expect(character.type).toBe('Bowman');
        expect(character.health).toBe(100);
        expect(character.level).toBe(1);
        expect(character.attack).toBeUndefined();
        expect(character.defence).toBeUndefined();
    });

    test('should throw error with code 1010 for short name', () => {
        expect(() => new Character('A', 'Bowman'))
            .toThrow(errorRepo.translate(1010));
        // 'Character name is too short'

        expect(() => new Character('', 'Bowman'))
            .toThrow(errorRepo.translate(1010));
    });

    test('should throw error with code 1011 for long name', () => {
        expect(() => new Character('VeryLongNameHere', 'Swordsman'))
            .toThrow(errorRepo.translate(1011));
        expect(() => new Character('VeryLongNameHere', 'Swordsman'))
            .toThrow('Character name is too long');
    });

    test('should throw error with code 1006 for non-string name', () => {
        expect(() => new Character(123, 'Bowman'))
            .toThrow(errorRepo.translate(1006));
    });

    test('should throw error with code 1012 for invalid type', () => {
        expect(() => new Character('Hero', 'InvalidType'))
            .toThrow(errorRepo.translate(1012));
    });
});
