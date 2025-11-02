import { 
    getAllHelicopters,
    createHelicopter,
    updateHelicopter,
    deleteHelicopter 
} from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    
    let helicopters = [];

    const helicopterList = document.getElementById('helicopter-list');
    const form = document.getElementById('helicopterForm');
    const modalElement = document.getElementById('helicopterModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    const modalTitle = document.getElementById('modalTitle');
    const calculateBtn = document.getElementById('calculateTotalPassengers');
    const totalPassengersEl = document.getElementById('totalPassengers');
    const helicopterIdField = document.getElementById('helicopterId');
    const sortSwitch = document.getElementById('sortSwitch');

    async function loadHelicopters() {
        try {
            helicopters = await getAllHelicopters();
            sortHelicopters();
            renderHelicopters();
        } catch (error) {
            console.error("Не вдалося завантажити вертольоти:", error);
            helicopterList.innerHTML = `<div class="col"><p class="text-danger">Помилка завантаження даних. Перевірте, чи запущено сервер.</p></div>`;
        }
    }

    function renderHelicopters() {
        helicopterList.innerHTML = '';
        helicopters.forEach(h => {
            const card = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${h.imageUrl}" class="card-img-top" alt="${h.name}">
                        <div class="card-body">
                            <h5 class="card-title">${h.name}</h5>
                            <p class="card-text">
                                <strong>Кількість пасажирів:</strong> ${h.passengers}<br>
                                <strong>Макс. швидкість:</strong> ${h.speed} км/год
                            </p>
                        </div>
                        <div class="card-footer bg-transparent border-top-0">
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-outline-primary btn-sm me-2" onclick="editHelicopter(${h.id})">Редагувати</button>
                                <button class="btn btn-outline-danger btn-sm" onclick="deleteHelicopter(${h.id})">Видалити</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            helicopterList.insertAdjacentHTML('beforeend', card);
        });
    }

    window.editHelicopter = function(id) {
        const helicopterToEdit = helicopters.find(h => h.id === id);
        if (helicopterToEdit) {
            modalTitle.textContent = "Редагувати вертоліт";
            helicopterIdField.value = helicopterToEdit.id;
            document.getElementById('helicopterName').value = helicopterToEdit.name;
            document.getElementById('helicopterImage').value = helicopterToEdit.imageUrl;
            document.getElementById('helicopterPassengers').value = helicopterToEdit.passengers;
            document.getElementById('helicopterSpeed').value = helicopterToEdit.speed;
            modal.show();
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const helicopterData = {
            name: document.getElementById('helicopterName').value.trim(),
            imageUrl: document.getElementById('helicopterImage').value.trim(),
            passengers: parseInt(document.getElementById('helicopterPassengers').value),
            speed: parseInt(document.getElementById('helicopterSpeed').value)
        };
        
        const id = helicopterIdField.value;

        try {
            if (id) {
                await updateHelicopter(id, helicopterData);
            } else {
                await createHelicopter(helicopterData);
            }

            await loadHelicopters();
            modal.hide();
        } catch (error) {
            console.error("Помилка збереження:", error);
            alert("Не вдалося зберегти вертоліт.");
        }
    });

    window.deleteHelicopter = async function(id) {
        if (confirm('Ви впевнені, що хочете видалити цей вертоліт?')) {
            try {
                await deleteHelicopter(id);
                await loadHelicopters();
            } catch (error) {
                console.error("Помилка видалення:", error);
                alert("Не вдалося видалити вертоліт.");
            }
        }
    }

    modalElement.addEventListener('hidden.bs.modal', () => {
        modalTitle.textContent = "Дані про вертоліт";
        form.reset();
        helicopterIdField.value = '';
    });

    calculateBtn.addEventListener('click', () => {
        const total = helicopters.reduce((sum, h) => sum + h.passengers, 0);
        totalPassengersEl.textContent = total;
    });

    function sortHelicopters() {
        if (sortSwitch.checked) {
            helicopters.sort((a, b) => b.speed - a.speed);
        } else {
            helicopters.sort((a, b) => a.id - b.id);
        }
    }

    sortSwitch.addEventListener('change', () => {
        sortHelicopters();
        renderHelicopters();
    });

    loadHelicopters();
});