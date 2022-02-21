
function projectMenuListClick(filter) {
  var projectMenuListHr = document.getElementById('projectMenuListHr');

  if (filter === 'PROPOSAL') {
    projectMenuListHr.style.transform = 'translateX(0%)';
  } else if (filter === 'SUBMITTED') {
    projectMenuListHr.style.transform = 'translateX(100%)';
  } else if (filter === 'ACTIVE') {
    projectMenuListHr.style.transform = 'translateX(200%)';
  } else {
    projectMenuListHr.style.transform = 'translateX(300%)';
  }
}

var btnCreateProject = document.getElementById('btnCreateProject');

btnCreateProject.addEventListener('click', function(e) {
  try {
    window.location.href = "projectdetails.html?id=";
    // var siteURL = localStorage.getItem("siteURL");
    // localStorage.setItem("siteURL", siteURL);
  } catch (err) {
    console.error(err.message);
  }
});
