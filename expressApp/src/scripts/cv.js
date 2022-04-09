async function downLoadCv(){
    await fetch(`${localAdress}download`)
    .then(response=>response.blob())
    .then(blob=>{
        const file = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = file;
        link.download = 'Cv-Alexandre-Sage.pdf';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(file);
    });
};
Object.entries(document.getElementsByClassName("download-cv-button")).forEach((item, i) => {
    item[1].addEventListener("click",downLoadCv);
});
