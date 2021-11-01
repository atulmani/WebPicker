const plus = document.getElementById('plus');

var step = Number(document.getElementById('step').value);

plus.addEventListener('click', incrementQty, false);

function incrementQty() {
  var qty = Number(document.getElementById('qty').value);

  var max = Number(document.getElementById('max').value);

  if ((qty + step) <= max) {
    qty = Number(qty) + Number(step);
  } else {
    qty = max;
  }

  document.getElementById('qty').value = qty;

}

const minus = document.getElementById('minus');

minus.addEventListener('click', decrementQty, false);

function decrementQty() {
  var qty = Number(document.getElementById('qty').value);

  var min = Number(document.getElementById('min').value);

  if ((qty - step) >= min) {
    qty = qty - step;
  } else {
    qty = min;
  }

  document.getElementById('qty').value = qty;

}
