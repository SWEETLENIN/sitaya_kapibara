const emulateFileDownload = (fileNameWithExt, blob) => {
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = fileNameWithExt;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export default emulateFileDownload;
