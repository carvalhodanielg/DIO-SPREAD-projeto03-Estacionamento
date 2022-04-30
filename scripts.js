"use strict";
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const item = document.querySelector("#list");
button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
    const task = input === null || input === void 0 ? void 0 : input.value;
    const listItem = document.createElement("li");
    listItem.innerHTML = `- ${task}`;
    item === null || item === void 0 ? void 0 : item.appendChild(listItem);
});
//helo
