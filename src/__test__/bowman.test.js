import Bowman from '../js/bowman';

describe('Bowman class', () => {
    test('creates an Bowman with the correct stats', () => {
        const bowman = new Bowman('Лучник');
    
        expect(bowman.name).toBe('Лучник');
        expect(bowman.type).toBe('Bowman');
        expect(bowman.health).toBe(100);
        expect(bowman.level).toBe(1);
        expect(bowman.attack).toBe(25);
        expect(bowman.defence).toBe(25);
    });
});