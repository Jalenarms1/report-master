const openSidebarBtn = document.getElementById("open-sidebar-btn")
const closeSidebarBtn = document.getElementById("close-sidebar-btn")
const sidebar = document.getElementById("sidebar")
const sideBarContent = document.getElementById("sidebar-content")
const dataTableWrap = document.getElementById("data-table-wrap")
const dashboardWrap = document.querySelector(".dashboard")

openSidebarBtn.addEventListener("click", () => {
    
    sidebar.style.width = '20%'
    dashboardWrap.style.width = '80%'
    

    
    openSidebarBtn.classList.toggle("hide")
    closeSidebarBtn.classList.toggle("hide")
    
    sideBarContent.classList.remove("hide")
});
  
closeSidebarBtn.addEventListener("click", () => {
    dashboardWrap.style.width = '97%'
    sidebar.style.width = '3%'
    
    
    openSidebarBtn.classList.toggle("hide")
    closeSidebarBtn.classList.toggle("hide")
    sideBarContent.classList.add("hide")
    
    
});








