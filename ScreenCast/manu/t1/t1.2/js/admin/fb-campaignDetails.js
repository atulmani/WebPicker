$(function(){
  $("#btnForwardTransfer").click(function(e)
  {
    $("#lstboxSource option:selected").each(function()
    {
      $(this).remove().appendTo("#lstboxDestination");
      tagDeviceToCampaign();
      e.preventDefault();
    })
  });
  $("#btnReverseTransfer").click(function(e)
  {
    $("#lstboxDestination option:selected").each(function()
    {
      $(this).remove().appendTo("#lstboxSource");
      untagDeviceToCampaign();
      e.preventDefault();
    })
  });
});

//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // console.log(firebaseUser);
      console.log('User: ' + firebaseUser.email + ' is logged-In');
      // console.log("UID: " + firebaseUser.uid);
      // console.log("Display Name: " + firebaseUser.displayName);
      // console.log("Email ID: " + firebaseUser.email);
      document.getElementById('customerProfileIcon').src = firebaseUser.photoURL;
      document.getElementById('customerdisplayName').innerHTML = firebaseUser.displayName;
    } else {
      console.log('User has been logged out');
      window.location.href = "../login";
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../login";
  }
});

// ****************** Populate Campaign Data - Starts **********************
// var url = location.href;
let url = new URL(location.href);
console.log('URL: ' + url);
let searchParams = new URLSearchParams(url.search);
var docID = searchParams.get('id');
console.log('Document ID: ' + docID);

if (docID != null) {
  console.log('Update Campaign Details');
  populateCampaignDetails(docID);
} else {
  console.log('Create New Campaign');
  // console.log ('Current user: ' + auth.currentUser);
  document.getElementById('loading').style.display = 'none';
}

function populateCampaignDetails(docID) {
  const snapshot = db.collection('CampaignList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('Doc: ' + doc.id);
      // document.getElementById('lblCampaignDocID').innerHTML = doc.id;
      document.getElementById('lblCampaignID').innerHTML = doc.data().campaignID;
      document.getElementById('lblCampaignName').innerHTML = doc.data().campaignName;
      document.getElementById('lblOrganizationName').innerHTML = doc.data().organizationName;
      document.getElementById('lblOrganizationName').innerHTML = doc.data().organizationName;
      document.getElementById('lblBrandName').innerHTML = doc.data().brand;
      document.getElementById('lblCreatedTimestamp').innerHTML = doc.data().createdTimestamp;

      if (doc.data().downloadurl) {
        for (var i = 0; i < doc.data().downloadurl.length; i++) {
          var imgid = 'img' + (i + 1);
          console.log('img id: ' + imgid);
          document.getElementById(imgid).src = doc.data().downloadurl[i].imgurl;
        }
        if (doc.data().downloadurl.length > 0)
          document.getElementById('ProductImg').src = doc.data().downloadurl[0].imgurl;

      }

      //populate scheduleData
      populateSchedule(doc);

      //populate Device List
      populateDeviceList(doc);

      document.getElementById('loading').style.display = 'none';
    }
  }).catch((error) => {
    // An error occurred
    // document.getElementById('errorMessage').innerHTML = error.message;
    // document.getElemlentById('errorMessage').style.display = 'block';
  });
}

function populateSchedule(doc) {
  var htmlSchedule = "";
  var deleteID = "123";
  // console.log('Doc: ' + doc);
  if (doc.data().schedule) {
    for (var i = 0; i < doc.data().schedule.length; i++) {
      //   // deleteID = doc.data().schedule[i];
      //   console.log('schedule length: ' + doc.data().schedule.length);
      //
      //
      // var schedule = {};
      // schedule.start = doc.data().schedule[i].start;
      // schedule.start_ts = doc.data().schedule[i].start_ts;
      // schedule.end = doc.data().schedule[i].end;
      // schedule.end_ts = doc.data().schedule[i].end_ts;
      //   scheduleData.push(schedule);
      //
      //   console.log('delete object: ' + JSON.stringify(scheduleData[i]));
      // console.log('ID: ' + doc.data().schedule[i].id);
      // var scheduleData = doc.data().schedule[i] ;
      // console.log('delete object: ' + JSON.stringify(scheduleData));



      htmlSchedule = htmlSchedule +
        "<div style='margin: 12px 0;' class='col-lg-3 col-md-4 col-sm-6'>" +
        "<span>" + doc.data().schedule[i].start + " - " + doc.data().schedule[i].end +
        // "<button onclick='deleteSchedule(\"" + scheduleData + "\",\"" + i  + "\")' style='border:none; outline:none; background:none; vertical-align: bottom; color:red; padding-right:0px; cursor:pointer;' class='material-icons'>delete_forever</button>" +
        "<button onclick='deleteSchedule(\"" + i + "\")' style='border:none; outline:none; background:none; vertical-align: bottom; color:red; padding-right:0px; cursor:pointer;' class='material-icons'>delete_forever</button>" +
        // "<button onclick=\"deleteSchedule('" + i  + "')\" style='border:none; outline:none; background:none; vertical-align: bottom; color:red; padding-right:0px; cursor:pointer;' class='material-icons'>delete_forever</button>" +
        // "<button onclick='deleteSchedule(\"" + this + "\",\"" + i  + "\")' style='border:none; outline:none; background:none; vertical-align: bottom; color:red; padding-right:0px; cursor:pointer;' class='material-icons'>delete_forever</button>" +
        "</span></div>";

      console.log('populate schedule last line');
    }

    document.getElementById('populateSchedule').innerHTML = htmlSchedule;
  }
}

