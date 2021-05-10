class Video {
    $video;
    $loader;
    constructor() {
        this.$video = document.querySelector("#preview video");
        this.$loader = document.querySelector("#loader");
    }

    timeupdate(iFrom, Utils) {
        const currentTime = this.$video.currentTime;

        iFrom.value = Utils.secondsToClockTime(currentTime);
    }

    loadeddata(iTo, Utils) {
        iTo.value = Utils.secondsToClockTime(this.$video.duration);
        this.$video.currentTime = 0;
        this.$loader.style.display = "none";
    }
}

export default new Video();
