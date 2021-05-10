import Check from './Check.js';
import Video from './Video.js';
import Input from './Input.js';
import Form from './Form.js';
import Utils from './Utils.js';

const A_HUNDRED_MEGA_BYTES = 104857600;

const video = Video.$video;
const iFrom = Input.$iFrom;
const iTo = Input.$iTo;
const iFile = Input.$iFile;
const iSubmit = Input.$iSubmit;
const iUpload = Input.$iUpload;

const errorMsg = document.querySelector('.message');
const form = Form.$form;

function checkFS(e) {
    const canCut = Form.checkFS(iFile, errorMsg, A_HUNDRED_MEGA_BYTES);
    var result = confirm("Are you sure you want to cut this video\nFrom: " + iFrom.value + "\nTo: " + iTo.value);

    if (!canCut && !result) {
        e.preventDefault();
    }
}


function readFile(e) {
    form.removeEventListener('submit', checkFS);
    form.addEventListener('submit', checkFS);
    Input.readFile(e, video, errorMsg, A_HUNDRED_MEGA_BYTES);
}

function formatTime(e) {
    Input.formatTime(e, video, Utils)
}

function uploadData(){
    if (Check.successfulOnTruncate(video)) {
        console.log("VIDEO SRC", video.src);
        var result = confirm("Are you sure you want to upload this video?");
        if(result){
            var filename = video.src.substring(video.src.lastIndexOf('/') + 1);
            var data = {"filename" : filename}
            $.ajax({
                type: "POST",
                url: '/upload',
                data: data,
                success: function(response){
                    console.log("Success");
                    alert("Success!");
                    window.location.href = "/";
                },
                error: function(response){
                    console.log("Error", response);
                }
            });
        }

        // iFile.setAttribute('disabled');
    }
}


window.addEventListener("DOMContentLoaded", () => {
    if (Check.errorOnTruncate(errorMsg)) {
        return;
    }

    if (Check.successfulOnTruncate(video)) {
        Input.insertVideo(video.src);
        iUpload.removeAttribute('disabled');
        // iFile.setAttribute('disabled');
    }
});

$(function () {
    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function (e) {
        if (e.which == 8) { // 8 == backspace
            if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
                e.preventDefault();
            }
        }
    });


});

video.addEventListener('timeupdate', () => Video.timeupdate(iFrom, Utils));
video.addEventListener('loadeddata', () => Video.loadeddata(iTo, Utils));

iFrom.addEventListener("change", formatTime);
iTo.addEventListener("change", formatTime);
iFile.addEventListener('change', readFile);

form.addEventListener('submit', checkFS);
iUpload.addEventListener('click', uploadData)
