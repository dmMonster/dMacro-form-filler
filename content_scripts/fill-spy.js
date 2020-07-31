"use strict";
(function () {
    //prevent multiple script execute
    if (window.ececuted) {
        return;
    }
    window.ececuted = true;
    let running = false;
    let dataToSave = {};

    function saveValue(e) {
        let targetElement = e.target;
        let inputSelector = "";

        targetElement.form && (inputSelector = "form");

        targetElement.form && targetElement.form.id && (inputSelector = inputSelector += "#" + targetElement.form.id);

        targetElement.form && targetElement.form.action && (inputSelector += "[action='" + targetElement.form.action + "']");

        inputSelector += " " + targetElement.localName;

        targetElement.id && (inputSelector += "#" + targetElement.id);

        targetElement.name && (inputSelector += "[name='" + targetElement.name + "']");

        dataToSave = {
            ...dataToSave,
            [inputSelector]: targetElement.value,
        };
    }

    function saveMacro(dataToSave) {
        let macroName = prompt("Enter the macro name", Date.now().toString());

        console.log(dataToSave);

        //TODO check if macro exists
        browser.storage.local.set({[macroName]: dataToSave});
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "start") {
            document.body.addEventListener("input", saveValue, false);
            running = true;
        } else if (message.command === "stop") {
            document.body.removeEventListener("input", saveValue, false);
            saveMacro(dataToSave);
            dataToSave = {};
            running = false;
        } else if(message.command === "status") {
            return Promise.resolve({response: running});
        }
    });

})();





