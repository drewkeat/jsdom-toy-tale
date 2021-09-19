let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(object => {
    const toyCollection = document.querySelector("#toy-collection")
    for (const toy of object) {
      const card = document.createElement("div")
      card.className = "card"
      toyCollection.appendChild(card)
    }
  })
});
