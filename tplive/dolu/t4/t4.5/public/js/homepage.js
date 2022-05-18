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
    document.getElementById('ifSignedIn').innerHTML = 'Hi ' + userProfile.UserName;
    document.getElementById('ifSignedIn').href = "login/profile.html";
    document.getElementById("UserCity").innerHTML = userProfile.City;
  }

}

function getTournamentSummary() {

  var para1 = {};
  para1 = {
    userID: ""
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("getEventSummaryBySport");
  ret1(para1).then(results => {
      console.log("From Function " + results.data.length);
      var sportList = document.getElementById("ddlSports");
      // console.log("From Function " + results.data[0].resultsid);
      for (index = 0; index < results.data.length; index++) {
        if (results.data[index].SportName === "Badminton") {
          document.getElementById("badmintonCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("badmintonCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Table Tennis") {
          document.getElementById("ttCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("ttCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Chess") {
          document.getElementById("chessCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("chessCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Carrom") {
          document.getElementById("carromCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("carromCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Marathon") {
          document.getElementById("marathonCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("marathonCntSmall").innerHTML = results.data[index].EventCount;
        } else if (results.data[index].SportName === "Skating") {
          document.getElementById("skatingCnt").innerHTML = results.data[index].EventCount;
          document.getElementById("skatingCntSmall").innerHTML = results.data[index].EventCount;
        }

      }
    })
    .then(function(rec) {
      var para2 = {};
      para2 = {
        userID: ""
      };
      console.log(para2);
      const ret2 = firebase.functions().httpsCallable("getEventSummaryByCity");
      ret2(para2).then(results => {
          console.log("From Function " + results.data.length);


          var cityList = document.getElementById("genre-location-list");
          // console.log("From Function " + results.data[0].resultsid);
          for (index = 0; index < results.data.length; index++) {
            var div1 = document.createElement("div");
            div1.setAttribute("class", "item");

            var div2 = document.createElement("div");
            div2.setAttribute("class", "genre-locoation-card");

            var h1 = document.createElement("h2");
            h1.innerHTML = results.data[index].City;
            div2.appendChild(h1);

            var h2 = document.createElement("h3");
            h2.innerHTML = results.data[index].EventCount + " Events";
            div2.appendChild(h2);

            div1.appendChild(div2);
            cityList.appendChild(div1);


            $('#genre-location-list').trigger('add.owl.carousel', [div1]).trigger('refresh.owl.carousel');

          }


        })
        .then(rec => {
          getEventList('All');
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
        var indEntry = results1.data.findIndex(e=> e.EventID === results.data[index].Eventid );
        console.log(indEntry);
        if(indEntry >= 0 )
          entryCount = Number(results1.data[indEntry].EntryCount);

        // console.log(results.data[index]);
        RenderEventDetails(index, results.data[index], entryCount);
      }
    });
  });
}


function RenderEventDetails(index, doc, entryCount) {
  // console.log(index, doc);

  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  // amount = amount.toLocaleString('en-IN', curFormat);
  //  var oorderdate = new Date(orderDetails.orderDate.seconds * 1000);
  // orderdate = oorderdate.toLocaleDateString("en-US", options);
  var anchor = document.createElement("a");
  anchor.setAttribute("style", "text-decoration:none;");
  anchor.setAttribute("href", "eventDetails.html?id=" + doc.Eventid);

  var div1 = document.createElement("div");
  div1.setAttribute("class", "item");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "post-slide");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "entries");

  var span1 = document.createElement("span");
  span1.innerHTML = entryCount + " Entries";
  div3.appendChild(span1);

  var hf = document.createElement("input");
  hf.setAttribute("id", "hfEventID" + index);
  hf.setAttribute("type", "hidden");
  hf.setAttribute("value", doc.Eventid);
  div3.appendChild(hf);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "register");

  var btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "mybutton button5");
  btn.setAttribute("name", "Register Now");
  btn.setAttribute("onclick", "onclick(" + "hfEventID" + index + ")");
  btn.innerHTML = "Register Now";

  div4.appendChild(btn);
  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "post-img");

  var img = document.createElement("img");
  img.setAttribute("width", "100%");
  img.setAttribute("alt", "");
  console.log(doc.EventLogo);
  if (doc.EventLogo != "" && doc.EventLogo != undefined && doc.EventLogo != null) {
    img.setAttribute("src", doc.EventLogo);
  } else {
    console.log("/img/e3.png");
    img.setAttribute("src", "/img/e3.png");
  }

  div5.appendChild(img);

  div2.appendChild(div5);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "post-content");

  var h1 = document.createElement("h3");
  h1.setAttribute("class", "post-title");

  var s1 = document.createElement("span");
  s1.innerHTML = doc.EventName;
  h1.appendChild(s1);
  var br1 = document.createElement("br");
  h1.appendChild(br1);

  var span1 = document.createElement("span");
  span1.setAttribute("style", "font-weight: lighter;font-size: 0.7rem;");
  span1.innerHTML = doc.EventOwnerName;
  h1.appendChild(span1);

  div6.appendChild(h1);

  var div7 = document.createElement("div");
  div7.setAttribute("class", "description");

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");

  var span2 = document.createElement("span");
  span2.setAttribute("class", "material-symbols-outlined");
  span2.innerHTML = "assistant_navigation";
  div8.appendChild(span2);

  var small1 = document.createElement("small");
  if (doc.City != "" && doc.City != undefined && doc.City != null) {
    small1.innerHTML = doc.City;
  } else {
    small1.innerHTML = "Bangalore (HC)";
  }
  div8.appendChild(small1);
  div7.appendChild(div8);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "");

  var span3 = document.createElement("span");
  span3.setAttribute("class", "material-symbols-outlined");
  span3.innerHTML = "calendar_month";
  div9.appendChild(span3);

  var stDate = "-";
  var endDate = "-";
  if (doc.EventStartDate != null && doc.EventStartDate != undefined && doc.EventStartDate != "") {
    stDate = new Date(doc.EventStartDate._seconds * 1000);
    stDate = stDate.toLocaleDateString("en-US", options)
  }
  if (doc.EventEndDate != null && doc.EventEndDate != undefined && doc.EventEndDate != "") {
    endDate = new Date(doc.EventEndDate._seconds * 1000);
    endDate = endDate.toLocaleDateString("en-US", options)
  }
  var small2 = document.createElement("small");
  if (stDate != endDate) {
    small2.innerHTML = stDate + " - " + endDate;
  } else {
    small2.innerHTML = stDate;

  }
  div9.appendChild(small2);

  div7.appendChild(div9);

  var div10 = document.createElement("div");
  div10.setAttribute("class", "");

  var small3 = document.createElement("small");

  var strong = document.createElement("strong");
  if (doc.MinimumFee != null && doc.MinimumFee != undefined && doc.MinimumFee != "") {
    if (doc.MinimumFee != doc.MaximumFee) {
      strong.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat) + " - " + doc.MaximumFee.toLocaleString('en-IN', curFormat);
    } else {
      strong.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat);
    }
  } else {
    strong.innerHTML = "-";
  }
  small3.appendChild(strong);
  div10.appendChild(small3);
  div7.appendChild(div10);
  div6.appendChild(div7);
  div2.appendChild(div6);
  div1.appendChild(div2);
  anchor.appendChild(div1);
  //document.getElementById("event-list").appendChild(div1);

  $('#event-list').trigger('add.owl.carousel', [anchor]).trigger('refresh.owl.carousel');

}

