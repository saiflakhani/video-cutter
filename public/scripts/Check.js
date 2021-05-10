class Check {
    errorOnTruncate(errorMsg) {
        if(location.search.indexOf("?") !== 0 || !location.search) {
            return false;
        }
        alert("Error cutting or uploading the video. Try again!");
        errorMsg.innerText = "Error Cutting or Uploading the video. Try again!";
        return true;
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
