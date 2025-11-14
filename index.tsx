
import { ICONS } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- ICON INJECTION ---
    const devicePlaceholders: { [key: string]: string } = {
        'device-socket': ICONS.SOCKET,
        'device-sensor': ICONS.SENSOR,
        'device-camera': ICONS.CAMERA,
        'device-thermostat': ICONS.THERMOSTAT,
        'device-speaker': ICONS.SPEAKER,
        'device-light': ICONS.LIGHTBULB,
        'device-lock': ICONS.LOCK,
        'device-vacuum': ICONS.VACUUM,
        'device-blinds': ICONS.BLINDS,
        'device-purifier': ICONS.PURIFIER,
        'device-doorbell': ICONS.DOORBELL,
        'device-coffeemaker': ICONS.COFFEEMAKER,
        'device-leak': ICONS.LEAK
    };

    Object.keys(devicePlaceholders).forEach(id => {
        const device = document.getElementById(id);
        if (device) {
            const placeholder = device.querySelector('.device-placeholder');
            if (placeholder) {
                placeholder.innerHTML = devicePlaceholders[id];
            }
        }
    });

    // --- ASSETS ---
    const soundSuccess = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUIAAABvT1/w2/lU/a4DkP+PA0H/pP6fAPIAEwD5/voAVgAbAPn++QA7ABQA9v4dAEUAJgDw/tgASwCUAOH/IgChAHsAxv+IAI0A/gDF/84AgwCVAL//iACzAJEAnwBEAKgA/ACK/78A7wCX/4gAYgDmAM3/kwB+AFIAz//OAH4AjwCP/7sAvQDg/3oAwwDWAGYAngDhAFQA0ACaAIgArwCVAIYAwwCdALQAtQCLAN4ARgB2ACgAawBIAKYAagA0ANQAgwBwAF0AbQCIAIoAXQDOAC8AVwClACEAUwA/AI8AawAaAFsASgA/ADsAYgA3ADMAUgA/AEgAZgBSADsARgBDAEYATwA=');
    const soundError = new Audio('data:audio/wav;base64,UklGRigBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAAD/////AAAAAAAAAAD/AAAA//8AAAAA////AAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAD/AAAA////AAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AAAA////AAAAAAAAAAD/AA==');

    // --- GAME STATE & CONFIG ---
    interface Target {
        deviceId: string;
        room: string;
    }

    interface Level {
        task: string;
        targets: Target[];
        placed: string[];
    }

    interface GameState {
        currentLevel: number;
        levels: {
            [key: number]: Level;
        };
    }

    const gameState: GameState = {
        currentLevel: 1,
        levels: {
            1: {
                task: "ЗАДАЧА 1: Давайте позаботимся о безопасности. Нужно бдительное око для главной комнаты и надежный страж для входа.",
                targets: [
                    { deviceId: 'device-camera', room: 'Гостиная' },
                    { deviceId: 'device-lock', room: 'Гостиная' }
                ],
                placed: []
            },
            2: {
                task: "ЗАДАЧА 2: Пора сделать спальню оазисом комфорта. Добавьте источник мягкого света и устройство для поддержания идеальной температуры для сна.",
                targets: [
                    { deviceId: 'device-light', room: 'Спальня' },
                    { deviceId: 'device-thermostat', room: 'Спальня' }
                ],
                placed: []
            },
            3: {
                task: "ЗАДАЧА 3: Кухонная техника ждет своей очереди. Дайте ей возможность управляться дистанционно, подключив к источнику умной энергии.",
                targets: [
                    { deviceId: 'device-socket', room: 'Кухня' }
                ],
                placed: []
            },
            4: {
                task: "ЗАДАЧА 4: Гостиная должна быть чистой и веселой. Найдите автоматического помощника для полов, источник хорошего настроения для ушей и стража, что замечает каждое движение.",
                targets: [
                    { deviceId: 'device-vacuum', room: 'Гостиная' },
                    { deviceId: 'device-speaker', room: 'Гостиная' },
                    { deviceId: 'device-sensor', room: 'Гостиная' }
                ],
                placed: []
            },
            5: {
                task: "ЗАДАЧА 5: Сделаем утро приятным. Пусть комната наполнится светом по расписанию, а воздух всегда будет свежим.",
                targets: [
                    { deviceId: 'device-blinds', room: 'Спальня' },
                    { deviceId: 'device-purifier', room: 'Спальня' }
                ],
                placed: []
            },
            6: {
                task: "ЗАДАЧА 6: Готовимся к приему гостей и бодрому утру. Нужно знать, кто пришел, и чтобы бодрящий напиток был готов вовремя.",
                targets: [
                    { deviceId: 'device-doorbell', room: 'Гостиная' },
                    { deviceId: 'device-coffeemaker', room: 'Кухня' }
                ],
                placed: []
            },
            7: {
                task: "ЗАДАЧА 7: Кухня - зона риска. Установим стража от водных неприятностей, а в гостиной создадим идеальную атмосферу для отдыха.",
                targets: [
                    { deviceId: 'device-leak', room: 'Кухня' },
                    { deviceId: 'device-speaker', room: 'Гостиная' },
                    { deviceId: 'device-thermostat', room: 'Гостиная' }
                ],
                placed: []
            }
        }
    };

    // --- DOM ELEMENTS ---
    const taskDisplay = document.getElementById('task-display') as HTMLElement;
    const devices = document.querySelectorAll('.device') as NodeListOf<HTMLElement>;
    const rooms = document.querySelectorAll('.room') as NodeListOf<HTMLElement>;
    const modalContainer = document.getElementById('modal-container') as HTMLElement;
    const modalTitle = document.getElementById('modal-title') as HTMLElement;
    const modalIconPlaceholder = document.getElementById('modal-icon-placeholder') as HTMLElement;
    const modalMessage = document.getElementById('modal-message') as HTMLElement;
    const modalOkButton = document.getElementById('modal-ok-button') as HTMLElement;

    // --- FUNCTIONS ---
    function updateTaskDisplay() {
        if (gameState.currentLevel > Object.keys(gameState.levels).length) {
            taskDisplay.textContent = "Система полностью настроена!";
        } else {
            taskDisplay.textContent = gameState.levels[gameState.currentLevel].task;
        }
    }

    function showModal(type: 'success' | 'error' | 'final', message: string) {
        if (type === 'success') {
            modalTitle.textContent = 'Information';
            modalIconPlaceholder.textContent = 'i';
            soundSuccess.play();
        } else if (type === 'error') {
            modalTitle.textContent = 'Error';
            modalIconPlaceholder.textContent = '×';
            soundError.play();
        } else if (type === 'final') {
            modalTitle.textContent = 'Поздравляем!';
            modalIconPlaceholder.textContent = '✓';
            soundSuccess.play();
        }
        modalMessage.textContent = message;
        modalContainer.style.display = 'flex';
    }

    function hideModal() {
        modalContainer.style.display = 'none';
    }

    function checkLevelCompletion() {
        const level = gameState.levels[gameState.currentLevel];
        if (!level) return; // All levels completed
        
        const allTargetsPlaced = level.targets.every(target => level.placed.includes(target.deviceId));
        
        if (allTargetsPlaced && level.placed.length === level.targets.length) {
            
            const isFinalLevel = gameState.currentLevel >= Object.keys(gameState.levels).length;

            if (isFinalLevel) {
                 setTimeout(() => showModal('final', 'Поздравляем! Вы создали идеальный Умный Дом 95!'), 200);
            } else {
                showModal('success', 'Отлично! Система настроена верно!');
            }

            gameState.currentLevel++;
            updateTaskDisplay();
        }
    }
    
    function handleDrop(e: DragEvent) {
        e.preventDefault();
        const dropZone = e.currentTarget as HTMLElement;
        const deviceId = e.dataTransfer?.getData('text/plain');
        if (!deviceId) return;

        const deviceElement = document.getElementById(deviceId);
        
        if (!deviceElement || !dropZone.classList.contains('room')) return;

        const roomName = dropZone.dataset.room;
        dropZone.classList.remove('drag-over');

        const level = gameState.levels[gameState.currentLevel];
        if (!level) return;

        const target = level.targets.find(t => t.deviceId === deviceId && t.room === roomName);
        const isAlreadyPlaced = level.placed.includes(deviceId);

        if (target && !isAlreadyPlaced) {
            // Correct placement
            const clonedDevice = deviceElement.cloneNode(true) as HTMLElement;
            clonedDevice.id = `placed-${deviceId}`;
            clonedDevice.draggable = false;
            clonedDevice.classList.remove('dragging');
            clonedDevice.style.cursor = 'default';
            // Remove text label from cloned device
            const textNode = Array.from(clonedDevice.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (textNode) {
                clonedDevice.removeChild(textNode);
            }
            dropZone.appendChild(clonedDevice);
            
            deviceElement.style.visibility = 'hidden'; // Hide original
            
            level.placed.push(deviceId);
            checkLevelCompletion();
        } else {
            // Incorrect placement
            showModal('error', 'Ошибка! Этот элемент здесь не нужен.');
        }
    }


    // --- EVENT LISTENERS ---
    devices.forEach(device => {
        device.addEventListener('dragstart', (e) => {
            const event = e as DragEvent;
            event.dataTransfer?.setData('text/plain', (event.target as HTMLElement).id);
            setTimeout(() => (event.target as HTMLElement).classList.add('dragging'), 0);
        });
        
        device.addEventListener('dragend', (e) => {
            (e.target as HTMLElement).classList.remove('dragging');
        });
    });

    rooms.forEach(room => {
        room.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            room.classList.add('drag-over');
        });

        room.addEventListener('dragleave', () => {
             room.classList.remove('drag-over');
        });
        
        room.addEventListener('drop', handleDrop);
    });
    
    modalOkButton.addEventListener('click', hideModal);


    // --- INITIALIZE GAME ---
    updateTaskDisplay();
});