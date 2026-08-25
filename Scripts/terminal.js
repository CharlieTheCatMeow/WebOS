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
            <p>  "apps": lists all available apps</p>
            <p>  "search": opens search</p>
            <p>  "control": opens control center</p>
            <p>  "theme": list of available themes</p>
        `;
    } else if (command.replace(/\s+/g, ' ').trim() === "apps") {
        output = `<p>  Available apps: </p>
                    <p>  "welcome"</p>
                    <p>  "notes"</p>
                    <p>  "stopwatch"</p>
                    <p>  "todo"</p>
                    <p>  "calculator"</p>
                    <p>  "music"</p>
                    <p>  "gallery"</p>
                    <p>  "browser"</p>
                    <p>  "files"</p>
                    <p>To open an app, type app [name].</p>`
    } else if(command === "app welcome") {
        openWindow(welcomeScreen);
        output = `<p>  Intro opened!</p>`
    } else if(command === "app notes") {
        openWindow(notes);
        output = `<p>  Notes opened!</p>`
    } else if(command === "app stopwatch") {
        openWindow(stopwatch);
        output = `<p>  Stopwatch opened!</p>`
    } else if(command === "app todo") {
        openWindow(todoList);
        output = `<p>  to-do List opened!</p>`
    } else if(command === "app calculator") {
        openWindow(calculator);
        output = `<p>  Calculator opened!</p>`
    } else if(command === "app music") {
        openWindow(musicPlayer);
        output = `<p>  Music Player opened!</p>`
    } else if(command === "app gallery") {
        openWindow(gallery);
        output = `<p>  Gallery opened!</p>`
    } else if(command === "app browser") {
        openWindow(browser);
        output = `<p>  Browser opened!</p>`
    } else if(command === "app files") {
        openWindow(files);
        output = `<p>  Files opened!</p>`
    } else if(command === "app search") {
        openWindow(searchMenu);
        output = `<p>  Search opened!</p>`
    } else if(command === "app settings") {
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
                    <p>  "pink"</p>
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
    } else if(command === "theme pink") {
        switchTheme("pink");
        output = `<p>  Theme changed to pink.</p>`
    } else if(command.includes("theme ") && command !== "theme ") {
        output = `<p>  Theme not found. </p>`
    } else if(command.includes("app ") && command !== "app ") {
        output = `<p>  Application not found. </p>`
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