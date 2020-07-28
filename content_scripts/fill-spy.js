(function () {

    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function saveValue(e) {
        let targetElement = e.target;

        let inputSelector = "";

        targetElement.form && (inputSelector = "form");

        targetElement.form && targetElement.form.id && (inputSelector = inputSelector += "#" + targetElement.form.id);

        targetElement.form && targetElement.form.action && (inputSelector += "[action='" + targetElement.form.action + "']");

        inputSelector += " " + targetElement.localName;

        targetElement.id && (inputSelector += "#" + targetElement.id);

        targetElement.name && (inputSelector += "[name='" + targetElement.name + "']");


        //TODO change od static name to dynamic - testSite
        browser.storage.local.get("testSite").then((prevState) => {
            let newState = {
                ...prevState['testSite'],
                [inputSelector]: targetElement.value,
            };
            browser.storage.local.set({testSite: newState});
        });
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "start") {
            document.body.addEventListener("input", saveValue, false);
        } else if (message.command === "stop") {
            document.body.removeEventListener("input", saveValue, false);
        }
    });

})();





