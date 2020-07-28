import Recorder from "../content_scripts/Recorder.js";


document.addEventListener("DOMContentLoaded", () => {
    let r = new Recorder();
    const recordButton = document.querySelector("#record");
    recordButton.addEventListener('click', () => {

        //recordButton.setAttribute("disabled", "true");
        r.startRecord();
    });
    const stopButton = document.querySelector("#stopRecord");
    stopButton.addEventListener('click', () => {

        //recordButton.setAttribute("disabled", "true");
        r.stopRecord();
    });
});


