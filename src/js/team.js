import Character from './character.js';
import ErrorRepository from './errorRepository.js';

export default class Team {
    constructor() {
        this.members = new Set();
        this.errorRepo = new ErrorRepository();
    }

    // Добавляет персонажа в команду
    add(character) {
        // Проверка типа
        if (!(character instanceof Character)) {
            throw new Error(this.errorRepo.translate(1006));
            // 'Can only add Character class objects'
        }

        // Проверка на дубликат
        if (this.members.has(character)) {
            throw new Error(this.errorRepo.translate(1005));
            // 'The character is already on the team'
        }

        this.members.add(character);
    }

    // Добавляет несколько персонажей в команду
    addAll(...characters) {
        // Валидируем всех перед добавлением
        const invalidCharacters = characters.filter(char => !(char instanceof Character));
        if (invalidCharacters.length > 0) {
            throw new Error(this.errorRepo.translate(1006));
            // 'Can only add Character class objects'
        }

        // Добавляем только уникальных
        characters.forEach(character => {
            if (!this.members.has(character)) {
                this.members.add(character);
            }
        });
    }

    // Удаляет персонажа из команды
    remove(character) {
        if (!this.members.has(character)) {
            throw new Error(this.errorRepo.translate(1007));
            // 'Character not found in team'
        }
        this.members.delete(character);
    }

    // Получает персонажа по имени
    getCharacterByName(name) {
        const character = this.toArray().find(char => char.name === name);
        if (!character) {
            throw new Error(this.errorRepo.translate(1007));
            // 'Character not found in team'
        }
        return character;
    }

    // Конвертирует Set в массив
    toArray() {
        return Array.from(this.members);
    }

    // Очищает команду
    clear() {
        this.members.clear();
    }

    // Возвращает количество персонажей в команде
    size() {
        return this.members.size;
    }

    // Проверяет, есть ли персонаж в команде
    has(character) {
        return this.members.has(character);
    }

    // Проверяет, пуста ли команда
    isEmpty() {
        return this.members.size === 0;
    }

    // Получает сообщение об ошибке по коду
    getErrorMessage(code) {
        return this.errorRepo.translate(code);
    }
}