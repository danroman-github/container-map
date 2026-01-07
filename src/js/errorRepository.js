export default class ErrorRepository {
    constructor() {
        this.errors = new Map([
            [1001, 'Invalid input'],
            [1002, 'Server unavailable'],
            [1003, 'Database connection failed'],
            [1004, 'Incorrect object type'],
            [1005, 'The character is already on the team'],
            [1006, 'Can only add Character class objects'],
            [1007, 'Character not found in team'],
            [1008, 'Team is full'],
            [1009, 'Invalid character level'],
            [1010, 'Character name is too short'],
            [1011, 'Character name is too long'],
            [1012, 'Character type not supported'],
            [1013, 'Team name is required'],
            [1014, 'Team capacity exceeded']
        ]);
    }

    translate(code) {
        if (!Number.isInteger(code)) {
            throw new TypeError('Argument must be an integer');
        }
        return this.errors.get(code) || 'Unknown error';
    }

    // Вспомогательный метод для получения кода по сообщению (для тестов)
    getCodeByMessage(message) {
        for (const [code, msg] of this.errors.entries()) {
            if (msg === message) {
                return code;
            }
        }
        return null;
    }
}