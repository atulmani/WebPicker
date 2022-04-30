auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      console.log('Logged-in user email id: ' + firebaseUser.email);
      // userID = firebaseUser.uid;
      // GetUserRole(firebaseUser);
      // window.location.href = "../admin/dashboard.html";
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});


function pofileStep1Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-100%)';
}

function pofileStep2Back(){
  document.getElementById('firstslidepro').style.transform = 'translateX(0%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(0%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(0%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(0%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(0%)';
}

function pofileStep2Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-200%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-200%)';
}

function pofileStep3Back(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-100%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-100%)';
}

function pofileStep3Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-300%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-300%)';
}
function pofileStep4Skip(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-400%)';
}

function pofileStep4Continue(){
  document.getElementById('firstslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('secondslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('thirdslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('forthslidepro').style.transform = 'translateX(-400%)';
  document.getElementById('fifthslidepro').style.transform = 'translateX(-400%)';
}
