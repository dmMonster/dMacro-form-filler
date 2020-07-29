(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    let tmpMacroName;


    function saveValue(e) {
        let targetElement = e.target;

        let inputSelector = "";

        targetElement.form && (inputSelector = "form");

        targetElement.form && targetElement.form.id && (inputSelector = inputSelector += "#" + targetElement.form.id);

        targetElement.form && targetElement.form.action && (inputSelector += "[action='" + targetElement.form.action + "']");

        inputSelector += " " + targetElement.localName;

        targetElement.id && (inputSelector += "#" + targetElement.id);

        targetElement.name && (inputSelector += "[name='" + targetElement.name + "']");


        //TODO change code organizations: save data to tmp, when user click stop -> save to storage
        browser.storage.local.get(tmpMacroName).then((prevState) => {
            console.log(tmpMacroName);
            let newState = {
                ...prevState[tmpMacroName],
                [inputSelector]: targetElement.value,
            };
            browser.storage.local.set({[tmpMacroName]: newState});
        });
    }

    function changeMacroName() {

    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "start") {
            document.body.addEventListener("input", saveValue, false);

            tmpMacroName = Date.now().toString();
            console.log("test name", tmpMacroName);

        } else if (message.command === "stop") {
            document.body.removeEventListener("input", saveValue, false);

            console.log("test name2", tmpMacroName);
        }
    });

})();





