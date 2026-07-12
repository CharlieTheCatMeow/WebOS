const controlWidgetButton = document.querySelector("#controlWidgetButton");

const controlWidgetWiFiButton = document.querySelector("#wifiButton");
const controlWidgetBluetoothButton = document.querySelector("#bluetoothButton");
const controlWidgetAirplaneModeButton = document.querySelector("#airplaneModeButton");
const controlWidgetSettingsButton = document.querySelector("#controlWidgetSettings");

const wifiStatus = document.querySelector("#wifiStatus");

function toggleControlWidgetButton(button) {
    const buttonIcon = button.children[0]

    if (!button.classList.contains("control_widget_control_button_pressed")) {
        button.classList.add("control_widget_control_button_pressed");
        buttonIcon.classList.add("control_widget_control_button_icon_pressed");
    } else {
        button.classList.remove("control_widget_control_button_pressed");
        buttonIcon.classList.remove("control_widget_control_button_icon_pressed");
    }

    button.classList.add("control_widget_control_button_pressed_animation");
    setTimeout(function () {
        button.classList.remove("control_widget_control_button_pressed_animation");
    }, 150);
}

controlWidgetButton.addEventListener('click', function () {
    if (controlWidget.style.display === "none") {
        openWindow(controlWidget);
    } else {
        closeWindow(controlWidget);
    }
});

controlWidgetWiFiButton.addEventListener('click', function () {
    toggleControlWidgetButton(controlWidgetWiFiButton);
    if (!controlWidgetWiFiButton.classList.contains("control_widget_control_button_pressed")) {
        wifiStatus.textContent = "WiFi disconnected";
    } else {
        wifiStatus.textContent = "WiFi connected";
    }
});

controlWidgetBluetoothButton.addEventListener('click', function () {
    toggleControlWidgetButton(controlWidgetBluetoothButton);
});

controlWidgetAirplaneModeButton.addEventListener('click', function () {
    toggleControlWidgetButton(controlWidgetAirplaneModeButton);
    if (controlWidgetAirplaneModeButton.classList.contains("control_widget_control_button_pressed")) {
        controlWidgetWiFiButton.classList.remove("control_widget_control_button_pressed");
        controlWidgetWiFiButton.children[0].classList.remove("control_widget_control_button_icon_pressed");
        wifiStatus.textContent = "WiFi disconnected";
        controlWidgetBluetoothButton.classList.remove("control_widget_control_button_pressed");
        controlWidgetBluetoothButton.children[0].classList.remove("control_widget_control_button_icon_pressed");
    }
});

controlWidgetSettingsButton.addEventListener('click', function () {
    openWindow(settings);
    controlWidgetSettingsButton.classList.add("control_widget_control_button_pressed_animation");
    setTimeout(function () {
        controlWidgetSettingsButton.classList.remove("control_widget_control_button_pressed_animation");
    }, 150);
});

toggleControlWidgetButton(controlWidgetWiFiButton);