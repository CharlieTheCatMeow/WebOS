const terminalWindow = document.querySelector("#terminal");


function terminalOpenClose() {
    if (terminalWindow.style.display === "flex") {
        terminalContent.innerHTML = `
                <p>MeowOS Terminal [Version 1.0.0]</p>
                <p>Initializing shell environment...</p>
        `;
        setTimeout(function () {
            terminalContent.innerHTML = terminalContent.innerHTML + `
                <p>Shell ready.</p>
                <p>Type 'help' to list available commands.</p>
            `;

            addInputLine();
        }, 400);
    } else {
        terminalContent.innerHTML = `<div id="terminalText"></div>`
    }
}

function addInputLine() {
    terminalContent.innerHTML += `
        <div class="terminal_input_line" id="terminalInputLine">
            <span class="terminal_prompt">Enter command here >> </span>
            <label class="input_label">
                <input class="terminal_input" type="text" id="terminalInput" autofocus autocomplete="off" spellcheck="false">
            </label>
        </div>
    `
    const newInput = document.querySelector("#terminalInput");
    newInput.focus();
    newInput.addEventListener("keydown", function (event) {
       if (event.key === "Enter" && newInput.value) {
           runCommand(newInput.value);
       }
    });
}
function runCommand(command) {
    let output = "";
    if (command === "help") {
        output = `
            <p>  Available commands: </p>
            <p>    "welcome": opens intro window</p>
            <p>    "notes": opens notes</p>
            <p>    "stopwatch": opens stopwatch</p>
            <p>    "todo": opens to-do list</p>
            <p>    "calculator": opens calculator</p>
            <p>    "music": opens music player</p>
            <p>    "gallery": opens gallery</p>
            <p>    "dark": activates dark mode</p>
            <p>    "light": activates light mode</p>
        `;
    } else if(command === "welcome") {
        openWindow(welcomeScreen);
        output = `<p>  Intro opened!</p>`
    } else if(command === "notes") {
        openWindow(notes);
        output = `<p>  Notes opened!</p>`
    } else if(command === "stopwatch") {
        openWindow(stopwatch);
        output = `<p>  Stopwatch opened!</p>`
    } else if(command === "todo") {
        openWindow(todoList);
        output = `<p>  to-do List opened!</p>`
    } else if(command === "calculator") {
        openWindow(calculator);
        output = `<p>  Calculator opened!</p>`
    } else if(command === "music") {
        openWindow(musicPlayer);
        output = `<p>  Music Player opened!</p>`
    } else if(command === "gallery") {
        openWindow(gallery);
        output = `<p>  Gallery opened!</p>`
    } else if(command === "dark") {
        switchToDarkMode();
        output = `<p>  Dark mode activated!</p>`
    } else if(command === "light") {
        switchToLightMode();
        output = `<p>  Light mode activated!</p>`
    } else {
        output = `<p>  Command not found. <br>For a list of available commands type "help"</p>`
    }

    document.querySelector("#terminalInputLine").remove();

    terminalContent.innerHTML +=`
        <p><span class="terminal_prompt">Enter command here >> </span> ${command}</p>
    ` + output;

    addInputLine();
}