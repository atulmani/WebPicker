
const inputs = document.querySelectorAll('.input-field');

inputs.forEach(inp => {
  inp.addEventListener('focus', () => {
    inp.classList.add('active');
  });
  inp.addEventListener('blur', () => {
    if (inp.value != '') return;
    inp.classList.remove('active');
  })
});

const toggle_btn = document.querySelectorAll('.toggle');
const fullLoginMain = document.getElementById('fullLoginMain');

toggle_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    fullLoginMain.classList.toggle('sign-up-mode');
  })
});
