# Smart Flood Detection System

---
Live demo : https://otterqun.github.io/IotSmartFloodDetection/
---

## 📌 Project Overview
The Smart Flood Detection System is an Internet of Things (IoT) solution designed to monitor real-time water levels and send early warnings to zones at risk of flooding. Built to assist communities in flood-prone areas, this system offers better awareness and faster responses to minimize flood damage.

The system reads environmental data via an Arduino Uno and an ultrasonic sensor, processing it through a Flask-based Python server to trigger on-site hardware alerts and send remote email notifications.

## ✨ Key Features
* **Real-Time Monitoring:** Continuous tracking of water levels using the HC-SR04 ultrasonic sensor.
* **Risk Classification:** Automatically categorizes water levels into three statuses: Normal, Warning, and Dangerous.
* **On-Site Alerts:** Provides immediate visual and audio warnings using LED indicators and a buzzer.
* **Web Dashboard:** A simple, real-time web interface built with HTML, CSS, and JavaScript (served via Flask) to display current readings and history.
* **Email Notifications:** Automated email alerts dispatched via the Mailgun API when water reaches Warning or Dangerous levels.
* **Historical Data Logging:** Stores past readings using an SQLite database for record-keeping.
* **Predictive Analysis:** Includes a machine learning forecast feature to predict the next water level based on historical trends.

## 🛠️ Hardware Requirements
To build the physical prototype, the following components are required:
1.  **Arduino Uno:** The main microcontroller to process sensor data and control outputs.
2.  **HC-SR04 Ultrasonic Sensor:** Measures the distance to the water surface to estimate the water level.
3.  **LEDs (Green, Orange, Red):** Visual indicators for flood risk levels.
4.  **Buzzer:** Provides audio feedback (beeps) for alerts.
5.  **LCD Display (16x2 with I2C):** Displays the real-time water level percentage and alert status.
6.  **Breadboard & Jumper Wires:** For connecting components.
7.  **Power Supply (9V Battery):** To power the system.

## 💻 Software & Technologies
* **Arduino IDE (v2.3.6):** Used to write (in C/C++) and upload code to the Arduino Uno.
* **Python:** The core backend language used for reading serial data from Arduino and handling logic.
* **Flask Framework:** A lightweight web framework to serve the web dashboard and RESTful API endpoints.
* **SQLite:** Database used for historical data storage.
* **Mailgun API:** Third-party service used to send automated email alerts.
* **Visual Studio Code:** Primary code editor for Python scripts.

## ⚙️ System Logic & Thresholds
The system triggers different responses based on the water level percentage:

| Water Level | Status | On-Site Output | Notification |
| :--- | :--- | :--- | :--- |
| **< 55%** | Normal | Green LED ON, LCD shows "Green Alert!", No Buzzer | None |
| **55% - 79%** | Warning | Orange LED ON, 1 Buzzer Beep, LCD shows "Orange Alert!" | Email sent to user |
| **>= 80%** | Dangerous | Red LED ON, 2 Buzzer Beeps, LCD shows "Red Alert!" | Email sent to user |

## 🚀 Setup & Installation

### 1. Hardware Setup
* Assemble the hardware components on the breadboard following standard wiring for HC-SR04, LEDs, Buzzer, and I2C LCD.
* Connect the Arduino Uno to your computer via USB.

### 2. Arduino Configuration
* Open the Arduino IDE.
* Upload the provided `Arduino Code` to the Arduino Uno.
* **Crucial Step:** Close the Serial Monitor in the Arduino IDE before running the Python server, otherwise, Python will not be able to read the COM port.

### 3. Server Configuration (Python/Flask)
* Ensure Python is installed on your machine.
* Install required Python packages: `flask`, `flask_cors`, `pyserial`, `pandas`, `joblib`.
* Update the `COM` port in `App.py` to match your Arduino's port (e.g., `'COM4'`).
* Run the server:
    ```bash
    python App.py
    ```
* The Flask server will automatically create the `sensor_data.db` SQLite database upon initialization.

### 4. Viewing the Dashboard
* Open your web browser and navigate to the local server address (usually `http://127.0.0.1:5000` or open `index.html` directly if running locally) to view the real-time Dashboard.

## ⚠️ Limitations
* The current system relies on emails for alerts; it lacks SMS or mobile push notifications.
* The Python script runs locally, meaning alerts will fail if the host computer loses internet connection or power.