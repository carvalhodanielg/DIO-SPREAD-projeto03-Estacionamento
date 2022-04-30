const button = document.querySelector<HTMLInputElement>("#button")
const input = document.querySelector<HTMLInputElement>("#input")
const item = document.querySelector<HTMLInputElement>("#list")


button?.addEventListener('click', ()=>{
    const task = input?.value;

    const listItem = document.createElement("li")


    listItem.innerHTML = `- ${task}`;

    item?.appendChild(listItem)


})


