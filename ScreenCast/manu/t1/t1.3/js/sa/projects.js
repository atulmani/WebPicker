

function projectMenuListClick(filter){
  var projectMenuListHr = document.getElementById('projectMenuListHr');

  if(filter === 'Active') {
    projectMenuListHr.style.transform = 'translateX(0%)';
  } else if (filter === 'Pending') {
    projectMenuListHr.style.transform = 'translateX(100%)';
  } else {
    projectMenuListHr.style.transform = 'translateX(200%)';
  }
}
