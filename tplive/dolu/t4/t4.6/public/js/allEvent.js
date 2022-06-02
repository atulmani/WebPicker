const sliderValue = document.getElementById('sliderValue');
const inputSlider = document.getElementById('inputSlider');
const rightValue = document.getElementById('rightValue');

var currentYear = new Date().getFullYear();

rightValue.textContent = currentYear;
inputSlider.max = currentYear;
inputSlider.value = currentYear;
sliderValue.textContent = currentYear;


inputSlider.oninput = (() => {

  let value = inputSlider.value;
  let maxValue = inputSlider.max;
  let minValue = inputSlider.min;
  let difference = maxValue - minValue;
  sliderValue.textContent = value;
  sliderValue.style.left = ((value-minValue)*100/difference) + '%';
  sliderValue.classList.add('show');
});

inputSlider.onblur = (() => {
  sliderValue.classList.remove('show');
});
