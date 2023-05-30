const openSidebarBtn = document.getElementById("open-sidebar-btn")
const closeSidebarBtn = document.getElementById("close-sidebar-btn")
const sidebar = document.getElementById("sidebar")
const sideBarContent = document.getElementById("sidebar-content")
const dataTableWrap = document.getElementById("data-table-wrap")
const dashboardWrap = document.querySelector(".dashboard")

openSidebarBtn.addEventListener("click", () => {
    dataTableWrap.style.width = '70%'
    dashboardWrap.style.marginLeft = '300px'
    dataTableWrap.style.marginLeft = '350px'

    sideBarContent.classList.remove("hide")
    sidebar.classList.add("open");
    sidebar.classList.remove("closed")
    openSidebarBtn.classList.toggle("hide")
    closeSidebarBtn.classList.toggle("hide")
});
  
closeSidebarBtn.addEventListener("click", () => {
    dashboardWrap.style.marginLeft = '60px'
    dataTableWrap.style.marginLeft = '100px'
    
    sidebar.classList.remove("open");
    sidebar.classList.add("closed")
    openSidebarBtn.classList.toggle("hide")
    closeSidebarBtn.classList.toggle("hide")
    sideBarContent.classList.add("hide")
    dataTableWrap.style.width = '90%'
    
    
});








