var loggedinUser = "";
auth.onAuthStateChanged(firebaseUser => {
  try {
    //    var str = "Java-Script-Object-Notation";

    // console.log(acronym)


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
    // document.getElementById('ifSignedIn').innerHTML = 'Hi ' + userProfile.UserName;
    // document.getElementById('ifSignedIn').href = "login/profile.html";
    // document.getElementById("UserCity").innerHTML = userProfile.City;
  }

}

function getTournamentSummary() {

  var para1 = {};
  para1 = {
    userID: ""
  };
  console.log(para1);
  const ret1 = firebase.functions().httpsCallable("/getEventSummaryBySport");
  console.log("before call");
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
          // var cityList = document.getElementById("genre-location-list-new");
          // console.log("From Function " + results.data[0].resultsid);
          for (index = 0; index < results.data.length; index++) {
            console.log(results.data[index].City);
            console.log(results.data[index].EventCount);
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
            // cityList.appendChild(div1);

            if (results.data[index].City === "Pune") {
              // document.getElementById("puneCnt1").innerHTML = results.data[index].EventCount;
            } else if (results.data[index].City === "Bangalore") {
              // document.getElementById("bangaloreCnt1").innerHTML = results.data[index].EventCount;
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
        });

    }).
  catch(err => {
    console.log(err);
  });
}

  //
  // function addEvent()
  // {
  //   console.log('in addEvent');
  //   var owlitem = document.getElementsByClassName(".owl-item");
  //   console.log(owlitem.length);
  //   for (let i=0; i < owlitem.length; i++) {
  //     console.log(owlitem[i]);
  //      owlitem[i].addEventListener("click",functionClick);
  //   }
  //
  // }

  function functionClick(e)
  {
    console.log('thumb clicked');
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
  }

function getEventList(filter) {
  var para = {};
  // console.log(userid);
  para = {
    eventStatus: "Active",
  };
  console.log(para);
  var ret = "";
  //if (filter === "All") {
  ret = firebase.functions().httpsCallable("getAllEventWithEventStatus");

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
      // console.log("before addEvent");
      // addEvent();
      document.getElementById('loading').style.display = 'none';
    });
  });
}

function getLocationEvent(location, cnt) {
  console.log(location);
  console.log(document.getElementById(cnt).innerHTML);
  if (Number(document.getElementById(cnt).innerHTML) > 0) {
    var para = {};
    // console.log(userid);
    para = {
      City: location
    };
    console.log(para);
    var ret = "";
    //if (filter === "All") {
    ret = firebase.functions().httpsCallable("getAllEventDetailsByCity");

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
        removeallItem();
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
}

function removeallItem() {
  $('#event-list-new').length;
  //   var $carousel = $(".edit-manage-carousel");
  // for (var i =0; i<100; i++) {
  //   $carousel.trigger('remove.owl.carousel', i );
  // }
  console.log($('#event-list-new').length);
  // document.getElementById("event-list-new").innerHTML="";
  //  var indexToRemove = 1;
  //  $('.event-list-new').owlCarousel('remove', indexToRemove).owlCarousel('update');
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
    // year: 'numeric',
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

  console.log(doc.EventCode);
  console.log(scode);
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
  console.log(doc.EventLogo);
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
  console.log("in btnClickEvent");
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
  console.log('hi');

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


function RenderEventDetailsOld(index, doc, entryCount) {
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
    console.log("./img/e3.png");
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

function showbanner(index)
{
  console.log(index);
}
