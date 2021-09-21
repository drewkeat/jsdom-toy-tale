let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function createCard(toy) {
    const card = document.createElement("div");
    card.className = "card";
    const toyId = document.createElement("h1")
    toyId.innerText = toy.id
    toyId.style.display = "none"
    const name = document.createElement("h2");
    name.innerText = toy.name;
    const pic = document.createElement("img");
    pic.src = toy.image;
    pic.className = "toy-avatar";
    const likesDisplay = document.createElement("p");
    likesDisplay.innerText = toy.likes;
    const likeButton = document.createElement("button");
    likeButton.innerText = "Like";
    likeButton.addEventListener("click", (e) => { fetchLikes(card)
    })
    card.appendChild(name);
    card.appendChild(pic);
    card.appendChild(likesDisplay);
    card.appendChild(likeButton);
    card.appendChild(toyId)
    return card;
  }

  function loadToys() {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((object) => {
        for (const toy of object) {
          toyCollection.appendChild(createCard(toy));
        }
      });
  }
  loadToys();

  const createBtn = document.querySelector("body > div.container > form > input:nth-child(6)");

  function toyData() {
    const name = document.querySelector("body > div.container > form > input:nth-child(2)");
    const imgUrl = document.querySelector("body > div.container > form > input:nth-child(4)");
    const toy = {
      name: name.value,
      image: imgUrl.value,
      likes: 0,
    };

    name.value = "";
    imgUrl.value = "";

    return toy;
  }

  async function submitToy() {
    await fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toyData()),
    });
    while (toyCollection.lastChild) {
      toyCollection.lastChild.remove();
    }
    loadToys();
  }

  createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submitToy();
    loadToys();
    toyFormContainer.style.display = "none";
  });

  async function fetchLikes(card) {
    const toyId = card.lastChild.innerText
    const likes = Number(card.children[2].innerText)
    await fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: `${likes + 1}`
      })
    })
    .then(resp => resp.json())
    .then(json => {
      card.children[2].innerText = json.likes
    })
  }

});
