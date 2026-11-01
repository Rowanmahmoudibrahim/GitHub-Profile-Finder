
// 1. Select HTML Elements
const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const profileDiv = document.getElementById("profile");
const repositoriesDiv = document.getElementById("repositories");
const loadingDiv = document.getElementById("loading");

// 2. Search Function
async function searchGitHubUser() {

    const username = usernameInput.value.trim();

    // Check if input is empty
    if (username === "") {
        alert("Please enter a GitHub username!");
        return;
    }

    // Show Loading
    searchBtn.textContent = "Loading...";
    searchBtn.disabled = true;

    profileDiv.classList.add("hidden");
    repositoriesDiv.classList.add("hidden");
    extraButton.classList.remove("hidden");

    
searchBtn.textContent = "Loading...";
searchBtn.disabled = true;
loadingDiv.classList.remove("hidden");

    try {

        // 3. Fetch User Data
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`
        );

        if (!response.ok) {
            throw new Error("User not found!");
        }

        const user = await response.json();

        // 4. Fetch User Repositories
        const reposResponse = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`
        );

        if (!reposResponse.ok) {
            throw new Error("Could not load repositories!");
        }

        const repos = await reposResponse.json();

        // 5. Display User Profile
        profileDiv.innerHTML = `
<div class="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl mx-auto">                <img
                    src="${user.avatar_url}"
                    alt="User Avatar"
class="w-32 h-32 shrink-0 rounded-full border-4 border-amber-300"                >

<div class="text-center md:text-left flex-1 min-w-0 w-full">
                    <h2 class="text-3xl font-bold mb-2">
                        ${user.name || user.login}
                    </h2>

                    <a
                        href="${user.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sky-400 hover:underline"
                    >
                        @${user.login}
                    </a>

                    <p class="text-gray-400 mt-3">
                        ${user.bio || "No bio yet."}
                    </p>

                    <div class="flex flex-wrap justify-center md:justify-start gap-6 mt-5">

                        <p class="border-1 border-none rounded-xl px-3 py-1 bg-slate-950">
                            <strong class="text-amber-300">${user.public_repos}</strong>
                            <span class="text-olive-50"> repos</span>
                        </p>

                        <p class="border-1 border-none rounded-xl px-3 py-1 bg-slate-950">
                            <strong class="text-amber-300">${user.followers.toLocaleString()}</strong>
                            <span class="text-olive-50"> followers</span>
                        </p>

                        <p class="border-1 border-none rounded-xl px-3 py-1 bg-slate-950">
                            <strong class="text-amber-300">${user.following}</strong>
                            <span class="text-olive-50"> following</span>
                        </p>

                    </div>

                </div>
            </div>
        `;

        // 6. Display Latest Repositories
        repositoriesDiv.innerHTML = `
            <h2 class="text-xl font-bold mb-6 max-w-4xl mx-auto">
                Latest repositories
            </h2>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                ${repos.length === 0
                    ? `<p class="text-gray-400">No public repositories found.</p>`
                    : repos.map(repo => `
<div class="bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-5 min-w-0 break-words">
                            <a
                                href="${repo.html_url}"
                                target="_blank"
                                rel="noopener noreferrer"
class="text-xl font-bold text-sky-300 cursor-pointer break-all"                            >
                                ${repo.name}
                            </a>

                            <p class="text-gray-400 mt-2">
                                ${repo.description || "No description provided."}
                            </p>

                            <div class="flex gap-5 mt-4 text-sm text-gray-400">

                                <span>
                                    ⭐ ${repo.stargazers_count.toLocaleString()}
                                </span>

                                <span>
                                    ${repo.language || "Language not specified"}
                                </span>

                            </div>

                        </div>
                    `).join("")
                }

            </div>
        `;

       
// 7. Show Results
profileDiv.classList.remove("hidden");
repositoriesDiv.classList.remove("hidden");
extraButton.classList.add("hidden");


    } catch (error) {

        alert(error.message);

    } finally {

        // Stop Loading
       searchBtn.textContent = "Search";
    searchBtn.disabled = false;
    loadingDiv.classList.add("hidden");

    }
}

// 8. Search Button Event
searchBtn.addEventListener("click", searchGitHubUser);

// Search when pressing Enter
usernameInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchGitHubUser();
    }

});


function quickSearch(username) {
    usernameInput.value = username;
    searchGitHubUser();
}