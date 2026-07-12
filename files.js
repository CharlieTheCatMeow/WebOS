let filesWindowContent = document.querySelector("#filesContent");

let filesContentMain = document.querySelector("#filesContentMain");
let filesSidebarList = document.querySelector("#filesSidebarList");

let filesDirectoryDisplay = document.querySelector("#filesCurrentDirectory");
let returnToParentDirectoryButton = document.querySelector("#filesReturnToParentDirectoryButton");
let filesAddFolderButton = document.querySelector("#filesAddFolderButton");
let filesAddFileButton = document.querySelector("#filesAddFileButton");

const fileSystem = JSON.parse(localStorage.getItem("fileSystem")) || {
    id: "root",
    type: "folder",
    name: "Root",
    children: [
        { id: "desktop-id",   type: "folder", name: "Desktop",   children: [
            { id: "chicken-nuggets-id", type: "folder", name: "Chicken Nuggets", children: [] }
        ] },
        { id: "downloads-id", type: "folder", name: "Downloads", children: [
            { id: "burgers-id", type: "folder", name: "Burgers", children: [] }
        ] },
        { id: "documents-id", type: "folder", name: "Documents", children: [
            { id: "top-secret-files-id", type: "folder", name: "Top Secret", children: [
                { id: "classified-id", type: "folder", name: "CLASSIFIED", children: [] }
            ] },
            { id: "food-storage-id", type: "folder", name: "Food storage", children: [] },
            { id: "welcome-file-id", type: "file", name: "Welcome", children: [] }
        ] }
    ]
}

let filesCurrentDirectory = fileSystem;

function findNodeByID(node, id) {
    if (node.id === id) return node;
    if (node.type === "folder") {
        for (const child of node.children) {
            const found = findNodeByID(child, id);
            if (found) return found;
        }
    }
}

function findParent(node, id, parent = null) {
    if (node.id === id) return parent;
    if (node.type === "folder") {
        for (const child of node.children) {
            const foundParent = findParent(child, id, node);
            if (foundParent) return foundParent;
        }
    }
    return null;
}

function playPressAnimation(element) {
    element.classList.add("files_button_press_animation");
    setTimeout(function () {
        element.classList.remove("files_button_press_animation");
    }, 350);
}

function renderFileExplorerShell() {
    filesWindowContent.innerHTML = `<div class="files_top_bar">
                                        <div id="filesReturnToParentDirectoryButton" class="files_return_to_parent_directory_button no_select">
                                            <img class="files_header_icon" src="Images/arrow_up.svg" alt="Back">
                                        </div>
                                        <div id="filesCurrentDirectory" class="files_current_directory"></div>
                                        <div id="filesAddFolderButton" class="files_add_button no_select">
                                            <img class="files_header_icon" src="Images/add_folder.svg" alt="Add Folder">
                                        </div>
                                        <div id="filesAddFileButton" class="files_add_button no_select">
                                            <img class="files_header_icon" src="Images/add_file.svg" alt="Add File">
                                        </div>
                                    </div>
                                    <div class="files_main_content">
                                        <div class="files_content_sidebar">
                                            <div class="files_content_sidebar_title">Contents</div>
                                            <div id="filesSidebarList" class="files_content_sidebar_list"></div>
                                        </div>
                                        <div id="filesContentMain" class="files_content_main"></div>
                                    </div>`
    bindFileExplorerUI();
    renderSidebar();
}

function renderSidebar() {
    filesSidebarList.innerHTML = "";
    fileSystem.children.forEach(child => {
        if (child.type !== "folder") return;

        let sidebarItem = document.createElement("div");
        sidebarItem.classList.add("files_sidebar_content_directory");
        sidebarItem.dataset.id = child.id;

        let sidebarIcon = document.createElement("div");
        sidebarIcon.classList.add("files_sidebar_content_directory_icon");
        let sidebarIconSVG = document.createElement("img");
        sidebarIconSVG.src = "Images/folder.svg";
        sidebarIconSVG.alt = "Folder";
        sidebarIconSVG.classList.add("files_sidebar_content_directory_icon_svg");
        sidebarIcon.appendChild(sidebarIconSVG);

        let sidebarName = document.createElement("div");
        sidebarName.classList.add("files_sidebar_content_directory_name");
        sidebarName.innerText = child.name;

        sidebarItem.appendChild(sidebarIcon);
        sidebarItem.appendChild(sidebarName);

        sidebarItem.addEventListener("click", function () {
            playPressAnimation(sidebarItem);
            openFolder(child);
        });

        filesSidebarList.appendChild(sidebarItem);
    });
}

