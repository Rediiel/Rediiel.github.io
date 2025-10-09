// --- Mode sombre / clair ---
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// --- Chargement dynamique des projets depuis l’API GitHub ---
const projectList = document.getElementById("project-list");

// Remplace par ton identifiant GitHub
const GITHUB_USERNAME = "mathysbauchet";

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
  .then(response => response.json())
  .then(repos => {
    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Aucune description disponible."}</p>
        <a href="${repo.html_url}" target="_blank">🔗 Voir sur GitHub</a>
      `;
      projectList.appendChild(card);
    });
  })
  .catch(error => {
    projectList.innerHTML = "<p>Impossible de charger les projets 😢</p>";
    console.error(error);
  });
