document.addEventListener('DOMContentLoaded', function() {
    const deviceForm = document.getElementById('deviceForm');
    const searchForm = document.getElementById('searchForm');
    const deviceTableBody = document.getElementById('deviceTableBody');
    const searchResults = document.getElementById('searchResults');

    // Función para cargar dispositivos guardados
    function loadDevices() {
        const devices = JSON.parse(localStorage.getItem('devices')) || [];
        deviceTableBody.innerHTML = ''; // Limpiar tabla
        devices.forEach(device => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const codeCell = document.createElement('td');
            nameCell.textContent = device.name;
            codeCell.textContent = device.code;
            row.appendChild(nameCell);
            row.appendChild(codeCell);
            deviceTableBody.appendChild(row);
        });
    }

    // Función para guardar dispositivos en el Local Storage
    function saveDevice(name, code) {
        const devices = JSON.parse(localStorage.getItem('devices')) || [];
        devices.push({ name, code });
        localStorage.setItem('devices', JSON.stringify(devices));
        loadDevices();
    }

    // Evento al enviar el formulario para agregar dispositivos
    deviceForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('deviceName').value;
        const code = document.getElementById('deviceCode').value;
        saveDevice(name, code);
        deviceForm.reset(); // Limpiar formulario
    });

    // Evento al enviar el formulario de búsqueda
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchName = document.getElementById('searchName').value.toLowerCase();
        const devices = JSON.parse(localStorage.getItem('devices')) || [];
        const matchingDevices = devices.filter(device => 
            device.name.toLowerCase().includes(searchName)
        );
        
        searchResults.innerHTML = ''; // Limpiar resultados anteriores

        if (matchingDevices.length > 0) {
            matchingDevices.forEach(device => {
                const listItem = document.createElement('li');
                listItem.textContent = `Nombre: ${device.name}, [ ${device.code} ]`;
                searchResults.appendChild(listItem);
            });
        } else {
            const noResultItem = document.createElement('li');
            noResultItem.textContent = 'No se encontraron dispositivos';
            searchResults.appendChild(noResultItem);
        }

        searchForm.reset(); // Limpiar formulario
    });

    // Cargar dispositivos al cargar la página
    loadDevices();
});