function createTextFile(parentID, name) {
    const parentNode = findNodeByID(fileSystem, parentID);
    if (!parentNode || parentNode.type !== "folder") return null;
    if (!name.endsWith(".txt")) name += ".txt";
    if (parentNode.children.some(child => child.name === name)) {
        alert(`A file named "${name}" already exists in this folder.`);
        return null;
    }
    const newFile = {
        id: crypto.randomUUID(),
        type: "file",
        name: name,
        content: ""
    };
    parentNode.children.push(newFile);
    saveFileSystem();
    return newFile;
}

function createFolder(parentID, name) {
    const parentNode = findNodeByID(fileSystem, parentID);
    if (!parentNode || parentNode.type !== "folder") return null;
    if (!name) {
        alert("Folder name can't be empty.");
        return null;
    }
    if (parentNode.children.some(child => child.name === name)) {
        alert(`A folder named "${name}" already exists in this folder.`);
        return null;
    }
    const newFolder = {
        id: crypto.randomUUID(),
        type: "folder",
        name: name,
        children: []
    };
    parentNode.children.push(newFolder);
    saveFileSystem();
    return newFolder;
}

function askTextFileName () {
    filesWindowContent.innerHTML = `
                                    <div class="text_file_name_input">
                                        <input class="text_file_name_input_area" type="text" id="textFileNameInput" placeholder="Enter file name...">
                                        <div id="textFileNameSubmitButton" class="text_file_name_button no_select">Submit</div>
                                        <div id="textFileNameCancelButton" class="text_file_name_button no_select">Cancel</div>
                                    </div>
    `;
    const textFileNameInput = document.querySelector("#textFileNameInput");
    const textFileNameSubmitButton = document.querySelector("#textFileNameSubmitButton");
    const textFileNameCancelButton = document.querySelector("#textFileNameCancelButton");

    textFileNameSubmitButton.addEventListener("click", function () {
        playPressAnimation(textFileNameSubmitButton);
        renderFileExplorerShell();
        const newFile = createTextFile(filesCurrentDirectory.id, textFileNameInput.value);
        if (newFile) openTextFile(newFile);
    });

    textFileNameCancelButton.addEventListener("click", function () {
        playPressAnimation(textFileNameCancelButton);
        renderFileExplorerShell();
        openFolder(filesCurrentDirectory);
    });
}

function askFolderName() {
    filesWindowContent.innerHTML = `
                                    <div class="text_file_name_input">
                                        <input class="text_file_name_input_area" type="text" id="folderNameInput" placeholder="Enter folder name...">
                                        <div id="folderNameSubmitButton" class="text_file_name_button no_select">Submit</div>
                                        <div id="folderNameCancelButton" class="text_file_name_button no_select">Cancel</div>
                                    </div>
    `;
    const folderNameInput = document.querySelector("#folderNameInput");
    const folderNameSubmitButton = document.querySelector("#folderNameSubmitButton");
    const folderNameCancelButton = document.querySelector("#folderNameCancelButton");

    folderNameSubmitButton.addEventListener("click", function () {
        playPressAnimation(folderNameSubmitButton);
        renderFileExplorerShell();
        createFolder(filesCurrentDirectory.id, folderNameInput.value);
        openFolder(filesCurrentDirectory);
    });

    folderNameCancelButton.addEventListener("click", function () {
        playPressAnimation(folderNameCancelButton);
        renderFileExplorerShell();
        openFolder(filesCurrentDirectory);
    });
}

