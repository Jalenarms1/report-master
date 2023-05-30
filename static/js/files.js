const reportList = document.querySelector(".report-list")
const fileInputBtn = document.getElementById('file-input-btn');
const inputFile = document.getElementById('file-input');
const confirmFileModal = document.getElementById("confirm-file-modal")
const closeConfirmFileModal = document.getElementById("file-confirm-close")
const newFileName = document.getElementById("new-file-name")
const fileConfirmedBtn = document.getElementById("file-confirmed")


class Filer {
    constructor() {
        this.myFiles = undefined
        this.currFile = undefined
    }

    logFileData() {
        console.log(this.myFiles)
        console.log("current file", this.currFile)
    }

    setFiles(fileData) {
        this.myFiles = fileData
    }

    setCurrFile(id) {
        this.currFile =  this.myFiles.find(i => i.file_id == id)
    }

    async get_my_files() {
        const resp = await fetch("/my-files", {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const data = await resp.json()
    
        return data
    }

    generateFileList() {
        reportList.innerHTML = ''
        this.myFiles.forEach(item => {
            const li = document.createElement("li")
            li.classList.add("report-list-item")
            li.id = item.file_id
            const span = document.createElement("span")
            span.innerText = item.file_name
            li.append(span)
            const iconDiv = document.createElement("div")
            iconDiv.classList.add("file-action-icons")
            const i = document.createElement("i")
            i.classList.add(...['material-icons', 'cst-icon', 'settings-icon'])
            i.id = item.file_id
            i.setAttribute("title", 'report settings')
            i.innerText = 'settings'
            iconDiv.append(i)
            li.append(iconDiv)
            reportList.append(li)
        })
    }

    async saveFile() {
        
        const file = inputFile.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
        
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);
            xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) { // Ready state 4 means the request is complete
                if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText); 
                console.log(response); 
                } else {
                console.error('Error uploading file');
                }
            }
            };
            xhr.send(formData);
        }
    
        const updatedData = await this.get_my_files()

        this.myFiles = [...updatedData]

        this.generateFileList()
        
    }

    
}

const files = new Filer()

const closeModal = (node) => {
    node.classList.remove("show")

}

inputFile.addEventListener('change', () => {
    console.log(inputFile.files[0]);
    if(inputFile.files[0]) {
        newFileName.innerText = inputFile.files[0].name
        confirmFileModal.classList.add("show")

    }
});

closeConfirmFileModal.addEventListener("click", () => {
    closeModal(confirmFileModal)
})

fileConfirmedBtn.addEventListener("click", () => {
    files.saveFile()
    closeModal(confirmFileModal)
})

fileInputBtn.addEventListener('click', () => {
    inputFile.click();
});

reportList.addEventListener("click", () => {

})


const onInit = async () => {
    const fileData = await files.get_my_files()
    files.setFiles(fileData)
    files.logFileData()
    files.generateFileList()
}

onInit()






