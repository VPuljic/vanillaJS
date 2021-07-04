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
const PER_PAGE = 20;
const pagination = {
  startSlice: 0,
  endSlice: 20,
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
/// Function that "adopts" kitten
function take(id) {
  if (confirm(`Do you want to adopt`) == true) {
    document.getElementById("list").innerHTML = "";
    let notTaken = newArray.filter((element) => element.id !== id);
    loadList(notTaken);
  }
}
/// Structure of kitten "card"
function displayKittens(item) {
  const template = document.createElement("template");
  const html = `
      <div class="card">
      <img src=${item.img} alt="nice cat" width=250 height=300>
      <h4><b>Name: ${item.name}</b></h4>
      <p>Age: ${item.age}</p>
      <p>Color: ${item.color}</p>
      <p><button onclick="take(${item.id})">Take me</button></p>
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
  /// Filtering by checkbox
  if (checkboxArray.length === 1) {
    switch (checkboxArray[0]) {
      case "black":
        filtertArray = array.filter((element) => element.color === "black");
        newArray = pageArraySplit(filtertArray);
        break;
      case "12":
        filtertArray = array.filter((element) => element.age < "12");
        newArray = pageArraySplit(filtertArray);
        break;
      case "6":
        filtertArray = array.filter((element) => element.age < "6");
        newArray = pageArraySplit(filtertArray);
        break;
      default:
        console.log("Error");
    }
  } else if (checkboxArray.length === 2) {
    switch (checkboxArray[0] + checkboxArray[1]) {
      case "12black":
        filtertArray = array.filter(
          (element) => element.color === "black" && element.age < "12"
        );
        newArray = pageArraySplit(filtertArray);
        break;
      case "6black":
        filtertArray = array.filter(
          (element) => element.color === "black" && element.age < "6"
        );
        newArray = pageArraySplit(filtertArray);
        break;
      case "612":
        filtertArray = array.filter((element) => element.age < "12");
        newArray = pageArraySplit(filtertArray);
        break;
      default:
        console.log("Error");
    }
  } else if (checkboxArray.length === 3) {
    switch (checkboxArray[0] + checkboxArray[1] + checkboxArray[2]) {
      case "612black":
        filtertArray = array.filter(
          (element) => element.color === "black" && element.age < "12"
        );
        newArray = pageArraySplit(filtertArray);
        break;
    }
  } else newArray = pageArraySplit(array);
  loadList(newArray);
}
/// Filtering displayed kittens by search bar
function searchKitten() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let dispalyedKittens = [];
  for (var i = 0; i < newArray.length; i++) {
    if (!newArray[i].name.toLowerCase().includes(input)) {
      document.getElementById("list").innerHTML = "";
    } else {
      document.getElementById("list").innerHTML = "";
      dispalyedKittens.push(newArray[i]);
    }
  }
  loadList(dispalyedKittens);
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
