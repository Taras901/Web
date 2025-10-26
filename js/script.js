document.addEventListener('DOMContentLoaded', () => {
    let helicopters = [
        { id: 1, name: "Bell 429", passengers: 7, speed: 287,imageUrl: "img/Bell 429.jpg"},
        { id: 2, name: "Agusta A109", passengers: 6, speed: 310,imageUrl:"img/Linfox_Agusta_A-109.jpg" },
        { id: 3, name: "Robinson R44", passengers: 3, speed: 240,imageUrl:"img/Robinson-R44.jpg"},
        { id: 4, name: "SpAF Aerospatiale AS-332B1", passengers: 24, speed: 315,imageUrl:"img/Aerospatiale_AS-332B1.jpg"}
    ];
    const helicopterList = document.getElementById('helicopter-list');
    const form = document.getElementById('helicopterForm');
    const modalElement = document.getElementById('helicopterModal');
    const modal = new bootstrap.Modal(modalElement);
    const modalTitle = document.getElementById('modalTitle');
    const calculateBtn = document.getElementById('calculateTotalPassengers');
    const totalPassengersEl = document.getElementById('totalPassengers');
    const helicopterIdField = document.getElementById('helicopterId');

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

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const helicopterData = {
            name: document.getElementById('helicopterName').value,
            imageUrl: document.getElementById('helicopterImage').value,
            passengers: parseInt(document.getElementById('helicopterPassengers').value),
            speed: parseInt(document.getElementById('helicopterSpeed').value)
        };
        const id = helicopterIdField.value;

        if (id) {
            const index = helicopters.findIndex(h => h.id == id);
            helicopters[index] = { ...helicopters[index], ...helicopterData };
        } else {
            helicopterData.id = Date.now();
            helicopters.push(helicopterData);
        }

        renderHelicopters();
        modal.hide();
    });

    window.deleteHelicopter = function(id) {
        if (confirm('Ви впевнені, що хочете видалити цей вертоліт?')) {
            helicopters = helicopters.filter(h => h.id !== id);
            renderHelicopters();
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
    sortSwitch.addEventListener('change', () => {
        if (sortSwitch.checked) {
            helicopters.sort((a, b) => b.speed - a.speed);
        } else {
            helicopters.sort((a, b) => a.id - b.id);
        }
        renderHelicopters();
    });

    renderHelicopters();
});
