"use strict";
(function () {
    console.log("player ready");

    function play(macroName) {
        browser.storage.local.get(macroName).then(selectedMacro => {
            for (let selector of Object.keys(selectedMacro[macroName])) {
                const elementToFill = document.querySelector(selector);
                if (["checkbox", "radio"].includes(elementToFill.type) && !!selectedMacro[macroName][selector]) {
                    elementToFill.checked = true;
                }
                elementToFill.value = selectedMacro[macroName][selector];
            }
        });
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "play") {
            play(message.name);
        }
    });

})();