function deleteSchedule(i) {

  // console.log('i = ' + i);
  // console.log('this = ' + scdata);

  // e.preventDefault();
  // e.preventDefault();

  var deletedSchedule;
  const snapshot = db.collection('CampaignList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      deletedSchedule = {
        start: doc.data().schedule[i].start,
        start_ts: doc.data().schedule[i].start_ts,
        end: doc.data().schedule[i].end,
        end_ts: doc.data().schedule[i].end_ts
      }
      // console.log('schedule Section JSON: ' + JSON.stringify(deletedSchedule));
      var docRef = db.collection('CampaignList').doc(docID);
      docRef.update({
          schedule: firebase.firestore.FieldValue.arrayRemove(deletedSchedule)
        })
        .then(() => {
          console.log('Deleted successfully');
          populateSchedule(doc);
        });
    }
  });
}

function populateDeviceList(doc) {
    console.log('Populate Device List - Starts');

    console.log('Source Device List length: ' + lstboxSource.options.length);



    for (var i=0; i < 10; i++)
    {
      var temp = document.createElement("OPTION");
      // temp.text = lstboxSource.options[i].text;
      temp.text = i;
      temp.value = i+1;
      lstboxSource.add(temp);
    }


    console.log('Source Device List length: ' + lstboxSource.options.length);

    console.log('Populate Device List - Ends');
}

// ****************** Populate Campaign Data - Ends **********************

// ****************** Upload Media - Starts **********************

//**************************INSERT Image into Storage, get image url & Add into CampaignList *****************************//
var ImgName, ImgURL;
var files = [];
var reader;

//************ Select File ****************
const btnSelect1 = document.getElementById('btnSelect1');
const btnSelect2 = document.getElementById('btnSelect2');
const btnSelect3 = document.getElementById('btnSelect3');
const btnSelect4 = document.getElementById('btnSelect4');

btnSelect1.addEventListener('click', function(e) {
  selectImage(e, btnSelect1.id)
}, false);
btnSelect2.addEventListener('click', function(e) {
  selectImage(e, btnSelect2.id)
}, false);
btnSelect3.addEventListener('click', function(e) {
  selectImage(e, btnSelect3.id)
}, false);
btnSelect4.addEventListener('click', function(e) {
  selectImage(e, btnSelect4.id)
}, false);

function selectImage(e, btnid) {
  console.log('e value: ' + e);
  console.log("Select Button Name: " + btnid);
  // document.getElementById("uploadImg").style.display = 'block';
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      if (btnid == 'btnSelect1')
        document.getElementById("img1").src = reader.result;
      if (btnid == 'btnSelect2')
        document.getElementById("img2").src = reader.result;
      if (btnid == 'btnSelect3')
        document.getElementById("img3").src = reader.result;
      if (btnid == 'btnSelect4')
        document.getElementById("img4").src = reader.result;
    }
    reader.readAsDataURL(files[0]);
  }
  input.click();
}

//************ File Upload to Cloud Storage  ****************
const btnUpload1 = document.getElementById('btnUpload1');
const btnUpload2 = document.getElementById('btnUpload2');
const btnUpload3 = document.getElementById('btnUpload3');
const btnUpload4 = document.getElementById('btnUpload4');

