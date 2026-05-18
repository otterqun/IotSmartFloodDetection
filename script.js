// DOM Elements
const slider = document.getElementById('waterSlider');
const sliderValText = document.getElementById('slider-val');

// Dashboard Elements
const dashReading = document.getElementById('dash-reading');
const dashStatus = document.getElementById('dash-status');
const historyBody = document.getElementById('history-body');

// Hardware Elements
const lcdLine1 = document.getElementById('lcd-line1');
const lcdLine2 = document.getElementById('lcd-line2');
const ledGreen = document.getElementById('led-green');
const ledOrange = document.getElementById('led-orange');
const ledRed = document.getElementById('led-red');
const buzzer = document.getElementById('hw-buzzer');
const buzzerStatus = document.getElementById('buzzer-status');

// Fungsi utama untuk update UI
function updateSystem(value) {
    const val = parseInt(value);
    sliderValText.textContent = val;
    
    // Update Readings
    dashReading.textContent = val + "%";
    lcdLine1.textContent = "Water Level:" + val + "%";

    // Reset Hardware States
    ledGreen.classList.remove('on');
    ledOrange.classList.remove('on');
    ledRed.classList.remove('on');
    buzzer.classList.remove('ringing');

    let statusText = "";
    let lcdAlert = "";
    let color = "";
    let buzzText = "";
    let buzzColor = "";

    if (val < 55) {
        // Normal Level
        statusText = "Normal";
        lcdAlert = "Green Alert!";
        color = "#00b894";
        
        ledGreen.classList.add('on');
        buzzText = "OFF";
        buzzColor = "#00ff00";

    } else if (val >= 55 && val < 80) {
        // Warning Level
        statusText = "Dalam Perhatian";
        lcdAlert = "Orange Alert!";
        color = "#f39c12";
        
        ledOrange.classList.add('on');
        buzzer.classList.add('ringing'); // Animasi bergetar
        buzzText = "1 BEEP";
        buzzColor = "#ffa500";

    } else {
        // Dangerous Level
        statusText = "Amaran";
        lcdAlert = "Red Alert!";
        color = "#d63031";
        
        ledRed.classList.add('on');
        buzzer.classList.add('ringing'); // Animasi bergetar
        buzzText = "2 BEEPS";
        buzzColor = "#ff0000";
    }

    // Apply Styles to Dashboard
    dashStatus.textContent = "Status: " + statusText;
    dashStatus.style.color = color;
    dashReading.style.color = color;

    // Apply Styles to Hardware
    lcdLine2.textContent = lcdAlert;
    buzzerStatus.textContent = buzzText;
    buzzerStatus.style.color = buzzColor;
}

// Fungsi masuk data ke table bila slider dilepaskan
function addHistoryRecord(value) {
    const val = parseInt(value);
    let statusText = val < 55 ? "Normal" : (val < 80 ? "Dalam Perhatian" : "Amaran");

    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${timeString}</td>
        <td>${val}</td>
        <td>${statusText}</td>
    `;
    
    // Letak kat atas
    historyBody.prepend(newRow);
    
    // Limit kepada 5 row supaya tak panjang sangat
    if(historyBody.children.length > 5) {
        historyBody.removeChild(historyBody.lastChild);
    }
}

// Event Listeners
slider.addEventListener('input', (e) => {
    updateSystem(e.target.value);
});

slider.addEventListener('change', (e) => {
    addHistoryRecord(e.target.value);
});

// Initialize on load
updateSystem(0);
addHistoryRecord(0);