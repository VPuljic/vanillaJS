"use strict";

fetch("../public/data.json")
  .then((response) => response.json())
  .then((data) => {
    let output = "<h2>Kittens</h2>";
    data.forEach((kitten) => {
      output += `
      <div class="card">
      <img src=${kitten.img} alt="nice cat" width=250 height=300>
      <h4><b>Name: ${kitten.name}</b></h4>
      <p>Age: ${kitten.age}</p>
      <p>Color: ${kitten.color}</p>
      <p><button>Take ME</button></p>
      </div>
      `;
    });
    document.getElementById("output").innerHTML = output;
  })
  .catch((error) => console.log(error));
