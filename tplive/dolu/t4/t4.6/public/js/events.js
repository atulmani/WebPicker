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

var loggedinUser = "";
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      console.log('Logged-in user email id: ' + firebaseUser.email);
      // userID = firebaseUser.uid;
      // GetUserRole(firebaseUser);
      GetProfileData();
      //document.getElementById('ifSignedIn').innerHTML = 'Hi Sanidhya';
    } else {
      loggedinUser = null;
      console.log('User has been logged out');
    }
    getTournamentSummary();

  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData() {
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (userProfile != undefined && userProfile != "" && userProfile != null) {
    document.getElementById('profileName').innerHTML = userProfile.UserName;
    var matches = userProfile.UserName.match(/\b(\w)/g);
    var acronym = matches.join('');
    document.getElementById('profileshortName').innerHTML = acronym;

  }

}



function getTournamentSummary() {

  // var para1 = {};
  // para1 = {
  //   userID: ""
  // };
  // console.log(para1);
  // const ret1 = firebase.functions().httpsCallable("/getEventSummaryBySport");
  // console.log("before call");
  // ret1(para1).then(results => {
  //     console.log("From Function " + results.data.length);
  //     var sportList = document.getElementById("ddlSports");
  //     // console.log("From Function " + results.data[0].resultsid);
  //     for (index = 0; index < results.data.length; index++) {
  //       if (results.data[index].SportName === "Badminton") {
  //         document.getElementById("badmintonCnt").innerHTML = results.data[index].EventCount;
  //         document.getElementById("badmintonCntSmall").innerHTML = results.data[index].EventCount;
  //       } else if (results.data[index].SportName === "Table Tennis") {
  //         document.getElementById("ttCnt").innerHTML = results.data[index].EventCount;
  //         document.getElementById("ttCntSmall").innerHTML = results.data[index].EventCount;
  //       } else if (results.data[index].SportName === "Chess") {
  //         document.getElementById("chessCnt").innerHTML = results.data[index].EventCount;
  //         document.getElementById("chessCntSmall").innerHTML = results.data[index].EventCount;
  //       } else if (results.data[index].SportName === "Carrom") {
  //         document.getElementById("carromCnt").innerHTML = results.data[index].EventCount;
  //         document.getElementById("carromCntSmall").innerHTML = results.data[index].EventCount;
  //       } else if (results.data[index].SportName === "Marathon") {
  //         document.getElementById("marathonCnt").innerHTML = results.data[index].EventCount;
  //         document.getElementById("marathonCntSmall").innerHTML = results.data[index].EventCount;
  //       } else if (results.data[index].SportName === "Skating") {
  //         document.getElementById("skatingCnt").innerHTML = results.data[index].EventCount;
  //         document.getElementById("skatingCntSmall").innerHTML = results.data[index].EventCount;
  //       }
  //
  //     }
  //   })
  //   .then(function(rec) {
  //
      var para2 = {};
      para2 = {
        userID: ""
      };
      console.log(para2);
      const ret2 = firebase.functions().httpsCallable("getEventSummaryByCity");
      ret2(para2).then(results => {
          console.log("From Function " + results.data.length);
          // console.log("From Function " + results.data[0].resultsid);
          for (index = 0; index < results.data.length; index++) {
            console.log(results.data[index].City);
            console.log(results.data[index].EventCount);
            // var div1 = document.createElement("div");
            // div1.setAttribute("class", "item");
            //
            // var div2 = document.createElement("div");
            // div2.setAttribute("class", "genre-locoation-card");
            //
            // var h1 = document.createElement("h2");
            // h1.innerHTML = results.data[index].City;
            // div2.appendChild(h1);
            //
            // var h2 = document.createElement("h3");
            // h2.innerHTML = results.data[index].EventCount + " Events";
            // div2.appendChild(h2);
            //
            // div1.appendChild(div2);
            // cityList.appendChild(div1);

            if (results.data[index].City === "Pune") {
              document.getElementById("puneCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Bangalore") {
              document.getElementById("bangaloreCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Mysore") {
              document.getElementById("mysoreCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Chennai") {
              document.getElementById("chennaiCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Mumbai") {
              document.getElementById("mumbaiCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Hyderabad") {
              document.getElementById("hyderabadCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Delhi") {
              document.getElementById("delhiCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Lucknow") {
              document.getElementById("lucknowCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Jaipur") {
              document.getElementById("jaipurCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Ahemdabad") {
              document.getElementById("ahemdabadCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Chandigarh") {
              document.getElementById("chandigarhCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Kolkata") {
              document.getElementById("kolkataCnt1").innerHTML = results.data[index].EventCount;
            }

            // $('#genre-location-list').trigger('add.owl.carousel', [div1]).trigger('refresh.owl.carousel');

          }


        })
        .then(rec => {
          getEventList('All');
        })
        .catch(err => {
        console.log(err);
        });

}


function getEventList(filter) {
  var para = {};
  // console.log(userid);
  para = {
    organizerID: ""
  };
  console.log(para);
  var ret = "";
  //if (filter === "All") {
  ret = firebase.functions().httpsCallable("getAllEventDetails");

  //}
  ret(para).then(results => {
    console.log("From Function " + results.data.length);

    var para3 = {};
    para3 = {
      EventID: ""
    };
    console.log(para3);
    const ret3 = firebase.functions().httpsCallable("getAllEventEntryCount");
    ret3().then(results1 => {
      console.log("From Function getEventsEntryCount recLength : " + results1.data.length);
      console.log(results1.data);
      // console.log("From Function " + results.data[0].resultsid);
      for (index = 0; index < results.data.length; index++) {
        var entryCount = 0;
        console.log(results.data[index]);
        var indEntry = results1.data.findIndex(e => e.EventID === results.data[index].Eventid);
        console.log(indEntry);
        if (indEntry >= 0)
          entryCount = Number(results1.data[indEntry].EntryCount);

        // console.log(results.data[index]);
        RenderEventDetails(index, results.data[index], entryCount);
      }
    });
  });
}

function RenderEventDetails(index, doc, entryCount) {
  console.log(doc);

  var div0 = document.createElement("div");
  div0.setAttribute("class", "col-lg-3 col-md-6 col-sm-12");

  var div1 = document.createElement("div");
  div1.setAttribute("class", "item");
  div1.setAttribute("style", "margin: 30px 0 100px 0;");

  var anchor = document.createElement("a");
  anchor.setAttribute("href", "https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA");
  anchor.setAttribute("class", "event-card");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "event-card-img");

  var img = document.createElement("img");
  img.setAttribute("alt", "");

  if (doc.EventBannerURL != undefined && doc.EventBannerURL != null && doc.EventBannerURL != "") {
    img.setAttribute("src", doc.EventBannerURL);
  } else {
    if (doc.SportName === 'Badminton') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2FEvent%2Fbadminton.jpg?alt=media&token=11777b62-d45c-45ef-837b-abbafd633c7e");
    } else if (doc.SportName === 'Carrom') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2FEvent%2Fcarrom.jpg?alt=media&token=ca3eac1d-2078-4f4f-b40b-6ef65f111746");
    } else if (doc.SportName === 'Chess') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2FEvent%2Fchess.jpg?alt=media&token=51ac7ea2-5af1-4f3e-8334-0f96a90f0058");
    } else if (doc.SportName === 'Squash') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2FEvent%2Fsquash.jpg?alt=media&token=19f9f32d-b143-4fa4-b6c7-b4afe8ff46f3");
    } else if (doc.SportName === 'Table Tennis') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2FEvent%2Ftabeltennis.jpg?alt=media&token=d7e6b3cb-d873-4de2-be51-2fa9ff250950");
    } else if (doc.SportName === 'Tennis') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2FEvent%2Ftennis.jpg?alt=media&token=9120fa6d-c05a-468c-945f-eb651de8a533");
    } else {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2FEvent%2Fbadminton.jpg?alt=media&token=11777b62-d45c-45ef-837b-abbafd633c7e");
    }
  }
  div2.appendChild(img);

  anchor.appendChild(div2);

  var div3 = document.createElement("div");
  div3.setAttribute("class", "event-card-content");

  var h1 = document.createElement("h1");
  h1.setAttribute("class", "event-name");
  h1.innerHTML = doc.EventName;
  div3.appendChild(h1);

  var h2 = document.createElement("h2");
  h2.setAttribute("class", "event-organiser");
  h2.innerHTML = doc.EventOwnerName;
  div3.appendChild(h2);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "event-schedule-div");

  var div5 = document.createElement("div");
  div5.setAttribute("class", "details");

  var div6 = document.createElement("div");
  div6.setAttribute("class", "");

  var h3 = document.createElement("h3");
  if (doc.City != undefined && doc.City != "" && doc.City != null) {
    h3.innerHTML = doc.City;
  } else {
    h3.innerHTML = "-";
  }
  div6.appendChild(h3);

  var h4 = document.createElement("h4");
  h4.innerHTML = "Location";
  div6.appendChild(h4);
  div5.appendChild(div6);

  var div7 = document.createElement("div");
  div7.setAttribute("class", "");

  var h31 = document.createElement("h3");
  if (doc.EventStartDate != undefined && doc.EventStartDate != "" && doc.EventStartDate != null) {
    h31.innerHTML = doc.EventStartDate;
  } else {
    h31.innerHTML = "-";
  }
  div7.appendChild(h31);

  var h41 = document.createElement("h4");
  h41.innerHTML = "Event Date";
  div7.appendChild(h41);
  div5.appendChild(div7);

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");

  var h32 = document.createElement("h3");
  h32.innerHTML = doc.MinimumFee + " - " + doc.MaximumFee;
  div8.appendChild(h32);

  var h42 = document.createElement("h4");
  h42.innerHTML = "Entry Fee";
  div8.appendChild(h42);

  div5.appendChild(div8);
  div4.appendChild(div5);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "row");

  var div10 = document.createElement("div");
  div10.setAttribute("class", "col-5");
  var button1 = document.createElement("button");

  if (doc.RegistrationOpenFlag === 'YES') {
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "btnClickEvent(" + doc.SportName + "," + doc.EventCode + ")");
    button1.setAttribute("class", "mybutton button5 event-card-button");
    button1.setAttribute("style", "background: linear-gradient(to right,#ff5f95, #e62525);");
    button1.setAttribute("name", "button");

    button1.innerHTML = "book";
  } else if (doc.PublishDrawFlag === 'YES') {
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "btnClickEvent(" + doc.SportName + "," + doc.EventCode + ")");
    button1.setAttribute("class", "mybutton button5 event-card-button");
    button1.setAttribute("style", "background: linear-gradient(to right,#73e336,#08bf1a);");
    button1.setAttribute("name", "button");

    button1.innerHTML = "Draw";
  } else {
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "btnClickEvent(" + doc.SportName + "," + doc.EventCode + ")");
    button1.setAttribute("class", "mybutton button5 event-card-button");
    button1.setAttribute("name", "button");
    button1.innerHTML = "Details";
  }

  div10.appendChild(button1);
  div9.appendChild(div10);

  var div11 = document.createElement("div");
  div11.setAttribute("class", "col-7");

  var button2 = document.createElement("button");
  button2.setAttribute("type", "button");
  button2.setAttribute("class", "mybutton button5 event-card-button entries");
  button2.setAttribute("style", "background:none;border: 1px solid #ddd;color:#aaa;");
  button2.setAttribute("name", "button");

  button2.innerHTML = "<img src='https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2Fmultipleuser.png?alt=media&token=61647294-0f92-492a-86cf-0c1cb57cd1ef' alt=''> " + entryCount;
  div11.appendChild(button2);
  div9.appendChild(div11);
  div4.appendChild(div9);
  div3.appendChild(div4);
  anchor.appendChild(div3);
  div1.appendChild(anchor);
  div0.appendChild(div1);
  document.getElementById("eventListDiv").appendChild(div0);
}


function btnClickEvent(SportName, EventCode) {
  var sCode = "";
  if (EventCode != undefined && EventCode != null && EventCode != "") {
    if (SportName === 'Badminton') {
      sCode = 'BD';
    } else if (SportName === 'Table Tennis') {
      sCode = 'TT';
    } else if (SportName === 'Chess') {
      sCode = 'CH';
    } else if (SportName === 'Tennis') {
      sCode = 'TN';
    } else if (SportName === 'Carrom') {
      sCode = 'CA';
    } else if (SportName === 'Marathon') {
      sCode = 'MA';
    } else if (SportName === 'Squash') {
      sCode = 'SQ';
    } else {
      sCode = 'BD';
    }

    window.location.href = "https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx?SCode=" + sCode + "&TCode=" + EventCode;
  } else {
    window.location.href = "https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx?SCode=BD&TCode=TP_BD10187";
  }
}
