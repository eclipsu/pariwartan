const {PythonShell} = require('python-shell')
const path = require("path")
const Swal = require('sweetalert2')


var bleep = new Audio();
bleep.src = "../../assets/click sound.mp3";

const renameButon = document.getElementById("rename-button");

renameButon.addEventListener('click', () => {   
    let loader = document.getElementById("loader");
    loader.classList.replace("hidden", "visible");
    try {
        PythonShell.run("/home/eclipsu/Documents/WorkSpace/pariwartan/src/BackEnd/app.py", null, (err, respnse_message) => {
            if (err) {
                Swal.fire({
                    title: `${err}`,
                    showConfirmButton: true,
                    width: '850px',
                    height: '750px',
                    timer: 1000
                 });
                loader.classList.replace("visible", "hidden");

            }
            else {

                Swal.fire({
                    title: `${respnse_message}`,
                    customClass: 'swal-wide',
                    showConfirmButton: true,
                    width: '850px',
                    height: '750px',
                    timer: 1000
                 });
                loader.classList.replace("visible", "hidden")
               
            }
        })
    }
    catch(err) {
        Swal.fire({
            title: `${err}`,
            showConfirmButton: true,
            width: '850px',
            height: '750px',
            timer: 1000
         });
    }

})
