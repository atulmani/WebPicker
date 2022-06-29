var loggedinUser = "";
var userLocation = "";
auth.onAuthStateChanged(firebaseUser => {
  try {
    //    var str = "Java-Script-Object-Notation";

    getInstallationPrompt();
    userLocation = localStorage['userLocation'];
    if (firebaseUser) {
      loggedinUser = firebaseUser;
      // console.log('Logged-in user email id: ' + firebaseUser.email);
      // userID = firebaseUser.uid;
      // GetUserRole(firebaseUser);
      GetProfileData()
      .then(function (rec){
          getTournamentSummary();
      });


      //document.getElementById('ifSignedIn').innerHTML = 'Hi Sanidhya';
    } else {
      loggedinUser = null;
      // console.log('User has been logged out');
      getTournamentSummary();
    }


  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

async function GetProfileData() {
  var userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile != undefined && userProfile != "" && userProfile != null) {
    if(userLocation === "")
    {
      userLocation = userProfile.City;
      localStorage['userLocation'] = userLocation;
    }
    document.getElementById('profileName').innerHTML = userProfile.UserName;
    var matches = userProfile.UserName.match(/\b(\w)/g);
    var acronym = matches.join('');
    document.getElementById('profileshortName').innerHTML = acronym;
    // document.getElementById('ifSignedIn').innerHTML = 'Hi ' + userProfile.UserName;
    // document.getElementById('ifSignedIn').href = "login/profile.html";
    // document.getElementById("UserCity").innerHTML = userProfile.City;
  }
  return;
}

function getInstallationPrompt()
{
  // console.log("in getInstallationPrompt");
  if(deferredPrompt){
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult){
      // console.log(choiceResult.outcome);
      if(choiceResult.outcome === "dismissed"){
        // console.log("user cancelled installation");
      }else{
        // console.log("user added to home screen");
      }
    });

    deferredPrompt = null;
  }
}

