const pageSelector1 = document.querySelector("#welcomeWindowPageSelector1")
const pageSelector2 = document.querySelector("#welcomeWindowPageSelector2")
const pageSelector3 = document.querySelector("#welcomeWindowPageSelector3")
const windowContent = document.querySelector("#welcomeWindowContent")

const welcome_content = [
    {
        content: `
            <div class="welcome_window_page">
                <div class="welcome_window_page_header">
                    <h1 class="welcome_window_title">Welcome to MeowOS!</h1>
                </div>
                <div class="welcome_window_content">
                    <p>Hi! This is my webOS project!</p>
                    <p> I hope it works well!</p>
                </div>
            </div>
        `
    },
    {
        content: `
            <div class="welcome_window_page" id="welcomeWindowPage2">
                <div class="welcome_window_page_header">
                    <h1 class="welcome_window_title">Apps and Features</h1>
                </div>
                <div class="welcome_window_content">
                    <p>-Notes App</p>
                    <p>-Stopwatch App</p>
                    <p>-To-Do List App</p>
                </div>
            </div>
        `
    },
    {
        content: `
            <div class="welcome_window_page" id="welcomeWindowPage3">
                <div class="welcome_window_page_header">
                    <h1 class="welcome_window_title">Credits</h1>
                </div>
                <div class="welcome_window_content">
                    <p>Background: 25th hour by Louis Coyle</p>
                </div>
            </div>
        `
    },
];

function setWelcomeContent(index) {
    windowContent.innerHTML = welcome_content[index].content;
}

setWelcomeContent(0);

pageSelector1.addEventListener("click", function () {
    pageSelector1.classList.add("select_page");
    setWelcomeContent(0);
    setTimeout(function () {
        pageSelector1.classList.remove("select_page");
    }, 150);
    pageSelector1.classList.add("page_selected");
    pageSelector2.classList.remove("page_selected");
    pageSelector3.classList.remove("page_selected");
});
pageSelector2.addEventListener("click", function () {
    pageSelector2.classList.add("select_page");
    setWelcomeContent(1);
    setTimeout(function () {
        pageSelector2.classList.remove("select_page");
    }, 150);
    pageSelector1.classList.remove("page_selected");
    pageSelector2.classList.add("page_selected");
    pageSelector3.classList.remove("page_selected");
});
pageSelector3.addEventListener("click", function () {
    pageSelector3.classList.add("select_page");
    setWelcomeContent(2);
    setTimeout(function () {
        pageSelector3.classList.remove("select_page");
    }, 150);
    pageSelector1.classList.remove("page_selected");
    pageSelector2.classList.remove("page_selected");
    pageSelector3.classList.add("page_selected");
});