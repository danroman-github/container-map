import Team from '../js/team.js';
import Bowman from '../js/bowman.js';
import Swordsman from '../js/swordsman.js';
import ErrorRepository from '../js/errorRepository.js';

console.log('=== Пример использования Team с ErrorRepository ===\n');

// Создаем экземпляр ErrorRepository для демонстрации
const errorRepo = new ErrorRepository();

// Создаем персонажей
const legolas = new Bowman('Legolas');
const aragorn = new Swordsman('Aragorn');
const boromir = new Swordsman('Boromir');
const gimli = new Bowman('Gimli');

// Создаем команду
const fellowship = new Team();

console.log('1. Добавление персонажей:');
try {
    fellowship.add(legolas);
    console.log('✓ Legolas добавлен');
    fellowship.add(aragorn);
    console.log('✓ Aragorn добавлен');

    // Попытка добавить дубликат (код ошибки 1005)
    console.log('Попытка добавить Legolas снова...');
    fellowship.add(legolas);
} catch (error) {
    console.log(`✗ Ошибка (код 1005): ${error.message}`);
    console.log(`  Сообщение из ErrorRepository: ${errorRepo.translate(1005)}`);
}

console.log(`\nРазмер команды: ${fellowship.size()}`);

console.log('\n2. Попытка добавить не-персонажа (код ошибки 1006):');
try {
    fellowship.add({ name: 'Not a character' });
} catch (error) {
    console.log(`✗ Ошибка (код 1006): ${error.message}`);
    console.log(`  Сообщение из ErrorRepository: ${errorRepo.translate(1006)}`);
}

console.log('\n3. Добавление нескольких персонажей:');
try {
    // Дубликаты игнорируются
    fellowship.addAll(boromir, legolas, aragorn);
    console.log('✓ Добавлен Boromir (дубликаты проигнорированы)');
} catch (error) {
    console.log(`✗ Ошибка: ${error.message}`);
}
console.log(`Размер команды: ${fellowship.size()}`);

console.log('\n4. Демонстрация работы с ошибками через ErrorRepository:');
console.log('Доступные коды ошибок:');
const errorCodes = [1005, 1006, 1007, 1008];
errorCodes.forEach(code => {
    console.log(`  Код ${code}: ${errorRepo.translate(code)}`);
});

console.log('\n5. Использование метода getCharacterByName:');
try {
    const foundCharacter = fellowship.getCharacterByName('Aragorn');
    console.log(`✓ Найден персонаж: ${foundCharacter.name} (${foundCharacter.type})`);

    // Попытка найти несуществующего персонажа (код ошибки 1007)
    console.log('Поиск несуществующего персонажа...');
    fellowship.getCharacterByName('Frodo');
} catch (error) {
    console.log(`✗ Ошибка (код 1007): ${error.message}`);
    console.log(`  Сообщение из ErrorRepository: ${errorRepo.translate(1007)}`);
}

console.log('\n6. Использование метода remove:');
console.log(`Размер команды до удаления: ${fellowship.size()}`);
try {
    fellowship.remove(aragorn);
    console.log('✓ Aragorn удален');
    console.log(`Размер команды после удаления: ${fellowship.size()}`);

    // Попытка удалить несуществующего персонажа
    console.log('Попытка удалить Aragorn снова...');
    fellowship.remove(aragorn);
} catch (error) {
    console.log(`✗ Ошибка (код 1007): ${error.message}`);
    console.log(`  Сообщение из ErrorRepository: ${errorRepo.translate(1007)}`);
}

console.log('\n7. Использование метода isEmpty и clear:');
console.log(`Команда пуста? ${fellowship.isEmpty()}`);

fellowship.clear();
console.log('✓ Команда очищена');
console.log(`Команда пуста? ${fellowship.isEmpty()}`);
console.log(`Размер команды: ${fellowship.size()}`);

console.log('\n8. Получение массива персонажей:');
// Добавляем персонажей заново
fellowship.add(legolas);
fellowship.add(gimli);
const teamArray = fellowship.toArray();
console.log(`Массив из ${teamArray.length} элементов:`);
teamArray.forEach((char, index) => {
    console.log(`  ${index + 1}. ${char.name} (${char.type})`);
});

console.log('\n9. Использование метода getErrorMessage:');
console.log('Сообщения об ошибках через метод Team:');
console.log(`  Код 1005: ${fellowship.getErrorMessage(1005)}`);
console.log(`  Код 1006: ${fellowship.getErrorMessage(1006)}`);
console.log(`  Код 1007: ${fellowship.getErrorMessage(1007)}`);
console.log(`  Код 9999 (неизвестный): ${fellowship.getErrorMessage(9999)}`);

console.log('\n10. Проверка метода has:');
console.log(`Legolas в команде? ${fellowship.has(legolas)}`);
console.log(`Aragorn в команде? ${fellowship.has(aragorn)}`);

console.log('\n=== Демонстрация завершена ===');

// Экспортируем для тестирования
export { fellowship, Team, errorRepo };