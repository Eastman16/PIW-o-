//global variables
"use strict";
let lastDeletedItem = null;
let lastDeletedItemIndex = null;
let lastDeletedListId = null;

//function to create and return a new list item
function createListItem(taskText) {
  var listItem = document.createElement("li");
  listItem.style.display = "flex";
  listItem.style.alignItems = "center";
  listItem.style.justifyContent = "space-between";
  listItem.style.overflowWrap = "break-word";

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  listItem.appendChild(checkbox);

  var textSpan = document.createElement("span");
  textSpan.style.flexGrow = "1";
  textSpan.style.wordBreak = "break-word";
  textSpan.style.marginLeft = "12px";
  textSpan.textContent = taskText;
  listItem.appendChild(textSpan);

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.background = "none";
  deleteBtn.style.border = "none";
  deleteBtn.style.cursor = "pointer";
  listItem.appendChild(deleteBtn);

  return listItem;
}

//function to attach event listeners
function addEventListenersToListItem(listItem, listContainer) {
  var deleteBtn = listItem.querySelector("button");
  var checkbox = listItem.querySelector(".task-checkbox");

  var textSpan = listItem.querySelector("span");

  //deleting the task by clicking on the delete button
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    var taskText = textSpan.textContent;
    var confirmation = confirm(
      "Are you sure you want to delete the task: " + taskText + "?"
    );
    //storing the deleted item
    if (confirmation) {
      lastDeletedItem = listItem.cloneNode(true);
      lastDeletedListId = listContainer.id;
      lastDeletedItemIndex = Array.from(listContainer.children).indexOf(
        listItem
      );

      listContainer.removeChild(listItem);
    }
  });

  //marking the task as completed
  listItem.addEventListener("click", function (event) {
    if (event.target !== deleteBtn) {
      checkbox.checked = !checkbox.checked;
      textSpan.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";
      textSpan.style.color = checkbox.checked ? "grey" : "black";

      if (checkbox.checked) {
        var date = new Date();
        var dateString = document.createElement("span");
        dateString.textContent = `Completed on: ${date.toLocaleDateString()}`;
        dateString.style.display = "block";
        dateString.style.fontSize = "smaller";
        dateString.style.color = "grey";
        dateString.className = "date-completed";
        listItem.appendChild(dateString);
      } else {
        var dateCompletedSpan = listItem.querySelector(".date-completed");
        if (dateCompletedSpan) {
          listItem.removeChild(dateCompletedSpan);
        }
      }
    }
  });
}

//function to add a task
function addTask() {
  var inputBox = document.getElementById("input-box");
  var taskText = inputBox.value.trim();
  var listSelector = document.getElementById("list-selector");
  var listValue = listSelector.value;

  if (listValue === "") {
    alert("You have to choose a list.");
    return;
  }

  var listContainer = document.getElementById(listValue + "-list");

  if (taskText !== "") {
    var listItem = createListItem(taskText);
    addEventListenersToListItem(listItem, listContainer);
    listContainer.appendChild(listItem);
    inputBox.value = "";
  } else {
    alert("Please enter a task.");
  }
}

//function to reverse the deletion of a task
function reverseDeletion() {
  if (
    lastDeletedItem &&
    lastDeletedListId !== null &&
    lastDeletedItemIndex !== null
  ) {
    var parentList = document.getElementById(lastDeletedListId);

    parentList.insertBefore(
      lastDeletedItem,
      parentList.children[lastDeletedItemIndex] || null
    );
    addEventListenersToListItem(lastDeletedItem, parentList);

    lastDeletedItem = null;
    lastDeletedListId = null;
    lastDeletedItemIndex = null;
  } else {
    alert("No deleted item to restore.");
  }
}

//function to filter tasks
function filterTasks() {
  var input, filter, lists, li, span, txtValue;
  input = document.getElementById("search-box");
  filter = input.value.toUpperCase();
  lists = [
    document.getElementById("high-list"),
    document.getElementById("medium-list"),
    document.getElementById("low-list"),
  ];

  lists.forEach(function (ul) {
    li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
      span = li[i].getElementsByTagName("span")[0];
      txtValue = span.textContent || span.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "flex";
      } else {
        li[i].style.display = "none";
      }
    }
  });
}
