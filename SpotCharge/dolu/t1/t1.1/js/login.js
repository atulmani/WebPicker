
var signInBtn = document.getElementById('signInBtn');
var signUpBtn = document.getElementById('signUpBtn');
var fullFormContainer = document.getElementById('fullFormContainer');

signUpBtn.addEventListener('click', signUpBtnClick, false);

function signUpBtnClick(){
  fullFormContainer.classList.add('sign-up-mode');
};

signInBtn.addEventListener('click', signInBtnClick, false);

function signInBtnClick(){
  fullFormContainer.classList.remove('sign-up-mode');
};