btnUpload1.addEventListener('click', function(e) {
  uploadImage(e, btnUpload1.id)
}, false);
btnUpload2.addEventListener('click', function(e) {
  uploadImage(e, btnUpload2.id)
}, false);
btnUpload3.addEventListener('click', function(e) {
  uploadImage(e, btnUpload3.id)
}, false);
btnUpload4.addEventListener('click', function(e) {
  uploadImage(e, btnUpload4.id)
}, false);

// btnUpload1.onclick = function() {
function uploadImage(e, btnid) {
  // ImgName = document.getElementById('namebox').value;
  const campaignID = document.getElementById('lblCampaignID').innerHTML;
  ImgName = campaignID + "-" + btnid + '.png';
  console.log('New Image Name: ' + ImgName);

  // var uploadTask = firebase.storage().ref('UserProfilePhotos/' + ImgName).put(files[0]);
  var uploadTask = firebase.storage().ref(campaignID + '/' + ImgName).put(files[0]);

  //Progress of the image upload into storageBucket
  uploadTask.on('state_changed', function(snapshot) {
      // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
      // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
    },

    function(error) {
      alert('error in saving the image');
    },

    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
        ImgUrl = url;
        alert('ImgUrl: ' + ImgUrl);

        var mediaSection = {
          img: ImgName,
          audio: "",
          video: "",
          media_id: ""
        };

        var downloadMedia = {
          img: ImgName,
          imgurl: ImgUrl,
          audio: "",
          audiourl: "",
          video: "",
          videourl: ""
        };

        var docRef = db.collection('CampaignList').doc(docID);
        // Atomically add a new section to the collection array field.
        docRef.update({
            media: firebase.firestore.FieldValue.arrayUnion(mediaSection),
            downloadurl: firebase.firestore.FieldValue.arrayUnion(downloadMedia)
          })
          .then((docRef) => {
            console.log("Image uploaded successful");
          })
          .catch((error) => {
            console.error("Error adding image: ", error);
          });
      });
    });
}

// ****************** Upload Media Data - Ends **********************

// ****************** Add Schedule in CampaignList **********************

function convertDateTimeToMillisecond(dateTimeString) {
  // var today = new Date();
  // console.log('Today Date toString: ' + today.toString());

  // var mockdate = new Date("10/14/2021 22:01:00"); // some mock date
  // console.log('Mock DateTime in ms: ' + mockdate.getTime());

  var date = new Date(dateTimeString);
  var milliseconds = date.getTime();
  console.log('DateTime in ms: ' + milliseconds);
  // console.log('Current Date: ' + date.getDate());

  return milliseconds;
}

const btnAddSchedule = document.getElementById('btnAddSchedule');

// btnAddSchedule.addEventListener('click', function(e){addSchedule(e,btnAddSchedule.id)}, false);

btnAddSchedule.onclick = function(e) {
  // function addSchedule(e, btnid){
  e.preventDefault(); //Prevent to refresh the page

  console.log("test line");

  //Select Start Time
  var startTime = document.getElementById('startTime');
  var selectedStartTime = startTime.options[startTime.selectedIndex].value;
  var startTimeAMPM = document.getElementById('startTimeAMPM');
  var startAMPM = startTimeAMPM.options[startTimeAMPM.selectedIndex].value;
  if (selectedStartTime == 12 && startAMPM == 'AM')
  {
    selectedStartTime = "00";
  }

  if (startAMPM == 'PM')
  {
    if (selectedStartTime != 12)
    {
      selectedStartTime = parseInt(selectedStartTime) + 12;
    }
  }
  var start = selectedStartTime.toString() + ":01:00";
  console.log('Start Time: ' + selectedStartTime);

  var today = new Date();
  var start_ts = today.toDateString() + " " + start; // + "GMT+0530 (India Standard Time)" ;
  // console.log('ms for selected time: ' + start_ts + ' (from function): ' + convertDateTimeToMillisecond(start_ts));

  //Select End Time
  var endTime = document.getElementById('endTime');
  var selectedEndTime = endTime.options[endTime.selectedIndex].value;
  var endTimeAMPM = document.getElementById('endTimeAMPM');
  var endAMPM = endTimeAMPM.options[endTimeAMPM.selectedIndex].value;
  if (endAMPM == 'PM')
    selectedEndTime = parseInt(selectedEndTime) + 12;
  // // console.log('Start Time: ' + selectedStartTime);
  var end = selectedEndTime.toString() + ":00:00";

  // var today = new Date();
  var end_ts = today.toDateString() + " " + end; // + "GMT+0530 (India Standard Time)" ;
  // console.log('ms for selected time: ' + end_ts + ' (from function): ' + convertDateTimeToMillisecond(end_ts));


  if (parseInt(selectedStartTime) >= parseInt(selectedEndTime)) {
    addScheduleErrMsg.innerHTML = "start time should not be greater-than or equal-to end time";
  } else {
    addScheduleErrMsg.innerHTML = "";
    var addScheduleData = {
      start: start,
      start_ts: convertDateTimeToMillisecond(start_ts),
      end: end,
      end_ts: convertDateTimeToMillisecond(end_ts)
    };

    var docRef = db.collection('CampaignList').doc(docID);
    console.log('Document id: ' + docID);
    // Atomically add a new section to the collection array field.
    docRef.update({
      schedule: firebase.firestore.FieldValue.arrayUnion(addScheduleData)
    });

    var docRef = db.collection('DeviceCampaignSchedule').doc(docID);
    docRef.update({
      schedule: firebase.firestore.FieldValue.arrayUnion(addScheduleData)
    });

    const snapshot = db.collection('CampaignList').doc(docID);
    snapshot.get().then(async (doc) => {
      if (doc.exists) {
        populateSchedule(doc);
      }
    });
  }
}

