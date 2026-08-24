const terminalWindow = document.querySelector("#terminal");


function scrollTerminalToBottom() {
    const isOverflowing = terminalContent.scrollHeight > terminalContent.clientHeight;
    terminalContent.style.justifyContent = isOverflowing ? "flex-end" : "flex-start";
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

new ResizeObserver(scrollTerminalToBottom).observe(terminalWindow);

function terminalOpenClose() {
    if (terminalWindow.style.display === "flex") {
        terminalContent.innerHTML = `
                <p>MeowOS Terminal [Version 1.0.0]</p>
                <p>Initializing shell environment...</p>
        `;
        scrollTerminalToBottom();
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
    scrollTerminalToBottom();
}
function runCommand(command) {
    let output = "";
    if (command === "help") {
        output = `
            <p>Available commands: </p>
            <p>"welcome": opens intro window</p>
            <p>"notes": opens notes</p>
            <p>"stopwatch": opens stopwatch</p>
            <p>"todo": opens to-do list</p>
            <p>"calculator": opens calculator</p>
            <p>"music": opens music player</p>
            <p>"gallery": opens gallery</p>
            <p>"browser": opens browser</p>
            <p>"files": opens files</p>
            <p>"settings": opens settings</p>
            <p>"search": opens search</p>
            <p>"control": opens control center</p>
            <p>"theme": list of available themes</p>
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
    } else if(command === "browser") {
        openWindow(browser);
        output = `<p>  Browser opened!</p>`
    } else if(command === "files") {
        openWindow(files);
        output = `<p>  Files opened!</p>`
    } else if(command === "search") {
        openWindow(searchMenu);
        output = `<p>  Search opened!</p>`
    } else if(command === "settings") {
        openWindow(settings);
        output = `<p>  Settings opened!</p>`
    } else if(command === "control") {
        openWindow(controlWidget);
        output = `<p>  Control Center opened!</p>`
    } else if(command.replace(/\s+/g, ' ').trim() === "theme") {
        output = `<p>  Available themes: </p>
                    <p>  "default"</p>
                    <p>  "dark"</p>
                    <p>  "day"</p>
                    <p>  "purple"</p>
                    <p>  "sunset"</p>
                    <p>  To select a theme, type theme [theme_name]</p>`
    } else if(command === "theme default") {
        switchTheme("default");
        output = `<p>  Theme changed to default.</p>`
    } else if(command === "theme dark") {
        switchTheme("dark");
        output = `<p>  Theme changed to dark.</p>`
    } else if(command === "theme day") {
        switchTheme("day");
        output = `<p>  Theme changed to day.</p>`
    } else if(command === "theme purple") {
        switchTheme("purple");
        output = `<p>  Theme changed to purple.</p>`
    } else if(command === "theme sunset") {
        switchTheme("sunset");
        output = `<p>  Theme changed to sunset.</p>`
    } else if(command.includes("theme ") && command !== "theme ") {
        output = `<p>  Theme not found. </p>`
    } else {
        output = `<p>  Command not found. <br>For a list of available commands type "help"</p>`
    }

    document.querySelector("#terminalInputLine").remove();

    terminalContent.innerHTML +=`
        <p><span class="terminal_prompt">Enter command here >> </span> ${command}</p>
    ` + output;

    addInputLine();
    scrollTerminalToBottom();
}