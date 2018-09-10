
var fileURL;
function isNullOrWhiteSpace(str) {
    return (!str || str.length === 0 || /^\s*$/.test(str))
}
function validation() {
    if (uploadFile.files.length == 0) {
        errorUpload.innerText = "An image is required";
        return false;
    }
    else if (uploadFile.files[0].type != "image/jpeg") {
        errorUpload.innerText = "Only jpeg image can upload";
        return false;
    }
    else if (uploadFile.files[0].size >= 60000) {
        errorUpload.innerText = "File size must be < 6KB";
        return false;
    }
    else {
        return true;
    }
}
function closeModal() {
    modal_container.setAttribute("class", "modal-container-hide");
    clearModalForm();

}
modal_close.onclick = closeModal;

uploadFile.onchange = function () {
    fileURL = URL.createObjectURL(event.target.files[0]);
    if (validation()) {
        document.getElementById("viewImage").style = "display:flex";
        document.getElementById("viewImage").innerHTML = '<img src = "' + fileURL + '"/>' + '<p>' + event.target.files[0].name + '</p>';
    }
}

submitPost.onclick = function () {
    if (validation() && !isNullOrWhiteSpace(postTitle.value)) {
        post_container.innerHTML = ' <div><h1>' + postTitle.value + '</h1>' + '<p>' + description.value + '</p>' + '<img src = "' + fileURL + '"/></div>' + post_container.innerHTML;
        errorTitle.style = "display:block";
        closeModal();
    }
    else if (!validation() && isNullOrWhiteSpace(document.getElementById("postTitle").value)) {
        errorTitle.style = "display:block ; color:red";
        errorUpload.style = "display:block ; color:red";
        errorTitle.innerText = "Title field is required";
    }
    else {
        if (!validation()) {
            errorTitle.style = "display:none";
            errorUpload.style = "display:block ; color:red";
        }
        else {
            errorTitle.style = "display:block ; color:red";
            errorTitle.innerText = "This field is required";
            errorUpload.style = "display:none";
        }
    }
}
create_post.onclick = function () {
    modal_container.setAttribute("class", "modal-container-show")
}
function clearModalForm() {
    postTitle.value = "";
    description.value = "";
    uploadFile.value = "";
    errorTitle.style = "display:none";
    errorUpload.style = "display:none";
    viewImage.style = "display:none";
}