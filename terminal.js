const terminalWindow = document.querySelector("#terminal")
const terminalContent = document.querySelector("#terminalContent");


function terminalOpenClose() {
    if (terminal.style.display === "flex") {
        terminalContent.innerHTML = `
                <p>Welcome to MeowOS!</p>
                <p>Loading terminal...></p>
        `;
        setTimeout(function () {
            terminalContent.innerHTML = terminalContent.innerHTML + `
                <p>Terminal loaded!</p>
                <p>For a list of commands, type 'help'</p>
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
        `;
    } else if (command === "welcome") {
        openWindow(welcomeScreen);
        output = `<p>  Intro opened!</p>`
    } else if (command === "notes") {
        openWindow(notes);
        output = `<p>  Notes opened!</p>`
    } else if (command === "stopwatch") {
        openWindow(stopwatch);
        output = `<p>  Stopwatch opened!</p>`
    } else if (command === "todo") {
        openWindow(todoList);
        output = `<p>  to-do List opened!</p>`
    } else if (command === "calculator" || command === "calc") {
        openWindow(calculator);
        output = `<p>  Calculator opened!</p>`
    } else if (command === "music" || command === "music player") {
        openWindow(musicPlayer);
        output = `<p>  Music Player opened!</p>`
    } else {
        output = `<p>  Command not found. Type 'help' for a list of commands.</p>`
    }

    document.querySelector("#terminalInputLine").remove();

    terminalContent.innerHTML +=`
        <p><span class="terminal_prompt">Enter command here >> </span> ${command}</p>
    ` + output;

    addInputLine();
}