// ****************** Tag / UnTag Device To Campaign - Starts **********************

tagDeviceToCampaign()
{

}

untagDeviceToCampaign()
{

}

// ****************** Tag / UnTag Device To Campaign - Ends **********************


// ****************** Publish Campaign Data - Starts **********************

function publish()
{
  console.log('Publish using togger button');
  // this.classList.toggle('active');
  // var toggle = document.getElementsByClassName('.toggle');
  // console.log('toggle value: ' + toggle);
  // var element = document.getElementsByClassName(".toggle-btn");
  var element = document.getElementById("togglePublishButton");
  console.log('element: ' + element);
  var publishFlag =  element.classList.toggle("active");
  console.log('Active Val: ' + publishFlag );

  const docRef = db.collection('CampaignList').doc(docID);
  console.log('Doc ID: ' + docID);
  if (publishFlag)
  {
    //Published
    docRef.update({
      status: 'PUBLISHED'
    }).then(() => {
      console.log("Document published successfully!");
    }).catch((error) => {
      console.error("Error creating document: ", error);
    });
  }
  else
  {
    //Published
    docRef.update({
      status: 'NOT_PUBLISHED'
    }).then(() => {
      console.log("Document not published successfully!");
    }).catch((error) => {
      console.error("Error creating document: ", error);
    });
  }
}

const btnPublish = document.getElementById('btnPublish');

btnPublish.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page

  for(var i=0; i < lstboxDestination.options.length; i++ )
  {
    console.log('DeviceID: ' + lstboxSource.options[i].text);
    publish(lstboxSource.options[i].text);
  }
});



// btnPublish.addEventListener('click', e => {
//   e.preventDefault(); //Prevent to refresh the page
function publish(deviceID){
  //Create a for loop to push all the published data in
  //every device document id
  deviceID = "M0QiMQZvIN0EApksx6xh";

  const campaignDocRef = db.collection('CampaignList').doc(docID);
    //Published
    campaignDocRef.update({
      status: 'PUBLISHED',
      publishedTimestamp: (new Date()).toString()
    }).then(() => {
      console.log("Document published successfully!");
    }).catch((error) => {
      console.error("Error creating document: ", error);
    });

  //whenever the publish clicked, first delete the document from
  //DeviceCampaignList and then create new one to publish the campaign
  var docRef = db.collection('DeviceCampaignList').doc(deviceID);
  docRef.delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
  //Create new document with the same id
  var docRef = db.collection('DeviceCampaignList').doc(deviceID);
  docRef.set({
    // sessionid: deviceID
  }).then(() => {
    console.log("Document successfully added!");
  }).catch((error) => {
    console.error("Error creating document: ", error);
  });

  //Add download url in CampaignList Collection
  const snapshot = db.collection('CampaignList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('Publish Data : ' + doc.id);

      var mediaSection = [];
      for (var i = 0; i < doc.data().media.length; i++) {
        var media = {};
        media.img = doc.data().media[i].img;
        media.audio = doc.data().media[i].audio;
        media.video = doc.data().media[i].video;
        media.media_id = doc.data().media[i].media_id;
        mediaSection.push(media);
      }

      var scheduleData = [];
      for (var i = 0; i < doc.data().schedule.length; i++) {
        var schedule = {};
        schedule.start = doc.data().schedule[i].start;
        schedule.start_ts = doc.data().schedule[i].start_ts;
        schedule.end = doc.data().schedule[i].end;
        schedule.end_ts = doc.data().schedule[i].end_ts;
        scheduleData.push(schedule);
      }

      addDataSection(deviceID, mediaSection, scheduleData);

      for (var i = 0; i < doc.data().downloadurl.length; i++) {
        var downloadMedia = {
          img: doc.data().downloadurl[i].img,
          imgurl: doc.data().downloadurl[i].imgurl,
          audio: "",
          audiourl: "",
          video: "",
          videourl: ""
        };

        addDownloadMediaData(deviceID, downloadMedia);
      }
    }
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElemlentById('errorMessage').style.display = 'block';
  });
};

