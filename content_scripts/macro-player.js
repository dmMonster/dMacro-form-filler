"use strict";
(function () {
    console.log("player ready");

    function play(macroName) {
        browser.storage.local.get(macroName).then(selectedMacro => {
            for (let selector of Object.keys(selectedMacro[macroName])) {
                document.querySelector(selector).value = selectedMacro[macroName][selector];
            }
        });
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "play") {
            play(message.name);
        }
    });

})();





