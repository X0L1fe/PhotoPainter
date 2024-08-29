document.addEventListener("DOMContentLoaded", function() {
    const imgs = document.querySelectorAll('.img');
    const fullscreenButtons = document.querySelectorAll('.fullscreen-button');
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-image");
    const closeBtn = document.getElementsByClassName("close")[0];
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentImageIndex = 0;

    function toggleModal(imgSrc) {
        modalImg.src = imgSrc;
        modal.style.display = "block";
    }

    function navigate(direction) {
        if (direction === 'prev') {
            currentImageIndex = (currentImageIndex - 1 + imgs.length) % imgs.length;
        } else if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % imgs.length;
        }
        const imgSrc = imgs[currentImageIndex].querySelector('img').src;
        modalImg.src = imgSrc;
    }

    fullscreenButtons.forEach(button => {
        button.addEventListener('click', () => {
            const imgSrc = button.closest('.img').querySelector('img').src;
            currentImageIndex = Array.from(imgs).indexOf(button.closest('.img'));
            toggleModal(imgSrc);
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    prevButton.addEventListener('click', () => navigate('prev'));
    nextButton.addEventListener('click', () => navigate('next'));

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    function showButtons() {
        document.querySelector('.download-button').style.display = "block";
        document.querySelector('.delete-button').style.display = "block";
        const buttons = document.querySelectorAll('.modal-image-buttons');
        buttons.forEach(button => {
            button.style.display = 'block';
        });
        }
        
    

    function hideButtons() {
        const buttons = document.querySelectorAll('.modal-image-buttons');
        buttons.forEach(button => {
            button.style.display = 'none';
        });
    }
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', () => {
            const imgSrc = button.closest('.img').querySelector('img').src;
            currentImageIndex = Array.from(imgs).indexOf(button.closest('.img'));
            toggleModal(imgSrc);
            showButtons(); // Показываем кнопки при открытии модального окна
        });
    })
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
        hideButtons(); // Скрываем кнопки при закрытии модального окна
    };
    // Функция для обработки нажатия клавиш
    function handleKeyPress(event) {
        if (modal.style.display === "block") { // Проверяем, открыто ли модальное окно
            if (event.key === 'ArrowLeft') {
                navigate('prev');
            } else if (event.key === 'ArrowRight') {
                navigate('next');
            }
        }
    }
    document.addEventListener('keydown', handleKeyPress);
});
