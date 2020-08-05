export default class Recorder {
    constructor() {
        browser.tabs.executeScript({
            file: "/content_scripts/fill-spy.js",
            allFrames: false
        });
    }

    async checkRunStatus() {
        let activeTab = await browser.tabs.query({active: true, currentWindow: true});
        let response = await browser.tabs.sendMessage(activeTab[0].id, {
            command: "status",
        });
        return response.response;
    }

    startRecord() {
        browser.tabs.query({active: true, currentWindow: true}).then((at) => {
            browser.tabs.sendMessage(at[0].id, {
                command: "start",
            });
        });
    }

    stopRecord() {
        browser.tabs.query({active: true, currentWindow: true}).then((at) => {
            browser.tabs.sendMessage(at[0].id, {
                command: "stop",
            });
        });
    }

    play(macroName) {
        browser.tabs.executeScript({
            file: "/content_scripts/macro-player.js",
            allFrames: false
        });

        browser.tabs.query({active: true, currentWindow: true}).then((at) => {
            browser.tabs.sendMessage(at[0].id, {
                command: "play",
                name: macroName,
            });
        });
    }

    delete(macroName) {
        confirm("Deleting macro: " + macroName + ". Are you sure?");
        return browser.storage.local.remove(macroName);
    }
}