const {PythonShell} = require('python-shell')

var bleep = new Audio();
bleep.src = "../../assets/click sound.mp3";

const renameButon = document.getElementById("rename-button");

renameButon.addEventListener('click', () => {

    let loader = document.getElementById("loader");
    try {
        PythonShell.run("app.py", null, (err) => {
            loader.classList.replace("hidden", "visible");
            if (err) {
                alert(`${err}`);
            }
            else {
                loader.classList.replace("hidden", "visible");
            }
        })
    }
    catch(err) {
        alert(`${err}`);
    }

})
