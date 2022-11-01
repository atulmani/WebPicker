
function regProfileToThirdSlide() {
    var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
    var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
    var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

    regProfileFirstSlide.style.transform = 'translateX(-200%)';
    regProfileSecondSlide.style.transform = 'translateX(-200%)';
    regProfileThirdSlide.style.transform = 'translateX(-200%)';

    document.getElementById('firstFormDot').classList.remove('active');
    document.getElementById('SecondFormDot').classList.add('active');
}

function regProfileToSecondSlide() {
    var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
    var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
    var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

    regProfileFirstSlide.style.transform = 'translateX(-100%)';
    regProfileSecondSlide.style.transform = 'translateX(-100%)';
    regProfileThirdSlide.style.transform = 'translateX(-100%)';

    document.getElementById('firstFormDot').classList.add('active');
    document.getElementById('SecondFormDot').classList.remove('active');
}

function regProfileToFirstSlide() {
    var regProfileFirstSlide = document.getElementById('regProfileFirstSlide');
    var regProfileSecondSlide = document.getElementById('regProfileSecondSlide');
    var regProfileThirdSlide = document.getElementById('regProfileThirdSlide');

    regProfileFirstSlide.style.transform = 'translateX(0%)';
    regProfileSecondSlide.style.transform = 'translateX(0%)';
    regProfileThirdSlide.style.transform = 'translateX(0%)';
}

function moveToRegCategory() {
    window.location.href = "regCategory.html";
}