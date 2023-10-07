const floorsData = {
    floor1: {
        rooms: {
            room101: ['Bulb A', 'Bulb B', 'Bulb C'],
            room102: ['Bulb D', 'Bulb E'],
            room103: ['Bulb F']
        }
    },
    floor2: {
        rooms: {
            room201: ['Bulb X', 'Bulb Y'],
            room202: ['Bulb Z'],
            room203: []
        }
    }
};

const floorSelect = document.getElementById('floorSelect');
const roomSelect = document.getElementById('roomSelect');
const bulbSelect = document.getElementById('bulbSelect');
const turnOnBtn = document.getElementById('turnOnBtn');
const turnOffBtn = document.getElementById('turnOffBtn');

const addFloorBtn = document.getElementById('addFloorBtn');
const addRoomBtn = document.getElementById('addRoomBtn');
const addBulbBtn = document.getElementById('addBulbBtn');
const floorNameInput = document.getElementById('floorName');
const roomNameInput = document.getElementById('roomName');
const bulbNameInput = document.getElementById('bulbName');


populateSelect(floorSelect, Object.keys(floorsData));


floorSelect.addEventListener('change', () => {
    const selectedFloor = floorSelect.value;
    const rooms = Object.keys(floorsData[selectedFloor].rooms);


    const roomsSection = document.getElementById('rooms');
    const addRoomSection = document.getElementById('addRoom');
    roomsSection.classList.remove('hidden');
    addRoomSection.classList.remove('hidden');


    populateSelect(roomSelect, rooms);
});


roomSelect.addEventListener('change', () => {
    const selectedRoom = roomSelect.value;
    const selectedFloor = floorSelect.value.toLowerCase();


    if (selectedRoom) {
        const bulbsSection = document.getElementById('bulbs');
        const addBulbSection = document.getElementById('addBulb');
        bulbsSection.classList.remove('hidden');
        addBulbSection.classList.remove('hidden');


        const bulbs = floorsData[selectedFloor].rooms[selectedRoom] || [];
        populateSelect(bulbSelect, bulbs);
    } else {

        const bulbsSection = document.getElementById('bulbs');
        const addBulbSection = document.getElementById('addBulb');
        bulbsSection.classList.add('hidden');
        addBulbSection.classList.add('hidden');
    }
});


turnOnBtn.addEventListener('click', () => {
    const selectedBulb = bulbSelect.value;
    alert(`Turning on ${selectedBulb}`);
});

turnOffBtn.addEventListener('click', () => {
    const selectedBulb = bulbSelect.value;
    alert(`Turning off ${selectedBulb}`);
});


addFloorBtn.addEventListener('click', () => {
    const floorName = floorNameInput.value.trim();
    if (floorName) {

        const floorOption = document.createElement('option');
        floorOption.value = floorName.toLowerCase();
        floorOption.textContent = floorName;
        floorSelect.appendChild(floorOption);

        floorsData[floorName.toLowerCase()] = { rooms: {} };

        floorNameInput.value = '';

        const roomsSection = document.getElementById('rooms');
        const addRoomSection = document.getElementById('addRoom');
        const bulbsSection = document.getElementById('bulbs');
        const addBulbSection = document.getElementById('addBulb');
        roomsSection.classList.add('hidden');
        addRoomSection.classList.add('hidden');
        bulbsSection.classList.add('hidden');
        addBulbSection.classList.add('hidden');
    }
});


addRoomBtn.addEventListener('click', () => {
    const selectedFloor = floorSelect.value;
    const roomName = roomNameInput.value.trim();
    if (selectedFloor && roomName) {
        floorsData[selectedFloor].rooms[roomName.toLowerCase()] = [];
        roomNameInput.value = '';

        const rooms = Object.keys(floorsData[selectedFloor].rooms);
        populateSelect(roomSelect, rooms);
    }
});


addBulbBtn.addEventListener('click', () => {
    const selectedFloor = floorSelect.value;
    const selectedRoom = roomSelect.value;
    const bulbName = bulbNameInput.value.trim();
    if (selectedFloor && selectedRoom && bulbName) {

        floorsData[selectedFloor].rooms[selectedRoom].push(bulbName);
        bulbNameInput.value = '';
        const bulbs = floorsData[selectedFloor].rooms[selectedRoom];
        populateSelect(bulbSelect, bulbs);
    }
});

turnOnBtn.addEventListener('click', () => {
    const selectedFloor = floorSelect.value;
    const selectedRoom = roomSelect.value;
    const selectedBulb = bulbSelect.value;

    // Send a POST request to the server
    sendBulbStatus(selectedFloor, selectedRoom, selectedBulb, 'ON');
});

turnOffBtn.addEventListener('click', () => {
    const selectedFloor = floorSelect.value;
    const selectedRoom = roomSelect.value;
    const selectedBulb = bulbSelect.value;

    // Send a POST request to the server
    sendBulbStatus(selectedFloor, selectedRoom, selectedBulb, 'OFF');
});

function sendBulbStatus(floorName, roomName, bulbName, status) {
    fetch('/bulb-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            floorName,
            roomName,
            bulbName,
            status,
        }),
    })
        .then(response => {
            if (response.ok) {
                console.log(`Successfully sent status update for ${bulbName}`);
            } else {
                console.error('Failed to send status update');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function populateSelect(selectElement, options) {
    selectElement.innerHTML = '';
    for (let option of options) {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        optionElement.value = option;
        selectElement.appendChild(optionElement);
    }
}
