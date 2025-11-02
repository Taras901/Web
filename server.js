const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Додаємо 'path'

const app = express();
const PORT = 5000;

// --- НОВИЙ КОД: Шлях до нашого файлу JSON ---
const DB_PATH = path.join(__dirname, 'Helicopters.json');

// --- НОВА ФУНКЦІЯ: Читаємо дані з файлу ---
function readData() {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Не вдалося прочитати Helicopters.json:", err);
        return []; // Повертаємо порожній масив у разі помилки
    }
}

// --- НОВА ФУНКЦІЯ: Записуємо дані у файл ---
function writeData(data) {
    try {
        // 'null, 2' робить JSON-файл гарно відформатованим
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Не вдалося записати в Helicopters.json:", err);
    }
}

// 1. Налаштування сервера
app.use(cors());
app.use(express.json());

// 2. Створюємо маршрути (ендпоінти) для CRUD

// READ (GET /helicopters)
app.get('/helicopters', (req, res) => {
    const helicopters = readData(); // Завжди читаємо свіжі дані
    res.json(helicopters);
});

// CREATE (POST /helicopters)
app.post('/helicopters', (req, res) => {
    const helicopters = readData();
    const data = req.body;

    if (!data.name || !data.name.trim()) {
        return res.status(400).json({ message: 'Назва є обов\'язковою' });
    }

    const nextId = helicopters.length > 0 ? Math.max(...helicopters.map(h => h.id)) + 1 : 1;

    const newHelicopter = {
        id: nextId,
        name: data.name.trim(),
        passengers: parseInt(data.passengers) || 0,
        speed: parseInt(data.speed) || 0,
        imageUrl: data.imageUrl ? data.imageUrl.trim() : ""
    };

    helicopters.push(newHelicopter);
    writeData(helicopters); // <-- ЗБЕРІГАЄМО ЗМІНИ У ФАЙЛ
    
    res.status(201).json(newHelicopter);
});

// UPDATE (PUT /helicopters/:id)
app.put('/helicopters/:id', (req, res) => {
    const helicopters = readData();
    const id = parseInt(req.params.id);
    const data = req.body;
    const index = helicopters.findIndex(h => h.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Вертоліт не знайдено' });
    }

    helicopters[index] = {
        ...helicopters[index],
        name: data.name ? data.name.trim() : helicopters[index].name,
        passengers: parseInt(data.passengers) || helicopters[index].passengers,
        speed: parseInt(data.speed) || helicopters[index].speed,
        imageUrl: data.imageUrl ? data.imageUrl.trim() : helicopters[index].imageUrl
    };
    
    writeData(helicopters); // <-- ЗБЕРІГАЄМО ЗМІНИ У ФАЙЛ

    res.json(helicopters[index]);
});

// DELETE (DELETE /helicopters/:id)
app.delete('/helicopters/:id', (req, res) => {
    let helicopters = readData();
    const id = parseInt(req.params.id);
    const initialLength = helicopters.length;
    helicopters = helicopters.filter(h => h.id !== id);

    if (helicopters.length === initialLength) {
        return res.status(404).json({ message: 'Вертоліт не знайдено' });
    }

    writeData(helicopters); // <-- ЗБЕРІГАЄМО ЗМІНИ У ФАЙЛ

    res.status(204).send(); 
});


// 3. Запускаємо сервер
app.listen(PORT, () => {
    console.log(`✅ Сервер (зі збереженням) успішно запущено на порту http://127.0.0.1:${PORT}`);
});
// ... твій код app.listen(...) ...

// Додамо це, щоб процес примусово залишався активним
setInterval(() => {
    // Ця функція нічого не робить, але не дає програмі завершитись
}, 1000 * 60 * 60); 

console.log("Сервер слухає... Процес активний.");