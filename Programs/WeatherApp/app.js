const ft = new Fetch();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const currentVal = search.value;
  try{
  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.UIload(data);
    //call saveToLS
    ui.saveToLS(data);
  });
  } catch(err){
    console.log(err);
  }
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.UIload(dataSaved);
});
