
//Generic API to fetch the user details
const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
//passed the value typed by the user to the function
getUser("ashritha465");
//fetching the user details
async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    createUserCard(respData);//called the function to fetch the user
    getRepos(username);
}
//fetching the user's repository
async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();
    addReposToCard(respData);
}
//got the information of user-picture, name,bio,followers,following,public repositories
function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}
//added the fetched repository of the user to the card
function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}
//Event starts after clicking submit in the form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);// function called
        search.value = "";
    }
});