class Check {
    errorOnTruncate(errorMsg) {
        const params = new URL(location.href).searchParams;
        const truncated = params.get('truncated');
        const uploaded = params.get('uploaded');
        const prefix = params.get('prefix');
        const case_id = params.get('case_id');
        

        if (truncated === false){
            alert("Error cutting the video. Try again!");
            return true;
        }

        else if (uploaded === false){
            alert("Error uploading the video. Try again!");
            return true;
        }

        if(prefix!=undefined){
            document.getElementById('company').value = prefix;
            // $("#company").attr("disabled", true);
        }
        if(case_id!=undefined){
            document.getElementById('case').value = case_id;
            // $("#case").attr("disabled", true);
        }
        return false;
    }

    successfulOnTruncate(video) {
        if(location.href.includes("/cut/")) {
            const filepath = `/${atob(location.pathname.slice(5))}`;

            video.controls = true;
            video.autoplay = true;
            video.src = filepath;

            return true;
        }
        
        return false;
    }
}

export default new Check();
