

var acc = document.getElementsByClassName('accordion');
var imgToggle = document.getElementById('imgToggle');
var i;
var len = acc.length;
// alert('Lenth: ' + len );
for(i = 0; i < len; i++){
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if(panel.style.maxHeight){
      panel.style.maxHeight = null;
      imgToggle.src = '../img/plus.png';
    }
    else {
      panel.style.maxHeight = panel.scrollHeight + 1500 + 'px';
      imgToggle.src = '../img/minnus.png';
      // panel.style.transition = 'all 3s linear 0s';
    }
  })
}