// function getTournamentSummaryOld() {
//
//   var para1 = {};
//   para1 = {
//     userID: ""
//   };
//   // console.log(para1);
//   const ret1 = firebase.functions().httpsCallable("/getEventSummaryBySport");
//   // console.log("before call");
//   ret1(para1).then(results => {
//       // console.log("From Function " + results.data.length);
//       var sportList = document.getElementById("ddlSports");
//       // console.log("From Function " + results.data[0].resultsid);
//       for (index = 0; index < results.data.length; index++) {
//         if (results.data[index].SportName === "Badminton") {
//           document.getElementById("badmintonCnt").innerHTML = results.data[index].EventCount;
//           document.getElementById("badmintonCntSmall").innerHTML = results.data[index].EventCount;
//         } else if (results.data[index].SportName === "Table Tennis") {
//           document.getElementById("ttCnt").innerHTML = results.data[index].EventCount;
//           document.getElementById("ttCntSmall").innerHTML = results.data[index].EventCount;
//         } else if (results.data[index].SportName === "Chess") {
//           document.getElementById("chessCnt").innerHTML = results.data[index].EventCount;
//           document.getElementById("chessCntSmall").innerHTML = results.data[index].EventCount;
//         } else if (results.data[index].SportName === "Carrom") {
//           document.getElementById("carromCnt").innerHTML = results.data[index].EventCount;
//           document.getElementById("carromCntSmall").innerHTML = results.data[index].EventCount;
//         } else if (results.data[index].SportName === "Marathon") {
//           document.getElementById("marathonCnt").innerHTML = results.data[index].EventCount;
//           document.getElementById("marathonCntSmall").innerHTML = results.data[index].EventCount;
//         } else if (results.data[index].SportName === "Skating") {
//           document.getElementById("skatingCnt").innerHTML = results.data[index].EventCount;
//           document.getElementById("skatingCntSmall").innerHTML = results.data[index].EventCount;
//         }
//
//       }
//     })
//     .then(function(rec) {
//       var para2 = {};
//       para2 = {
//         userID: ""
//       };
//       // console.log(para2);
//       const ret2 = firebase.functions().httpsCallable("getEventSummaryByCity");
//       ret2(para2).then(results => {
//           // console.log("From Function " + results.data.length);
//           // var cityList = document.getElementById("genre-location-list-new");
//           // console.log("From Function " + results.data[0].resultsid);
//           for (index = 0; index < results.data.length; index++) {
//             // console.log(results.data[index].City);
//             // console.log(results.data[index].EventCount);
//             var div1 = document.createElement("div");
//             div1.setAttribute("class", "item");
//
//             var div2 = document.createElement("div");
//             div2.setAttribute("class", "genre-locoation-card");
//
//             var h1 = document.createElement("h2");
//             h1.innerHTML = results.data[index].City;
//             div2.appendChild(h1);
//
//             var h2 = document.createElement("h3");
//             h2.innerHTML = results.data[index].EventCount + " Events";
//             div2.appendChild(h2);
//
//             div1.appendChild(div2);
//             // cityList.appendChild(div1);
//
//             if (results.data[index].City === "Pune") {
//               document.getElementById("puneCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Bangalore") {
//               document.getElementById("bangaloreCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Mysore") {
//               document.getElementById("mysoreCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Chennai") {
//               document.getElementById("chennaiCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Mumbai") {
//               document.getElementById("mumbaiCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Hyderabad") {
//               document.getElementById("hyderabadCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Delhi") {
//               document.getElementById("delhiCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Lucknow") {
//               document.getElementById("lucknowCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Jaipur") {
//               document.getElementById("jaipurCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Ahemdabad") {
//               document.getElementById("ahemdabadCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Chandigarh") {
//               document.getElementById("chandigarhCnt1").innerHTML = results.data[index].EventCount;
//             } else if (results.data[index].City === "Kolkata") {
//               document.getElementById("kolkataCnt1").innerHTML = results.data[index].EventCount;
//             }
//
//             // $('#genre-location-list').trigger('add.owl.carousel', [div1]).trigger('refresh.owl.carousel');
//
//           }
//
//
//         })
//         .then(rec => {
//           getEventList('All');
//         });
//
//     }).
//   catch(err => {
//     console.log(err);
//   });
// }

function getTournamentSummary() {
  getEventList('All');
}

function getEventList(filter) {
  var para = {};
   // console.log(userLocation);
   if(userLocation === undefined || userLocation === "" || userLocation === null){
     userLocation="All";
     document.getElementById('location').innerHTML = "Location";
     document.getElementById('location').innerHTML = "Location";
   }else{
     document.getElementById('location').innerHTML = userLocation;
     document.getElementById('location1').innerHTML = userLocation;
   }
  para = {
    eventStatus: "Active",
    City : userLocation,
  };
   // console.log(para);
  var ret = "";
  //if (filter === "All") {

  // document.getElementById("big").innerHTML="";
  // document.getElementById("thumbs").innerHTML="";

  ret = firebase.functions().httpsCallable("getAllEventWithEventStatusAndLocation");
  // console.log('getAllEventWithEventStatusAndLocation');
  //}
  ret(para).then(results => {
     // console.log("From Function " + results.data.length);

    var para3 = {};
    para3 = {
      EventID: ""
    };
    // console.log(para3);
    const ret3 = firebase.functions().httpsCallable("getAllEventEntryCount");
    ret3().then(results1 => {
      // console.log("From Function getEventsEntryCount recLength : " + results1.data.length);
      // console.log(results1.data);
      // console.log("From Function " + results.data[0].resultsid);
      for (index = 0; index < results.data.length; index++) {
        var entryCount = 0;
         // console.log(results.data[index].EventCode);
        var indEntry = results1.data.findIndex(e => e.EventID === results.data[index].Eventid);
        // console.log(indEntry);
        if (indEntry >= 0)
          entryCount = Number(results1.data[indEntry].EntryCount);

        // console.log(results.data[index]);
        RenderEventDetails(index, results.data[index], entryCount);
      }
      // document.getElementById('loading').style.display = 'none';
    })
    .then(function (res){
        //activate first item of both pard items
        var bigimage = $("#big");
        var thumbs = $("#thumbs");
        var bigList =bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild;
        var bigIndex = 0;
        for (i = 0 ; i<bigList.childNodes.length ; i++)
        {
          if(!bigList.childNodes[i].classList.contains('cloned')){
            bigIndex = i;
            break;
          }
        }
        // console.log(bigIndex);
        bigimage
        .find(".owl-item")
        .removeClass("active")
        .eq(bigIndex)
        .addClass("active");

        thumbs
          .find(".owl-item")
          .removeClass("current")
          .eq(0)
          .addClass("current");

    });
  });
}

