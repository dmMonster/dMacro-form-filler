export default class Recorder {
    constructor() {
        browser.tabs.executeScript({
            file: "/content_scripts/fill-spy.js",
            allFrames: false
        });
    }

    test() {
       // this.recordedForm.push('test ' + Date.now());
        //alert('test');
       // return (`console.log(document.getElementsByTagName('input'))`)
}

    startRecord() {
       // alert("ececuted");
        browser.tabs.query({active: true, currentWindow: true}).then((at) => {
            console.log(at);
            browser.tabs.sendMessage(at[0].id, {
                command: "start",
            });
        });
    }

    stopRecord() {
        browser.tabs.query({active: true, currentWindow: true}).then((at) => {
            console.log(at);
              browser.tabs.sendMessage(at[0].id, {
                command: "stop",
              });
        });

       // console.log("ttt", tabs);
      //  browser.tabs.sendMessage(tabs[0].id, {
       //     command: "Test",
      //  });
       // const executing = browser.tabs.executeScript({
         //   code: `console.log('` + JSON.stringify(this.recordedForm) + `');`
       // });
    }
}