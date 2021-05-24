const {PythonShell} = require('python-shell')
const path = require("path")

var bleep = new Audio();
bleep.src = "../../assets/click sound.mp3";

const renameButon = document.getElementById("rename-button");

renameButon.addEventListener('click', () => {
    let loader = document.getElementById("loader");
    loader.classList.replace("hidden", "visible");
    try {
        PythonShell.run("/home/eclipsu/Documents/WorkSpace/pariwartan/src/BackEnd/app.py", null, (err, respnse_message) => {
            if (err) {
                alert(`${err}`);
                loader.classList.replace("visible", "hidden");

            }
            else {

                alert(respnse_message)
                loader.classList.replace("visible", "hidden")
               
            }
        })
    }
    catch(err) {
        alert(`${err}`);
    }

})
