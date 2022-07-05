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
  sliderValue.style.left = ((value - minValue) * 100 / difference) + '%';
  sliderValue.classList.add('show');
  console.log(value);
  getEventListForYear(value);
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
      var dt = new Date();
      var year = dt.getFullYear();
      getEventListForYear(year);
      // getEventList('All');
    })
    .catch(err => {
      console.log(err);
    });

}


function getEventListForYear(filter) {
  var para = {};
  // console.log(userid);
  para = {
    year: filter
  };
  console.log(para);
  var ret = "";
  ret = firebase.functions().httpsCallable("getAllEventDetailsForYears");

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
document.getElementById("eventListDiv").innerHTML = "";
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
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var options = {
    // year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  //
  // var refdate = new Date(obj.ReferenceDate._seconds * 1000);
  // var dt =  refdate.toLocaleDateString("en-US", options);
  // var amt = obj.Fees.toLocaleString('en-IN', curFormat);

  var div0 = document.createElement("div");
  div0.setAttribute("class", "col-lg-3 col-md-6 col-sm-12");


  var div1 = document.createElement("div");
  div1.setAttribute("class", "item");
  div1.setAttribute("style", "margin: 30px 0 100px 0;");

  var anchor = document.createElement("a");
  var scode = "";
  if (doc.SportName === 'Badminton') {
    scode = 'BD';
  }  else if(doc.SportName === 'Table Tennis') {
    scode = 'TT';
  } else if (doc.SportName === 'Chess') {
    scode = 'CH';
  } else if (doc.SportName === 'Skating') {
    scode = 'SK';
  } else if (doc.SportName === 'Squash') {
    scode = 'SQ';
  } else if (doc.SportName === 'Marathon') {
    scode = 'MA';
  } else if (doc.SportName === 'Tennis') {
    scode = 'TN';
  } else if (doc.SportName === 'Swimming') {
    scode = 'SW';
  } else {
    scode = 'BD';
  }
  console.log(doc.EventCode);
  console.log(scode);
  if (doc.EventCode != undefined && doc.EventCode != "" && doc.EventCode != null) {
    anchor.setAttribute("href", "https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx??SCode=" + scode + "&TCode=" + doc.EventCode);
  } else {

    anchor.setAttribute("href", "https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA");
  }
  anchor.setAttribute("class", "event-card");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "event-card-img");

  var img = document.createElement("img");
  img.setAttribute("alt", "");

  if (doc.EventLogo != undefined && doc.EventLogo != null && doc.EventLogo != "") {
    img.setAttribute("src", doc.EventLogo);
  } else {
    if (doc.SportName === 'Badminton') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290");
    } else if (doc.SportName === 'Carrom') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fcarrom.webp?alt=media&token=17b1bca8-2dfd-4798-8b4f-7341e8d00656");
    } else if (doc.SportName === 'Chess') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fchess.webp?alt=media&token=52189920-5092-4747-bada-2d6278b10c8e");
    } else if (doc.SportName === 'Squash') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fsquash.webp?alt=media&token=4c021b09-e8b5-462e-a653-0fc5f3387e7d");
    } else if (doc.SportName === 'Table Tennis') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftabletennis.webp?alt=media&token=32d3e0bd-7109-4420-a171-df346b0c37f9");
    } else if (doc.SportName === 'Tennis') {
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftennis.webp?alt=media&token=5ea0dbac-50b2-4e96-a323-47c3ac812c13");
    } else {
      img.setAttribute("src", "https://https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290");
    }
  }
  div2.appendChild(img);

  anchor.appendChild(div2);

  var div3 = document.createElement("div");
  div3.setAttribute("class", "event-card-content");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "event-schedule-div");

  var h1 = document.createElement("h1");
  h1.setAttribute("class", "event-name");
  h1.innerHTML = doc.EventName;
  div4.appendChild(h1);

  var h2 = document.createElement("h2");
  h2.setAttribute("class", "event-organiser");
  h2.innerHTML = doc.EventOwnerName;
  div4.appendChild(h2);

  var div5 = document.createElement("div");
  div5.setAttribute("style", "position: relative;");

  var h11 = document.createElement("h3");
  h11.setAttribute("class", "rating");

  var div6 = document.createElement("div");
  div6.setAttribute("class", "");
  var rating = doc.rating;
  if (rating === undefined || rating === "" || rating === null) {
    rating = 5;
  }
  for (irat = 1; irat <= 5; irat++) {
    var span = document.createElement("span");
    span.setAttribute("class", "material-symbols-outlined");
    if (irat <= rating) {
      span.innerHTML = "star";
    } else {
      span.innerHTML = "grade";
    }
    div6.appendChild(span);
  }
  h11.appendChild(div6);

  var small = document.createElement("small");
  var ratingcnt = doc.ratingCount;
  if (ratingcnt === undefined || ratingcnt === "" || ratingcnt === null) {
    ratingcnt = 100;
  }
  small.innerHTML = ratingcnt;
  h11.appendChild(small);
  div5.appendChild(h11);

  div4.appendChild(div5);

  var div7 = document.createElement("div");
  div7.setAttribute("class", "details");

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");

  var h3 = document.createElement("h3");
  if (doc.City != undefined && doc.City != "" && doc.City != null) {
    h3.innerHTML = doc.City;
  } else {
    h3.innerHTML = "-";
  }
  div8.appendChild(h3);

  var h4 = document.createElement("h4");
  h4.innerHTML = "Location";
  div8.appendChild(h4);
  div7.appendChild(div8);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "");

  var h31 = document.createElement("h3");
  if (doc.EventStartDate != undefined && doc.EventStartDate != "" && doc.EventStartDate != null) {
    var refdate = new Date(doc.EventStartDate._seconds * 1000);
    h31.innerHTML = refdate.toLocaleDateString("en-US", options);;
  } else {
    h31.innerHTML = "-";
  }
  div9.appendChild(h31);

  var h41 = document.createElement("h4");
  h41.innerHTML = "Event Date";
  div9.appendChild(h41);
  div7.appendChild(div9);

  var div10 = document.createElement("div");
  div10.setAttribute("class", "");

  var h32 = document.createElement("h3");
  // obj.Fees.toLocaleString('en-IN', curFormat)
  if (doc.MinimumFee != null && doc.MinimumFee != undefined && doc.MinimumFee != "") {
    if (doc.MaximumFee != null && doc.MaximumFee != undefined && doc.MaximumFee != "") {
      if (doc.MinimumFee != doc.MaximumFee) {
        // h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat) + " - " + doc.MaximumFee.toLocaleString('en-IN', curFormat);
        h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat) ;

      } else {
        h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat);
      }
    } else {
      h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat);
    }
  } else {
    h32.innerHTML = "-";
  }
  div10.appendChild(h32);

  var h42 = document.createElement("h4");
  h42.innerHTML = "Entry Fee";
  div10.appendChild(h42);
  div7.appendChild(div10);
  div4.appendChild(div7);

  var div11 = document.createElement("div");
  div11.setAttribute("class", "row");

  var div12 = document.createElement("div");
  div12.setAttribute("class", "col-5");
  var button1 = document.createElement("button");

  if (doc.PublishDrawFlag === 'YES') {
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "btnClickEvent(" + doc.SportName + "," + doc.EventCode + ")");
    button1.setAttribute("class", "mybutton button5 event-card-button");
    button1.setAttribute("style", "background: linear-gradient(to right,#73e336,#08bf1a);");
    button1.setAttribute("name", "button");

    button1.innerHTML = "Draw";
  } else if (doc.RegistrationOpenFlag === 'YES') {
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "btnClickEvent(" + doc.SportName + "," + doc.EventCode + ")");
    button1.setAttribute("class", "mybutton button5 event-card-button");
    button1.setAttribute("style", "background: linear-gradient(to right,#ff5f95, #e62525);");
    button1.setAttribute("name", "button");

    button1.innerHTML = "book";
  } else {
    button1.setAttribute("type", "button");
    button1.setAttribute("onclick", "btnClickEvent(" + doc.SportName + "," + doc.EventCode + ")");
    button1.setAttribute("class", "mybutton button5 event-card-button");
    button1.setAttribute("name", "button");
    button1.innerHTML = "Details";
  }

  div12.appendChild(button1);
  div11.appendChild(div12);

  var div13 = document.createElement("div");
  div13.setAttribute("class", "col-7");

  var button2 = document.createElement("button");
  button2.setAttribute("type", "button");
  button2.setAttribute("class", "mybutton button5 event-card-button entries");
  button2.setAttribute("style", "background:none;border: 1px solid #ddd;color:#aaa;display:none;");
  button2.setAttribute("name", "button");

  button2.innerHTML = "<img src='https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2Fmultipleuser.png?alt=media&token=61647294-0f92-492a-86cf-0c1cb57cd1ef' alt=''> " + entryCount;
  div13.appendChild(button2);
  div11.appendChild(div13);
  div4.appendChild(div11);
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
    window.location.href = "https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA";
  }
}
