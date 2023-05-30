const tblColumns = document.querySelectorAll(".tbl-col");
const table = document.querySelector("#data-table");
const colBtns = document.querySelectorAll(".col-btn");

let resizing = false;
let startX = 0;
let startWidth = 0;
let currentCol = null;

function handleMouseDown(e, col) {
  if (e.target.classList.contains("col-btn")) {
    resizing = false;
    return;
  }

  resizing = true;
  startX = e.pageX;
  startWidth = col.offsetWidth;
  currentCol = col;
}

function handleMouseMove(e) {
  if (!resizing) {
    return;
  }

  const mouseMoved = e.pageX - startX;
  const currentColWidth = startWidth + mouseMoved;
  currentCol.style.width = `${currentColWidth}px`;


}

function handleMouseUp() {
  if (resizing) {
    resizing = false;
    currentCol = null;
  }
}

tblColumns.forEach((col) => {
    col.addEventListener("mousedown", (e) => handleMouseDown(e, col));
    
});

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mouseup", handleMouseUp);



colBtns.forEach((button, i) => {
  button.addEventListener("click", () => {
    console.log(`${i} was clicked`);
  });
});
