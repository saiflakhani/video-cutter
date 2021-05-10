class Form {
    $form;
    constructor() {
        this.$form = document.getElementById('upload-form');
    }

    checkFS(iFile, errorMsg, limitSize) {
        if (window.FileReader && window.File && window.FileList && window.Blob) {
            if (typeof iFile.files[0] !== "undefined") {
                if (iFile.files[0].size > limitSize) {
                    alert("File size limit exceeded");
                    errorMsg.innerText = 'Oh my god! It\'s so big!';
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
}

export default new Form();