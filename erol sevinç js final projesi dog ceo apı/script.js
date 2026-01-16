const container = document.getElementById("cardContainer");
const refreshBtn = document.getElementById("refreshBtn");
const themeBtn = document.getElementById("themeBtn");
const sortBtn = document.getElementById("sortBtn");
const loading = document.getElementById("loading");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalBreed = document.getElementById("modalBreed");
const closeModal = document.getElementById("closeModal");

let dogsData = [];

function getBreedName(url) {
  const parts = url.split("/");
  const breedPart = parts[parts.indexOf("breeds") + 1];
  return breedPart.replace("-", " ").toUpperCase();
}

function renderCards(list) {
  container.innerHTML = "";

  list.forEach((dog) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <img src="${dog.image}" alt="dog">
            <div class="card-info">
                <h3>${dog.breed}</h3>
                <p>Kaynak: Dog CEO API</p>
            </div>
        `;

    card.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = dog.image;
      modalBreed.innerText = dog.breed;
    });

    container.appendChild(card);
  });
}

async function loadDogs() {
  container.innerHTML = "";
  loading.style.display = "block";

  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random/12");
    const data = await res.json();

    dogsData = data.message.map((img) => ({
      image: img,
      breed: getBreedName(img),
    }));

    renderCards(dogsData);
  } catch (error) {
    loading.innerText = "Bir hata oluştu!";
  }

  loading.style.display = "none";
}

// yeni köpekler
refreshBtn.addEventListener("click", loadDogs);

// sıralama
sortBtn.addEventListener("click", () => {
  const sortedDogs = [...dogsData].sort((a, b) =>
    a.breed.localeCompare(b.breed),
  );
  renderCards(sortedDogs);
});

// gece modu
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

loadDogs();
