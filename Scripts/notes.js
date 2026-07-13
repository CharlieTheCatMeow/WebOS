const notesHeaderTitle = document.querySelector("#notesHeaderTitle");
const newPageButton = document.querySelector("#notesSidebarAddPage");
const notesResetButton = document.querySelector("#notesSidebarReset");

let content = JSON.parse(localStorage.getItem("notesData")) || [
    {
        title: "Notes",
        date: "today",
        content: `
            <div class="notes_page">
                <div class="notes_page_header">
                    <h1 class="notes_title" contenteditable="true">Notes</h1>
                    <p class="notes_date" contenteditable="true">today</p>
                </div>
                <div class="notes_page_content">
                    <p contenteditable="true">Content for page 1...</p>
                </div>
            </div>
        `
    }
];

function setNotesContent(index) {
    const MAX_TITLE_LENGTH = 18;
    const MAX_DATE_LENGTH = 10;

    const notesContent = document.querySelector("#notesPageContent");
    notesContent.innerHTML = content[index].content;

    let pageWrite = notesContent.querySelector(".notes_page_content p");
    let pageTitle = notesContent.querySelector(".notes_title");
    let pageDate = notesContent.querySelector(".notes_date");

    pageWrite.addEventListener("input", function () {
        content[index].content = notesContent.innerHTML;
        localStorage.setItem("notesData", JSON.stringify(content));
    });
    pageTitle.addEventListener("input", function () {
        if (pageTitle.innerText.length > MAX_TITLE_LENGTH) {
            pageTitle.innerText = pageTitle.innerText.substring(0, MAX_TITLE_LENGTH);

            window.getSelection().selectAllChildren(pageTitle);
            window.getSelection().collapseToEnd();
        }

        content[index].title = pageTitle.innerText;
        localStorage.setItem("notesData", JSON.stringify(content));
    });
    pageDate.addEventListener("input", function () {
        if (pageDate.innerText.length > MAX_DATE_LENGTH) {
            pageDate.innerText = pageDate.innerText.substring(0, MAX_DATE_LENGTH);

            window.getSelection().selectAllChildren(pageDate);
            window.getSelection().collapseToEnd();
        }

        content[index].date = pageDate.innerText;
        localStorage.setItem("notesData", JSON.stringify(content));
    });

    notesHeaderTitle.innerText = `Notes: Page ${index + 1}`;
}

function addToSidebar(index) {
    const notesSidebar = document.querySelector("#notesSidebarPages");
    let newDiv = document.createElement("div");

    newDiv.classList.add("notes_selector");
    newDiv.innerText = index + 1;

    newDiv.addEventListener("click", function () {
        setNotesContent(index);
        notesSidebar.querySelectorAll(".notes_selector").forEach(function (btn) {
            btn.classList.remove("notes_page_selected");
        });
        newDiv.classList.add("notes_page_selected");
        newDiv.classList.add("select_notes_button");
        newDiv.classList.add("no_select")
        setTimeout(function () {
            newDiv.classList.remove("select_notes_button");
        }, 150);
    });
    notesSidebar.appendChild(newDiv);
}

function createPage() {
    const newNote = {
        title: "Notes",
        date: "today",
        content: `
            <div class="notes_page">
                <div class="notes_page_header">
                    <h1 class="notes_title" contenteditable="true">Notes</h1>
                    <p class="notes_date" contenteditable="true">today</p>
                </div>
                <div class="notes_page_content">
                    <p contenteditable="true">Content for page...</p>
                </div>
            </div>
        `
    };

    content.push(newNote);
    let noteIndex = content.length - 1;
    addToSidebar(noteIndex);
    setNotesContent(noteIndex);
}

function resetNotes() {
    localStorage.clear();

    content = [
        {
            title: "Notes",
            date: "today",
            content: `
                <div class="notes_page">
                    <div class="notes_page_header">
                        <h1 class="notes_title" contenteditable="true">Notes</h1>
                        <p class="notes_date" contenteditable="true">today</p>
                    </div>
                    <div class="notes_page_content">
                        <p contenteditable="true">Content for page 1...</p>
                    </div>
                </div>
            `
        }
    ];

    const notesSidebarPages = document.querySelector("#notesSidebarPages");
    notesSidebarPages.innerHTML = "";

    for (let i = 0; i < content.length; i++) {
        addToSidebar(i);
    }
    setNotesContent(0);
}

for (let i = 0; i < content.length; i++) {
        addToSidebar(i);
    }

setNotesContent(0);
const firstSelector = document.querySelector("#notesSidebarPages .notes_selector");
if (firstSelector) {
    firstSelector.classList.add("notes_page_selected");
}

newPageButton.addEventListener("click", function () {
    createPage();
    newPageButton.classList.add("select_notes_button");
    setTimeout(function () {
        newPageButton.classList.remove("select_notes_button");
    }, 150);
});

notesResetButton.addEventListener("click", function () {
    resetNotes();
    notesResetButton.classList.add("select_notes_button");
    setTimeout(function () {
        notesResetButton.classList.remove("select_notes_button");
    }, 150);
});