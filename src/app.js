"use strict";

const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elements-displayed"
);
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

fetch("../public/data.json")
  .then((response) => response.json())
  .then((data) => {
    let output = "";
    data.forEach((kitten) => {
      output += `
      <div class="card">
      <img src=${kitten.img} alt="nice cat" width=250 height=300>
      <h4><b>Name: ${kitten.name}</b></h4>
      <p>Age: ${kitten.age}</p>
      <p>Color: ${kitten.color}</p>
      <p><button>Take me</button></p>
      </div>
      `;
    });
    document.getElementById("output").innerHTML = output;
  })
  .catch((error) => console.log(error));
