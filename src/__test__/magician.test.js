import Magician from '../js/magician';

describe('Magician class', () => {
    test('creates an Magician with the correct stats', () => {
        const magician = new Magician('Волшебник');
    
        expect(magician.name).toBe('Волшебник');
        expect(magician.type).toBe('Magician');
        expect(magician.attack).toBe(10);
        expect(magician.defence).toBe(40);
    });
});