function getLocationEvent(location, cnt) {
  // console.log(location);
  // console.log(document.getElementById(cnt).innerHTML);
  if (Number(document.getElementById(cnt).innerHTML) > 0) {
    var para = {};
    // console.log(userid);
    para = {
      City: location
    };
    // console.log(para);
    var ret = "";
    //if (filter === "All") {
    ret = firebase.functions().httpsCallable("getAllEventDetailsByCity");

    //}
    ret(para).then(results => {
      // console.log("From Function " + results.data.length);

      var para3 = {};
      para3 = {
        EventID: ""
      };
      // console.log(para3);
      const ret3 = firebase.functions().httpsCallable("getAllEventEntryCount");
      ret3().then(results1 => {
        // console.log("From Function getEventsEntryCount recLength : " + results1.data.length);
        // console.log(results1.data);
        // console.log("From Function " + results.data[0].resultsid);
        removeallItem();
        for (index = 0; index < results.data.length; index++) {
          var entryCount = 0;
          // console.log(results.data[index]);
          var indEntry = results1.data.findIndex(e => e.EventID === results.data[index].Eventid);
          // console.log(indEntry);
          if (indEntry >= 0)
            entryCount = Number(results1.data[indEntry].EntryCount);

          // console.log(results.data[index]);
          RenderEventDetails(index, results.data[index], entryCount);
        }
      })
      .then(function (res){
        //activate first item of both pard items
        var bigimage = $("#big");
        var thumbs = $("#thumbs");
        var bigList =bigimage.data("owl.carousel").$element.context.firstElementChild.firstChild;
        var bigIndex = 0;
        for (i = 0 ; i<bigList.childNodes.length ; i++)
        {
          if(!bigList.childNodes[i].classList.contains('cloned')){
            bigIndex = i;
            break;
          }
        }
        // console.log(bigIndex);
        bigimage
        .find(".owl-item")
        .removeClass("active")
        .eq(bigIndex)
        .addClass("active");

        thumbs
          .find(".owl-item")
          .removeClass("current")
          .eq(0)
          .addClass("current");

      });
    });
  }
}

function removeallItem() {
  $('#event-list-new').length;
  //   var $carousel = $(".edit-manage-carousel");
  // for (var i =0; i<100; i++) {
  //   $carousel.trigger('remove.owl.carousel', i );
  // }
  // console.log($('#event-list-new').length);
  // document.getElementById("event-list-new").innerHTML="";
  //  var indexToRemove = 1;
  //  $('.event-list-new').owlCarousel('remove', indexToRemove).owlCarousel('update');
}
function cartEventClick(eventcode){
  // console.log(eventcode);
}

