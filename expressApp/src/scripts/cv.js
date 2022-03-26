alert("ok")
async function downLoadCv(){
    await fetch("http://localhost:4000/download")
    .then(response=>response.blob())
    .then(blob=>{
        const file = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = file;
        link.download = 'backgroundportfolio.svg';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(file);
    });
};

const downloadButton=document.getElementsByClassName("download-cv-button")
console.log(downloadButton);
Object.entries(downloadButton).forEach((item) => {
    console.log(item[1]);
    item[1].addEventListener("click",downLoadCv);
});
