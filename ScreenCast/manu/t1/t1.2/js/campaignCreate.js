
var Form1 = document.getElementById("MultiStepForm1");
var Form2 = document.getElementById("MultiStepForm2");
var Form3 = document.getElementById("MultiStepForm3");
var Form4 = document.getElementById("MultiStepForm4");

const btnNext1 = document.getElementById('btnNext1');
const btnPrev1 = document.getElementById('btnPrev1');
const ProgressBarName = document.getElementById('ProgressBarName');
const ProgressBarName1 = document.getElementById('ProgressBarName1');
const ProgressBarNameCheck = document.getElementById('ProgressBarNameCheck');
const ProgressBarName1div = document.getElementById('ProgressBarName1div');

btnNext1.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page
  Form1.style.left = "-25%";
  Form2.style.left = "-25%";
  ProgressBarName1.style.display = "none";
  ProgressBarNameCheck.style.display = "block";
  ProgressBarName.style.color = "#603F8B";
  ProgressBarName1div.style.border = "2px solid #603F8B";
});

btnPrev1.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page
  Form1.style.left = "-0%";
  Form2.style.left = "-0%";
  ProgressBarName1.style.display = "block";
  ProgressBarNameCheck.style.display = "none";
  ProgressBarName.style.color = "#fff";
  ProgressBarName1div.style.border = "2px solid #fff";
});

const btnNext2 = document.getElementById('btnNext2');
const btnPrev2 = document.getElementById('btnPrev2');
const ProgressBarConatct = document.getElementById('ProgressBarConatct');
const ProgressBarConatct2 = document.getElementById('ProgressBarConatct2');
const ProgressBarConatctCheck = document.getElementById('ProgressBarConatctCheck');
const ProgressBarConatct2div = document.getElementById('ProgressBarConatct2div');

btnNext2.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page
  Form2.style.left = "-50%";
  Form3.style.left = "-50%";
  ProgressBarConatct2.style.display = "none";
  ProgressBarConatctCheck.style.display = "block";
  ProgressBarConatct.style.color = "#603F8B";
  ProgressBarConatct2div.style.border = "2px solid #603F8B";
});

btnPrev2.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page
  Form2.style.left = "-25%";
  Form3.style.left = "-25%";
  ProgressBarConatct2.style.display = "block";
  ProgressBarConatctCheck.style.display = "none";
  ProgressBarConatct.style.color = "#fff";
  ProgressBarConatct2div.style.border = "2px solid #fff";
});

const btnNext3 = document.getElementById('btnNext3');
const btnPrev3 = document.getElementById('btnPrev3');
const ProgressBarBirth = document.getElementById('ProgressBarBirth');
const ProgressBarBirth3 = document.getElementById('ProgressBarBirth3');
const ProgressBarBirthCheck = document.getElementById('ProgressBarBirthCheck');
const ProgressBarBirth3div = document.getElementById('ProgressBarBirth3div');

btnNext3.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page
  Form3.style.left = "-75%";
  Form4.style.left = "-75%";
  ProgressBarBirth3.style.display = "none";
  ProgressBarBirthCheck.style.display = "block";
  ProgressBarBirth.style.color = "#603F8B";
  ProgressBarBirth3div.style.border = "2px solid #603F8B";
});

btnPrev3.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page
  Form3.style.left = "-50%";
  Form4.style.left = "-50%";
  ProgressBarBirth3.style.display = "block";
  ProgressBarBirthCheck.style.display = "none";
  ProgressBarBirth.style.color = "#fff";
  ProgressBarBirth3div.style.border = "2px solid #fff";
});

const submit = document.getElementById('Submit');
const ProgressBarLogin = document.getElementById('ProgressBarLogin');
const ProgressBarLogin4 = document.getElementById('ProgressBarLogin4');
const ProgressBarLoginCheck = document.getElementById('ProgressBarLoginCheck');
const ProgressBarLogin4div = document.getElementById('ProgressBarLogin4div');

submit.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page
  ProgressBarLogin4.style.display = "none";
  ProgressBarLoginCheck.style.display = "block";
  ProgressBarLogin.style.color = "#603F8B";
  ProgressBarLogin4div.style.border = "2px solid #603F8B";
  alert('Your Campaign is Created')
});