function RenderEventDetails(index, doc, entryCount) {
  // console.log(doc);
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var options = {
    year: '2-digit',
    // year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  //Adding item in thumb card item start
  var div11 = document.createElement("div");
  div11.setAttribute("class","item " + doc.EventCode);
  // div11.setAttribute("onclick","cartEventClick('"+doc.EventCode+"')"  );

  var div12 = document.createElement("div");
  div12.setAttribute("class","new-event-card");

  var span11 = document.createElement("span");
  div12.appendChild(span11);

  var span12 = document.createElement("span");
  div12.appendChild(span12);

  var span13 = document.createElement("span");
  div12.appendChild(span13);

  var span14 = document.createElement("span");
  div12.appendChild(span14);
  var imgurl = "";
  var img11 = document.createElement("img");
  img11.setAttribute("alt","");
  if (doc.EventLogo != undefined && doc.EventLogo != null && doc.EventLogo != "") {
    img11.setAttribute("src", doc.EventLogo);
    if(doc.EventBannerLogo != undefined && doc.EventBannerLogo != null && doc.EventBannerLogo != "")
    {
      imgurl = doc.EventBannerLogo;
    }else{
      imgurl = doc.EventLogo;
    }

  } else {
    if (doc.SportName === 'Badminton') {
      sportCode = "BD";
      imgurl = "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290";
      img11.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290");
    } else if (doc.SportName === 'Carrom') {
      sportCode = "CR";
      imgurl = "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fcarrom.webp?alt=media&token=17b1bca8-2dfd-4798-8b4f-7341e8d00656";
      img11.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fcarrom.webp?alt=media&token=17b1bca8-2dfd-4798-8b4f-7341e8d00656");
    } else if (doc.SportName === 'Chess') {
      sportCode = "CH";
      imgurl = "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fchess.webp?alt=media&token=52189920-5092-4747-bada-2d6278b10c8e";
      img11.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fchess.webp?alt=media&token=52189920-5092-4747-bada-2d6278b10c8e");
    } else if (doc.SportName === 'Squash') {
      sportCode = "SQ";
      imgurl = "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fsquash.webp?alt=media&token=4c021b09-e8b5-462e-a653-0fc5f3387e7d";
      img11.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fsquash.webp?alt=media&token=4c021b09-e8b5-462e-a653-0fc5f3387e7d");
    } else if (doc.SportName === 'Table Tennis') {
      sportCode = "TT";
      imgurl = "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftabletennis.webp?alt=media&token=32d3e0bd-7109-4420-a171-df346b0c37f9";
      img11.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftabletennis.webp?alt=media&token=32d3e0bd-7109-4420-a171-df346b0c37f9");
    } else if (doc.SportName === 'Tennis') {
      sportCode = "TN";
      imgurl = "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftennis.webp?alt=media&token=5ea0dbac-50b2-4e96-a323-47c3ac812c13";
      img11.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftennis.webp?alt=media&token=5ea0dbac-50b2-4e96-a323-47c3ac812c13");
    } else {
      sportCode = "BD";
      imgurl = "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290";
      img11.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290");
    }
  }

  div12.appendChild(img11);
  div11.appendChild(div12);

  $('#thumbs').trigger('add.owl.carousel', [div11]).trigger('refresh.owl.carousel');
//Adding item in thumb card item end
//Adding item in banner card item starts
var div1_1 = document.createElement("div");
div1_1.setAttribute("class", "item " + doc.EventCode);

var div1_2 = document.createElement("div");
div1_2.setAttribute("class", "event-display-card" );

var div1_3 = document.createElement("div");
div1_3.setAttribute("class", "row no-gutters" );

var div1_4 = document.createElement("div");
div1_4.setAttribute("class", "col-lg-5 col-md-12 col-sm-12" );

var div1_5 = document.createElement("div");
div1_5.setAttribute("class", "content" );

var h1_1 = document.createElement("h1");
h1_1.innerHTML = doc.EventName;
div1_5.appendChild(h1_1);

var h1_2 = document.createElement("h2");
h1_2.innerHTML = doc.EventOwnerName;
div1_5.appendChild(h1_2);

var div1_6 = document.createElement("div");
div1_6.setAttribute("style", "position: relative;" );

var h1_3 = document.createElement("h3");
h1_3.setAttribute("class", "rating");

var div1_7 = document.createElement("div");
div1_7.setAttribute("class", "");
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
  div1_7.appendChild(span);
}

  var small = document.createElement("small");
  var ratingcnt = doc.ratingCount;
  if (ratingcnt === undefined || ratingcnt === "" || ratingcnt === null) {
    ratingcnt = 100;
  }
  small.innerHTML = ratingcnt;
  div1_7.appendChild(small);
h1_3.appendChild(div1_7);
div1_6.appendChild(h1_3);
div1_5.appendChild(div1_6);

var div1_8 = document.createElement("div");
div1_8.setAttribute("class", "details");

var div1_9 = document.createElement("div");
div1_9.setAttribute("class", "");
// console.log(doc.City);
var h1_3 = document.createElement("h3");
h1_3.innerHTML = doc.City;
div1_9.appendChild(h1_3);

var h1_4 = document.createElement("h4");
h1_4.innerHTML = "Location";
div1_9.appendChild(h1_4);

div1_8.appendChild(div1_9);

var div1_10 = document.createElement("div");
div1_10.setAttribute("class", "");
// console.log(doc.EventStartDate);
var h1_5 = document.createElement("h3");
if (doc.EventStartDate != undefined && doc.EventStartDate != "" && doc.EventStartDate != null) {
  var refdate = new Date(doc.EventStartDate._seconds * 1000);
  h1_5.innerHTML = refdate.toLocaleDateString("en-IN", options);;
} else {
  h1_5.innerHTML = "-";
}
div1_10.appendChild(h1_5);

var h1_6 = document.createElement("h4");
h1_6.innerHTML = "Event Date";
div1_10.appendChild(h1_6);
div1_8.appendChild(div1_10);

var div1_11 = document.createElement("div");
div1_11.setAttribute("class", "");
// console.log(doc.MinimumFee);
var h1_7 = document.createElement("h3");
if (doc.MinimumFee != null && doc.MinimumFee != undefined && doc.MinimumFee != "") {
  if (doc.MaximumFee != null && doc.MaximumFee != undefined && doc.MaximumFee != "") {
    if (doc.MinimumFee != doc.MaximumFee) {
        // console.log(doc.MinimumFee);
      // h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat) + " - " + doc.MaximumFee.toLocaleString('en-IN', curFormat);
      h1_7.innerHTML = Number(doc.MinimumFee).toLocaleString('en-IN', curFormat);
    } else {
      // console.log(doc.MinimumFee);
      h1_7.innerHTML = Number(doc.MinimumFee).toLocaleString('en-IN', curFormat);
    }
  } else {
    // console.log(doc.MinimumFee);
    h1_7.innerHTML = Number(doc.MinimumFee).toLocaleString('en-IN', curFormat);
  }
} else {
  // console.log(doc.MinimumFee);
  h1_7.innerHTML = "-";
}
// console.log(h1_7);
div1_11.appendChild(h1_7);
// console.log(div1_11);
var h1_8 = document.createElement("h4");
h1_8.innerHTML = "Entry Fee";
// console.log(h1_8);
div1_11.appendChild(h1_8);
// console.log(div1_11);
div1_8.appendChild(div1_11);
div1_5.appendChild(div1_8);

var div1_12 = document.createElement("div");
div1_12.setAttribute("class", "button-div");

var button1 = document.createElement("button");
button1.setAttribute("type", "button");
// console.log(doc.EventCode);
button1.setAttribute("onclick", "btnClickEvent('" + doc.SportName + "','" + doc.EventCode + "')");
button1.setAttribute("class", "mybutton button5 event-card-button");
button1.setAttribute("name", "button");

if (doc.PublishDrawFlag === 'YES') {
  button1.setAttribute("style", "background: linear-gradient(to right,#73e336,#08bf1a);");
  button1.innerHTML = "<span>Draw</span>";
} else if (doc.RegistrationOpenFlag === 'YES') {
  button1.setAttribute("style", "background: linear-gradient(to right,#ff5f95, #e62525);");
  button1.innerHTML = "<span>Book</span>";
} else {
  button1.innerHTML = "<span>Details</span>";
}

div1_12.appendChild(button1);
var scode = "";
if (doc.SportName === 'Badminton') {
  scode = 'BD';
} else if (doc.SportName === 'Table Tennis') {
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

var today = new Date();
if(doc.EventStartDate != undefined && doc.EventStartDate != "" && doc.EventStartDate != null &&
  doc.EventEndDate != undefined && doc.EventEndDate != "" && doc.EventEndDate != null  )
if(doc.EventStartDate <= today && doc.EventEndDate >= today ){

  var anchor = document.createElement("a");
  anchor.setAttribute("class","circle blink");
  if (doc.EventCode != undefined && doc.EventCode != "" && doc.EventCode != null) {
    anchor.setAttribute("href", "https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx?SCode=" + scode + "&TCode=" + doc.EventCode);
  } else {

    anchor.setAttribute("href", "https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA");
  }

  var div1_13 = document.createElement("div");
  div1_13.setAttribute("class","");
  anchor.appendChild(div1_13);

  var h1_a = document.createElement("h1");
  h1_a.innerHTML("Live");
  anchor.appendChild(h1_a);

  div1_12.appendChild(anchor);
}

div1_5.appendChild(div1_12);
div1_4.appendChild(div1_5);
div1_3.appendChild(div1_4);

var div1_14 = document.createElement("div");
div1_14.setAttribute("class","col-lg-7 col-md-12 col-sm-12");

var div1_15 = document.createElement("div");
div1_15.setAttribute("class","image");

var img1_2 = document.createElement("img");
img1_2.setAttribute("src",imgurl);
img1_2.setAttribute("width","100%");
img1_2.setAttribute("alt","");
div1_15.appendChild(img1_2);
div1_14.appendChild(div1_15);
div1_3.appendChild(div1_14);

var div1_16 = document.createElement("div");
div1_16.setAttribute("class","col-lg-12 col-md-12 col-sm-12");

var div1_17 = document.createElement("div");
div1_17.setAttribute("class","mobile-content");
var div1_171 = document.createElement("div");
div1_171.setAttribute("class","mobile-content-below-div");
// doc.EventName = doc.EventName.toLowerCase();
// doc.EventName ="ecl puECL PUYVAST - PSM OPEN JUNIOR e BADMINTON TOURNAMENTgggggg ggg ff"
var h1_11 = document.createElement("h1");
if(doc.EventName.length < 70){
  h1_11.innerHTML = doc.EventName;
}else {
  var ename = doc.EventName.substr(0,66);
  ename = ename + " ...";
  h1_11.innerHTML = ename;
}

div1_171.appendChild(h1_11);

var div1_18 = document.createElement("div");
div1_18.setAttribute("class", "button-div");

var button11 = document.createElement("button");
button11.setAttribute("type", "button");
button11.setAttribute("onclick", "btnClickEvent('" + doc.SportName + "','" + doc.EventCode + "')");
button11.setAttribute("class", "mybutton button5 event-card-button");
button11.setAttribute("name", "button");

if (doc.PublishDrawFlag === 'YES') {
  button11.setAttribute("style", "background: linear-gradient(to right,#73e336,#08bf1a);");
  button11.innerHTML = "<span>Draw</span>";
} else if (doc.RegistrationOpenFlag === 'YES') {
  button11.setAttribute("style", "background: linear-gradient(to right,#ff5f95, #e62525);");
  button11.innerHTML = "<span>Book</span>";
} else {
  button11.innerHTML = "<span>Details</span>";
}

div1_18.appendChild(button11);

var div1_19 = document.createElement("div");
div1_19.setAttribute("class", "");
div1_19.setAttribute("style", "display: flex; align-items: center;");

var h1_51 = document.createElement("h5");
h1_51.setAttribute("style","color: #fff; position:relative; top: 5px; left: -0px;padding-right: 10px;")

if (doc.EventStartDate != undefined && doc.EventStartDate != "" && doc.EventStartDate != null) {
  var refdate = new Date(doc.EventStartDate._seconds * 1000);
  h1_51.innerHTML = refdate.toLocaleDateString("en-IN", options);;
} else {
  h1_51.innerHTML = "-";
}
div1_19.appendChild(h1_51);

var span11 = document.createElement("span");
span11.setAttribute("style","color: #fff;position:relative;left: -0px;padding-right: 10px;font-size: 1.3rem;");
span11.innerHTML = '|';
div1_19.appendChild(span11);

var h1_52 = document.createElement("h5");
h1_52.setAttribute("style","color: #fff;position: relative;top: 5px;")
if (doc.MinimumFee != null && doc.MinimumFee != undefined && doc.MinimumFee != "") {
  if (doc.MaximumFee != null && doc.MaximumFee != undefined && doc.MaximumFee != "") {
    if (doc.MinimumFee != doc.MaximumFee) {
      // h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat) + " - " + doc.MaximumFee.toLocaleString('en-IN', curFormat);
      h1_52.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat);
    } else {
      h1_52.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat);
    }
  } else {
    h1_52.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat);
  }
} else {
  h1_52.innerHTML = "-";
}
div1_19.appendChild(h1_52);

