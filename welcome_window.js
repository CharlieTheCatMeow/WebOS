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
                    <div class="welcome_window_profile">
                        <div class="welcome_window_profile_info">
                            <img src="Images/CharlieCatMeowPFPSquare.png" alt="Profile Picture" class="welcome_window_profile_picture">
                            <h2 class="welcome_window_profile_name">CharlieCatMeow</h2>
                        </div>
                        <div class="welcome_window_profile_connections">
                            <a href="https://www.github.com/CharlieTheCatMeow" target="_blank" class="welcome_window_profile_connection_link">
                                <div class="welcome_window_profile_connection">
                                    <img src="Images/github_logo.svg" alt="Github Logo" class="welcome_window_profile_connection_logo">
                                </div>
                            </a>
                            <a href="https://hackclub.enterprise.slack.com/team/U0B9S51GFK3" target="_blank" class="welcome_window_profile_connection_link">
                                <div class="welcome_window_profile_connection">
                                    <img src="Images/slack_logo.svg" alt="Slack Logo" class="welcome_window_profile_connection_logo">
                                </div>
                            </a>
                            </div>
                        </div>
                    </div>
                    <h2>A bit about me:</h2>
                    <p>I am a student at a school (shocker :O) <br> I sometimes code for fun and try new things out. <br> I decided to make a website this time :3 <br> Enjoy!</p>
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
                    <p>-Notes</p>
                    <p>-Stopwatch</p>
                    <p>-To-Do List</p>
                    <p>-Terminal</p>
                    <p>-Calculator</p>
                    <p>-Music Player</p>
                    <p>-Gallery</p>
                    <p>-Browser</p>
                    <p>-Files</p>
                    <p>-Search</p>
                    <p>-Control Center</p>
                    <p>-Widgets (Toggle in settings)</p>
                    <p>-Dark and Light Mode</p>
                    <p>-Interative elements</p>
                    <p>-Loading Screen</p>
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
                    <p>Music: Daisuke Hasegawa, Coda and Yugo Kanno</p>
                    <p>Thank you for using MeowOS!</p>
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