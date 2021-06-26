"use strict";

// Carousel
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elements-displayed"
);
const marqueeContent = document.querySelector("ul.marquee-content");
root.style.setProperty("--marquee-elements", marqueeContent.children.length);
for (let i = 0; i < marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// List of kitten "cards"
const showMore = document.getElementById("showMore");
const PER_PAGE = 10;
const array = [];
fetch("../public/data.json")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((element) => {
      array.push(element);
    })
  )
  .catch((error) => {
    console.log(error);
  });
function displayKittens(item) {
  const template = document.createElement("template");
  const html = `
      <div class="card">
      <img src=${item.img} alt="nice cat" width=250 height=300>
      <h4><b>Name: ${item.name}</b></h4>
      <p>Age: ${item.age}</p>
      <p>Color: ${item.color}</p>
      <p><button>Take me</button></p>
      </div>
      `;
  template.innerHTML = html;
  return template.content;
}
const list = document.getElementById("list");
function loadList(newArray) {
  /*  while (newArray.children.length > 0) {
    newArray.lastElementChild.remove();
  }*/
  newArray.forEach((item) => {
    const itemLi = displayKittens(item);
    list.appendChild(itemLi);
  });
}
function pageArraySplit(array) {
  return array.slice(0, PER_PAGE);
}
function loadPaging(array) {
  const newArray = pageArraySplit(array);
  loadList(newArray);
}
showMore.addEventListener("click", () => {
  loadPaging(array);
});
