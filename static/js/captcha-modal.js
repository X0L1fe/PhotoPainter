var modal = document.getElementById("captchaModal");

var span = document.getElementsByClassName("close")[0];

function showCaptchaModal() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

