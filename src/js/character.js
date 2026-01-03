import ErrorRepository from './errorRepository.js';

class Character {
    constructor(name, type) {
        this.errorRepo = new ErrorRepository();

        // Проверка имени
        if (typeof name !== 'string') {
            throw new Error(this.errorRepo.translate(1006));
            // 'Can only add Character class objects'
        }

        if (name.length < 2) {
            throw new Error(this.errorRepo.translate(1010));
            // 'Character name is too short'
        }

        if (name.length > 10) {
            throw new Error(this.errorRepo.translate(1011));
            // 'Character name is too long'
        }

        const validTypes = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
        if (!validTypes.includes(type)) {
            throw new Error(this.errorRepo.translate(1012));
            // 'Character type not supported'
        };

        this.name = name;
        this.type = type;
        this.health = 100;
        this.level = 1;
        this.attack = undefined;
        this.defence = undefined;
    };
};

export default Character;
