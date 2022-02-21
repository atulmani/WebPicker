var id = "";
function getSiteURL() {
  var siteURL = window.location.href;
  console.log(siteURL);
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  id = urlParams.get('id')
  console.log(id);
  const color = urlParams.get('color')
  console.log(color);
}

function getParams()
{
  console.log("id=", id);
}

function toggleSwitch(toggleDivId, toggleBtnId){
  toggleDivId.classList.toggle('on');
  if (toggleBtnId.innerHTML === 'toggle_on') {
    toggleBtnId.innerHTML = 'toggle_off';
  }
  else if (toggleBtnId.innerHTML === 'toggle_off') {
    toggleBtnId.innerHTML = 'toggle_on';
  }
}

function projectStateClick(state){
  document.getElementById('PROPOSAL').classList.remove('active');
  document.getElementById('SUBMITTED').classList.remove('active');
  document.getElementById('OPEN').classList.remove('active');
  document.getElementById('CLOSED').classList.remove('active');
  state.classList.add('active');
}
