"use strict";

fetch("../public/data.json")
  .then((response) => response.json())
  .then((data) => {
    let output = "<h2>Kittens</h2>";
    data.forEach((kitten) => {
      output += `
      <ul>
      <li>Name: ${kitten.name}</li>
      <li>Age: ${kitten.age}</li>
      <li>Color: ${kitten.color}</li>
      <img src=${kitten.img} alt="nice cat" width=500 height=600>
      </ul>
      `;
    });
    document.getElementById("output").innerHTML = output;
  })
  .catch((error) => console.log(error));
