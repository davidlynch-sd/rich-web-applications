var searchGithub = function () {
  var input = document.getElementById("unametext");
  fetch("https://api.github.com/users/" + input.value)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Fetch failed" + response.status);
      }
    })
    .then(function (data) {
      return generatePage(data);
    });
};
var generatePage = function (data) {
  console.log(data);
  var img = document.getElementById("profilePic");
  img.src = data.avatar_url;
  document.getElementById("nameText").innerText = "Name: " + data.name;
  document.getElementById("unameText").innerText = "Username: " + data.login;
  document.getElementById("emailText").innerText = "Email: " + data.email;
  document.getElementById("locoText").innerText = "Location: " + data.location;
  document.getElementById("gistText").innerText =
    "Number of Gists: " + data.public_gists;
  document.getElementById("profile").style.visibility = "visible";
  fetch(data.repos_url)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Fetch failed" + response.status);
      }
    })
    .then(function (data) {
      return generateRepos(data);
    });
};
var generateRepos = function (data) {
  var repos = document.getElementById("repos");
  repos.innerText = "";
  var h3 = document.createElement("H3");
  h3.innerText = "User Repos";
  repos.appendChild(h3);
  data.forEach(function (repo) {
    var newDiv = document.createElement("DIV");
    var name = document.createElement("P");
    var description = document.createElement("P");
    name.innerText = "Name: " + repo.name;
    description.innerText = "Description: " + repo.description;
    newDiv.appendChild(name);
    newDiv.appendChild(description);
    repos.appendChild(newDiv);
  });
  repos.style.visibility = "visible";
};