div1_18.appendChild(div1_19);
div1_171.appendChild(div1_18);
div1_17.appendChild(div1_171);
div1_16.appendChild(div1_17);
div1_3.appendChild(div1_16);
div1_2.appendChild(div1_3);
div1_1.appendChild(div1_2);
// $('#event-list-new').trigger('add.owl.carousel', [div1]).trigger('refresh.owl.carousel');
$('#big').trigger('add.owl.carousel', [div1_1]).trigger('refresh.owl.carousel');

//Adding item in banner card item end


}


function RenderEventDetailsOld2(index, doc, entryCount) {
  // console.log(doc);
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var options = {
    // year: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  //
  // var refdate = new Date(obj.ReferenceDate._seconds * 1000);
  // var dt =  refdate.toLocaleDateString("en-US", options);
  // var amt = obj.Fees.toLocaleString('en-IN', curFormat);
  var div1 = document.createElement("div");
  div1.setAttribute("class", "item");
  div1.setAttribute("style", "margin: 30px 0 100px 0;");

  var anchor0 = document.createElement("a");
  var anchor = document.createElement("div");
  var scode = "";
  if (doc.SportName === 'Badminton') {
    scode = 'BD';
  } else if (doc.SportName === 'Table Tennis') {
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

  // console.log(doc.EventCode);
  // console.log(scode);
  if (doc.EventCode != undefined && doc.EventCode != "" && doc.EventCode != null) {
    anchor0.setAttribute("href", "https://tournamentplanner.in/screens/TPLive_TournamentDetails.aspx?SCode=" + scode + "&TCode=" + doc.EventCode);
  } else {

    anchor0.setAttribute("href", "https://tournamentplanner.in/screens/TPLive_TournamentList.aspx?tstatus=upcoming&ocode=QQBDAFQASQBWAEUA");
  }
  anchor.setAttribute("class", "event-card");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "event-card-img");
  var sportCode = "";
  var img = document.createElement("img");
  img.setAttribute("alt", "");
  // console.log(doc.EventLogo);
  if (doc.EventLogo != undefined && doc.EventLogo != null && doc.EventLogo != "") {
    img.setAttribute("src", doc.EventLogo);
  } else {
    if (doc.SportName === 'Badminton') {
      sportCode = "BD";
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290");
    } else if (doc.SportName === 'Carrom') {
      sportCode = "CR";
      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fcarrom.webp?alt=media&token=17b1bca8-2dfd-4798-8b4f-7341e8d00656");
    } else if (doc.SportName === 'Chess') {
      sportCode = "CH";

      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fchess.webp?alt=media&token=52189920-5092-4747-bada-2d6278b10c8e");
    } else if (doc.SportName === 'Squash') {
      sportCode = "SQ";

      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fsquash.webp?alt=media&token=4c021b09-e8b5-462e-a653-0fc5f3387e7d");
    } else if (doc.SportName === 'Table Tennis') {
      sportCode = "TT";

      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftabletennis.webp?alt=media&token=32d3e0bd-7109-4420-a171-df346b0c37f9");
    } else if (doc.SportName === 'Tennis') {
      sportCode = "TN";

      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Ftennis.webp?alt=media&token=5ea0dbac-50b2-4e96-a323-47c3ac812c13");
    } else {
      sportCode = "BD";

      img.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/tpliveapp.appspot.com/o/img%2Fevent%2Fbadminton.webp?alt=media&token=dc3c7662-a53f-4dad-9a40-b2d782fef290");
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
    // h31.innerHTML = refdate.toLocaleDateString("en-US", options);;
    h31.innerHTML = refdate.toLocaleDateString("en-IN", options);;
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
        h32.innerHTML = doc.MinimumFee.toLocaleString('en-IN', curFormat);
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
  button1.setAttribute("type", "button");
  button1.setAttribute("onclick", "btnClickEvent('" + doc.SportName + "','" + doc.EventCode + "')");
  button1.setAttribute("class", "mybutton button5 event-card-button");

  if (doc.PublishDrawFlag === 'YES') {
    button1.setAttribute("style", "background: linear-gradient(to right,#73e336,#08bf1a);");
    button1.setAttribute("name", "button");

    button1.innerHTML = "Draw";
  } else if (doc.RegistrationOpenFlag === 'YES') {
    button1.setAttribute("style", "background: linear-gradient(to right,#ff5f95, #e62525);");
    button1.setAttribute("name", "button");

    button1.innerHTML = "book";
  } else {
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
  button2.setAttribute("style", "background:none;border: 1px solid #ddd;color:#aaa;display:none; ");
  button2.setAttribute("name", "button");

  button2.innerHTML = "<img src='https://firebasestorage.googleapis.com/v0/b/tplive-uat-f9355.appspot.com/o/img%2Fmultipleuser.png?alt=media&token=61647294-0f92-492a-86cf-0c1cb57cd1ef' alt=''> " + entryCount;
  div13.appendChild(button2);
  div11.appendChild(div13);
  div4.appendChild(div11);
  div3.appendChild(div4);
  anchor.appendChild(div3);
  // anchor0.appendChild(anchor);
  div1.appendChild(anchor);
  $('#event-list-new').trigger('add.owl.carousel', [div1]).trigger('refresh.owl.carousel');

}

function btnClickEvent(SportName, EventCode) {
  var sCode = "";
  // console.log("in btnClickEvent");
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

function RenderEventDetailsOld(index, doc, entryCount) {
  // console.log('hi');

  // var options = {
  //   year: 'numeric',
  //   month: 'short',
  //   day: 'numeric'
  // };
  //
  // var curFormat = {
  //   style: 'currency',
  //   currency: 'INR',
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 2
  // };

  // var divItem = document.createElement('div');
  // divItem.setAttribute('class', 'item');
  // divItem.setAttribute('style', 'margin: 100px 0 30px 0;background:red');

  // var anchor = document.createElement('a');
  // anchor.setAttribute('href', 'eventDetails.html?id=' + doc.Eventid);
  // anchor.setAttribute('class', 'event-card');
  // divItem.appendChild(anchor);

  // var divEventCardImg = document.createElement('div');
  // divEventCardImg.setAttribute('class', 'event-card-img');
  // anchor.appendChild(divEventCardImg);

  // $('#event-list-new').trigger('add.owl.carousel', [divItem]).trigger('refresh.owl.carousel');
}


function RenderEventDetailsOld1(index, doc, entryCount) {
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
  // console.log(doc.EventLogo);
  if (doc.EventLogo != "" && doc.EventLogo != undefined && doc.EventLogo != null) {
    img.setAttribute("src", doc.EventLogo);
  } else {
    // console.log("./img/e3.png");
    img.setAttribute("src", "./img/event1.webp");
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
// function show_more_menu()
// {
//   console.log("click show_more_menu");
// }
