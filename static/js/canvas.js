let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let fileInput = document.getElementById("file");
let image;
let cropButton = document.getElementById("crop-button");
let applyCropButton = document.getElementById("apply-crop");

let cropping = false;
let cropStartX, cropStartY, cropWidth, cropHeight;
let currentCrop = null;

fileInput.addEventListener("change", loadImage);

function loadImage() {
    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        image = new Image();
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            currentCrop = null;
            updateImage();
            document.querySelector('.image-editor').style.display = 'block';
            document.querySelector('.reset-button').style.display = 'block';
            document.querySelector('.image-editor').classList.remove('hide');
            document.querySelector('.reset-button').classList.remove('hide');
            document.querySelector('.BODY_1').classList.add('hide');
            document.querySelector('.BODY_2').classList.add('hide');
            document.querySelector('.image-selection').classList.add('hide');
            document.querySelector('.controls').classList.remove('hide');
        }
        image.src = e.target.result;
    }

    reader.readAsDataURL(file);
}

function updateImage() {
    let contrast = document.getElementById('contrast-slider').value;
    document.getElementById('contrast-value').textContent = contrast;
    
    let brightness = document.getElementById('brightness-slider').value;
    document.getElementById('brightness-value').textContent = brightness;
    
    let saturation = document.getElementById('saturation-slider').value;
    document.getElementById('saturation-value').textContent = saturation;
    
    let sharpness = document.getElementById('sharpness-slider').value;
    document.getElementById('sharpness-value').textContent = sharpness;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `contrast(${contrast}) brightness(${brightness}) saturate(${saturation}) blur(${sharpness}px)`;

    if (currentCrop) {
        ctx.drawImage(image, currentCrop.x, currentCrop.y, currentCrop.width, currentCrop.height, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(image, 0, 0);
    }

    ctx.filter = 'none';
}

function resetForms() {
    document.getElementById("file").value = "";
    document.getElementById("contrast-slider").value = 1;
    document.getElementById("brightness-slider").value = 1;
    document.getElementById("saturation-slider").value = 1;
    document.getElementById("sharpness-slider").value = 0;

    location.reload();
}

document.querySelector('form').addEventListener('reset', function() {
    document.querySelector('.file').value = '';
    document.querySelector('.image-editor').style.display = 'none';
});

cropButton.addEventListener("click", (e) => {
    e.preventDefault();
    startCrop();
});

applyCropButton.addEventListener("click", (e) => {
    e.preventDefault();
    applyCrop();
});

function startCrop() {
    cropping = true;
    canvas.style.cursor = "crosshair";

    canvas.onmousedown = (e) => {
        if (!cropping) return;
        const rect = canvas.getBoundingClientRect();
        cropStartX = e.clientX - rect.left;
        cropStartY = e.clientY - rect.top;
        cropWidth = 0;
        cropHeight = 0;
    };

    canvas.onmousemove = (e) => {
        if (!cropping) return;
        const rect = canvas.getBoundingClientRect();
        cropWidth = (e.clientX - rect.left) - cropStartX;
        cropHeight = (e.clientY - rect.top) - cropStartY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(cropStartX, cropStartY, cropWidth, cropHeight);
    };

    canvas.onmouseup = () => {
        cropping = false;
        canvas.style.cursor = "default";
    };
}

function applyCrop() {
    if (!cropWidth || !cropHeight) return;

    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");

    cropCanvas.width = cropWidth;
    cropCanvas.height = cropHeight;

    cropCtx.drawImage(canvas, cropStartX, cropStartY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    image.src = cropCanvas.toDataURL();
    image.onload = function () {
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
    };

    currentCrop = {
        x: 0,
        y: 0,
        width: cropWidth,
        height: cropHeight
    };
}