function openTextFile(file) {
    if (!file || file.type !== "file") return;
    filesWindowContent.innerHTML = `<div class="text_file_window">
                                        <div class="text_file_header">
                                            <p class="text_file_header_name">${file.name}</p>
                                            <div class="text_file_header_controls">
                                                <div id="textFileHeaderDeleteButton" class="text_file_header_button">
                                                    <img class="text_file_header_icon" src="Images/delete.svg" alt="Delete">
                                                </div>
                                                <div id="textFileHeaderCloseButton" class="text_file_header_button">
                                                    <img class="text_file_header_icon" src="Images/close.svg" alt="Close">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text_file_content">
                                            <p class="text_file_content_area" contenteditable="true">${file.content || ""}</p>
                                        </div>
                                    </div>
    `;
    const textFileContentArea = document.querySelector(".text_file_content_area");
    textFileContentArea.addEventListener("input", function () {
        file.content = textFileContentArea.innerText;
        saveFileSystem();
    });

    const textFileHeaderCloseButton = document.querySelector("#textFileHeaderCloseButton");
    textFileHeaderCloseButton.addEventListener("click", function () {
        playPressAnimation(textFileHeaderCloseButton);
        renderFileExplorerShell();
        openFolder(filesCurrentDirectory);
    });
    const textFileHeaderDeleteButton = document.querySelector("#textFileHeaderDeleteButton");
    textFileHeaderDeleteButton.addEventListener("click", function () {
        playPressAnimation(textFileHeaderDeleteButton);
        const parentNode = findParent(fileSystem, file.id);
        if (parentNode) {
            parentNode.children = parentNode.children.filter(child => child.id !== file.id);
            saveFileSystem();
            renderFileExplorerShell();
            openFolder(filesCurrentDirectory);
        }
    });
}

function openFolder(folder) {
    if (!folder) return;

    filesContentMain.innerHTML = "";
    if (folder.type === "folder") {
        filesCurrentDirectory = folder;
        filesDirectoryDisplay.innerText = ">" + filesCurrentDirectory.name;
        folder.children.forEach(child => {
            let newFolder = document.createElement("div");
            let newFolderIcon = document.createElement("div");
            newFolderIcon.classList.add("file_item_icon");
            let newFolderIconSVG = document.createElement("img");
            if (child.type === "folder") {
                newFolderIconSVG.src = "Images/folder.svg";
                newFolderIconSVG.alt = "Folder";
            } else if (child.type === "file") {
                newFolderIconSVG.src = "Images/file.svg";
                newFolderIconSVG.alt = "File";
            }
            newFolderIconSVG.classList.add("new_folder_icon_svg");
            newFolderIcon.appendChild(newFolderIconSVG);
            let newFolderName = document.createElement("div");
            newFolderName.classList.add("file_item_name");
            newFolder.classList.add("file_item");
            newFolder.appendChild(newFolderIcon);
            newFolder.appendChild(newFolderName);
            newFolderName.innerText = child.name;
            newFolder.dataset.id = child.id;

            newFolder.addEventListener("click", function () {
                playPressAnimation(newFolder);
                if (child.type === "folder") {
                    openFolder(child);
                } else {
                    openTextFile(child);
                }
            });

            let deleteButton = document.createElement("div");
            deleteButton.classList.add("file_item_delete_button");
            let deleteButtonIcon = document.createElement("img");
            deleteButtonIcon.classList.add("file_item_delete_button_icon");
            deleteButtonIcon.src = "Images/delete.svg";
            deleteButtonIcon.alt = "Delete";
            deleteButton.appendChild(deleteButtonIcon);
            deleteButton.addEventListener("click", function (event) {
                event.stopPropagation();
                playPressAnimation(deleteButton);
                const parentNode = findParent(fileSystem, child.id);
                if (parentNode) {
                    parentNode.children = parentNode.children.filter(c => c.id !== child.id);
                    saveFileSystem();
                    openFolder(filesCurrentDirectory);
                }
            });
            newFolder.appendChild(deleteButton);

            filesContentMain.appendChild(newFolder);
        });
    } else if (folder.type === "file") {
        openTextFile(folder);
    }

    renderSidebar();
}

function saveFileSystem() {
    localStorage.setItem("fileSystem", JSON.stringify(fileSystem));
}

function bindFileExplorerUI() {
    filesContentMain = document.querySelector("#filesContentMain");
    filesSidebarList = document.querySelector("#filesSidebarList");
    returnToParentDirectoryButton = document.querySelector("#filesReturnToParentDirectoryButton");
    filesDirectoryDisplay = document.querySelector("#filesCurrentDirectory");
    filesAddFileButton = document.querySelector("#filesAddFileButton");
    filesAddFolderButton = document.querySelector("#filesAddFolderButton");

    filesAddFileButton.addEventListener("click", function () {
        playPressAnimation(filesAddFileButton);
        askTextFileName();
    });
    filesAddFolderButton.addEventListener("click", function () {
        playPressAnimation(filesAddFolderButton);
        askFolderName();
    });
    returnToParentDirectoryButton.addEventListener("click", function () {
        playPressAnimation(returnToParentDirectoryButton);
        openFolder(findParent(fileSystem, filesCurrentDirectory.id));
    });
}

bindFileExplorerUI();
renderSidebar();
openFolder(fileSystem);