function profileSetupToFirstSlide() {
    var profileSetupFirstForm = document.getElementById('profileSetupFirstForm');
    var profileSetupSecondForm = document.getElementById('profileSetupSecondForm');

    profileSetupFirstForm.style.transform = 'translateX(0%)';
    profileSetupSecondForm.style.transform = 'translateX(0%)';

    var profileSetupfirstFormDot = document.getElementById('profileSetupfirstFormDot');
    var profileSetupSecondFormDot = document.getElementById('profileSetupSecondFormDot');

    profileSetupfirstFormDot.classList.add('active');
    profileSetupSecondFormDot.classList.remove('active');

}

function profileSetupToSecondSlide() {
    var profileSetupFirstForm = document.getElementById('profileSetupFirstForm');
    var profileSetupSecondForm = document.getElementById('profileSetupSecondForm');

    profileSetupFirstForm.style.transform = 'translateX(-100%)';
    profileSetupSecondForm.style.transform = 'translateX(-100%)';

    var profileSetupfirstFormDot = document.getElementById('profileSetupfirstFormDot');
    var profileSetupSecondFormDot = document.getElementById('profileSetupSecondFormDot');

    profileSetupfirstFormDot.classList.remove('active');
    profileSetupSecondFormDot.classList.add('active');
}

function profileSetupSave() {
    window.location.href = "/login/participantDashboard.html";
}