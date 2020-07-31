import Recorder from "../content_scripts/Recorder.js";


function initialize() {
    const stopButton = document.querySelector("#stopRecord");
    const recordButton = document.querySelector("#record");
    const playButton = document.querySelector("#playMacro");
    const selectList = document.getElementById("selectedMacro");
    initMacroList();

    let record = new Recorder();
    record.checkRunStatus().then(status => {
        syncMenu(status);
    });

    recordButton.addEventListener("click", () => {
        record.startRecord();
        syncMenu(true);
    });
    stopButton.addEventListener("click", () => {
        record.stopRecord();
        syncMenu(false);
    });

    playButton.addEventListener("click", () => {
        record.play(selectList.value);
    });

    function initMacroList() {
        browser.storage.local.get().then(macros => {
            for (let macro of Object.keys(macros)) {
                let newOption = document.createElement("option");
                newOption.setAttribute("value", macro);
                newOption.innerText = macro;
                selectList.append(newOption);
            }
        });
    }

    function syncMenu(status) {
        if (status) {
            recordButton.setAttribute("disabled", "1");
            recordButton.innerText = "Recording...";
            stopButton.removeAttribute("disabled");
        } else {
            recordButton.removeAttribute("disabled");
            stopButton.setAttribute("disabled", "1");
            recordButton.innerText = "Record";
        }
    }
}

initialize();