function getTournamentSummaryByCity() {

}
//
// function GetProfileDataOld()
// {
//
//     var para1 = {};
//     para1 = {
//       userID: loggedinUser.uid
//     };
//     console.log(para1);
//       const ret1 = firebase.functions().httpsCallable("getProfileDetails");
//       ret1(para1).then((result) => {
//         var record1 = result.data;
//         console.log(result.data);
//         document.getElementById('ifSignedIn').innerHTML = 'Hi '+ result.data.UserName;
//         document.getElementById('ifSignedIn').href = "login/profile.html";
//         document.getElementById("UserCity").innerHTML = result.data.City;
//       });
//
// }

// function GetProfileDataOld() {
//
//   const snapshot = db.collection('UserList').doc(loggedinUser.uid);
//   snapshot.get().then(async (doc) => {
//     if (doc.exists) {
//       console.log(doc.data());
//       document.getElementById('ifSignedIn').innerHTML = 'Hi '+ doc.data().UserName;
//       document.getElementById('ifSignedIn').href = "login/profile.html";
//       document.getElementById("UserCity").innerHTML = doc.data().City;
//
//       // document.getElementById('uploadFile').value = selected_value;
//     }
//   });
// }


// var profiletag = document.getElementById('profiletag');
function profileDirection(profiletag) {
  // console.log(loggedinUser.uid);
  if (loggedinUser === null || loggedinUser === '') {
    window.location.href = "./login/index.html";
  } else {
    window.location.href = "./login/profile.html";
  }
  // auth.onAuthStateChanged(firebaseUser => {
  //   try {
  //     if (firebaseUser) {
  //       loggedinUser = firebaseUser;
  //       console.log('Logged-in user email id: ' + firebaseUser.email);
  //       // userID = firebaseUser.uid;
  //       // GetUserRole(firebaseUser);
  //
  //       document.getElementById('ifSignedIn').innerHTML = 'Hi Sanidhya'
  //     } else {
  //       loggedinUser = null;
  //       console.log('User has been logged out');
  //
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     //window.location.href = "../index.html";
  //   }
  // });
}