function addDataSection(deviceID, mediaSection, scheduleData) {
  var dataSection = {};

  console.log("data saving starts in document: " + deviceID);

  dataSection["sessionid"] = deviceID;
  dataSection["camp_id"] = document.getElementById('lblCampaignID').innerHTML;
  dataSection["camp_name"] = document.getElementById('lblCampaignName').innerHTML;
  dataSection["org_name"] = document.getElementById('lblOrganizationName').innerHTML;
  dataSection["country"] = "INDIA";
  dataSection["state"] = "DELHI";
  dataSection["dates"] = "";
  dataSection["media"] = mediaSection;
  dataSection["defaultmedia"] = [];
  dataSection["schedule"] = scheduleData;

  // console.log('dataSection JSON: ' + JSON.stringify(dataSection));

  var docRef = db.collection('DeviceCampaignList').doc(deviceID);
  // Atomically add a new section to the collection array field.
  docRef.update({
    data: firebase.firestore.FieldValue.arrayUnion(dataSection)
  });
}


//Add download media data section
function addDownloadMediaData(deviceID, downloadMedia) {
  var docRef = db.collection('DeviceCampaignList').doc(deviceID);
  // Atomically add a new section to the collection array field.
  docRef.update({
    downloadurl: firebase.firestore.FieldValue.arrayUnion(downloadMedia)
  });
}

//Delete download media data section
function deleteDownloadMediaData(ParticipantFullName) {
  // console.log ('erid is' + erId );
  console.log('deletion started');
  console.log('deletion clicked' + ParticipantFullName);
  const erId = docID + auth.currentUser.uid;
  const secpfullname = document.getElementById(ParticipantFullName).value;
  // const secpfullname = document.getElementById('fullNamelabel0').innerHTML;
  console.log('Participant Name: ' + secpfullname);

  var newParticipant = {
    FullName: secpfullname,
    DOB: "01/01/2020"
  };

  var docRef1 = db.collection('EventRegistration').doc(erId);
  // docRef.child('Participants').push(newParticipant);
  // Atomically add a new region to the "regions" array field.
  docRef1.update({
      Participants: firebase.firestore.FieldValue.arrayRemove(newParticipant)
    })
    .then(() => {
      console.log('Deleted successfully');
      // getEventRegistration();
    });
  //

  // firstExtra.style.display = "none";
  // head.style.display = "block";
};

// ****************** Publish Campaign Data - Ends **********************

// js for product gallery

var ProductImg = document.getElementById("ProductImg");
var SmallImg = document.getElementsByClassName("second-section-small-img");
var playbtn = document.getElementById("playbtn");

SmallImg[0].onclick = function() {
  ProductImg.src = SmallImg[0].src;
  playbtn.style.display = "none";
}
SmallImg[1].onclick = function() {
  ProductImg.src = SmallImg[1].src;
  playbtn.style.display = "none";
}
SmallImg[2].onclick = function() {
  ProductImg.src = SmallImg[2].src;
  playbtn.style.display = "block";
}
SmallImg[3].onclick = function() {
  ProductImg.src = SmallImg[3].src;
  playbtn.style.display = "none";
}

var videoPlayer = document.getElementById("videoPlayer");
var myVideo = document.getElementById("myVideo");
var videoPlayer = document.getElementById("videoPlayer");

function stopVideo() {
  videoPlayer.style.display = "none";
}

function playVideo(file) {
  myVideo.src = file;
  videoPlayer.style.display = "block";
}
