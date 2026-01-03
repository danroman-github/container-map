import Swordsman from '../js/swordsman';

describe('Swordsman class', () => {
    test('creates an Swordsman with the correct stats', () => {
        const swordsman = new Swordsman('Мечник');
    
        expect(swordsman.name).toBe('Мечник');
        expect(swordsman.type).toBe('Swordsman');
        expect(swordsman.attack).toBe(40);
        expect(swordsman.defence).toBe(10);
    });
});
