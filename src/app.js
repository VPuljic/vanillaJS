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
const array = [];
const PER_PAGE = 10;
const pagination = {
  startSlice: 0,
  endSlice: 10,
};
/// Pulling data from local file
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
/// Structure of kitten "card"
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
  newArray.forEach((item) => {
    const itemLi = displayKittens(item);
    list.appendChild(itemLi);
  });
}
/// Spliting array of pulled data to display page by page
function pageArraySplit(array) {
  console.log(pagination.startSlice);
  return array.slice(pagination.startSlice, pagination.endSlice);
}
/// Creating new splited array
function loadPaging(array) {
  const newArray = pageArraySplit(array);
  loadList(newArray);
}
/// Event listener on button to display kittens
showMore.addEventListener("click", () => {
  loadPaging(array);
  pagination.startSlice = pagination.endSlice;
  pagination.endSlice += PER_PAGE;
});
