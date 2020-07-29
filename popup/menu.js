import Recorder from "../content_scripts/Recorder.js";


document.addEventListener("DOMContentLoaded", () => {
    let r = new Recorder();
    const stopButton = document.querySelector("#stopRecord");
    const recordButton = document.querySelector("#record");

    recordButton.addEventListener('click', () => {
       // recordButton.setAttribute("disabled", "1");
      //  recordButton.innerText = "Recording...";
       // stopButton.removeAttribute("disabled");
        r.startRecord();
    });
    stopButton.addEventListener('click', () => {
      //  recordButton.removeAttribute("disabled");
       // stopButton.setAttribute("disabled", "1");
       // recordButton.innerText = "Record";
        r.stopRecord();
    });
});


