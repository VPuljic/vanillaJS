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
let newArray = [];
let selectedValue = "";
let sortValue = "";
let checkboxArray = [];
let filtertArray = [];
/// Radio button name or age
function checkedValue() {
  selectedValue = document.querySelector("input[name=radio]:checked");
  return selectedValue.value;
}
/// Radio button ascending/descending
function sortArray() {
  sortValue = document.querySelector("input[name=sort]:checked");
  return sortValue.value;
}

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
  return array.slice(pagination.startSlice, pagination.endSlice);
}
/// Creating new splited and sorted array
function loadPaging(array) {
  let ageName = checkedValue();
  let ascendingDescending = sortArray();
  ascendingDescending === "ascending"
    ? array.sort(function (a, b) {
        if (a[ageName] < b[ageName]) {
          return -1;
        }
        if (a[ageName] > b[ageName]) {
          return 1;
        }
        return 0;
      })
    : array.sort(function (a, b) {
        if (a[ageName] < b[ageName]) {
          return 1;
        }
        if (a[ageName] > b[ageName]) {
          return -1;
        }
        return 0;
      });
  if (checkboxArray.length > 0) {
    filtertArray = array.filter((element) => element.color === "grey");
    newArray = pageArraySplit(filtertArray);
  } else newArray = pageArraySplit(array);
  loadList(newArray);
  console.log("filter", filtertArray);
  console.log("array", array);
}
/// Filter array of kittens
function loadFilter() {
  let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach((checkbox) => {
    checkboxArray.push(checkbox.value);
  });
}
/// Event listener on button to display kittens
showMore.addEventListener("click", () => {
  loadFilter();
  loadPaging(array);
  pagination.startSlice = pagination.endSlice;
  pagination.endSlice += PER_PAGE;
});
