//A realtime Listerner
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      // console.log(firebaseUser);
      console.log('User: ' + firebaseUser.email + ' is logged-In');
      // console.log("UID: " + firebaseUser.uid);
      // console.log("Display Name: " + firebaseUser.displayName);
      // console.log("Email ID: " + firebaseUser.email);
      // document.getElementById('displayName').innerHTML = firebaseUser.displayName;
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


function populateCampaignDetails(docID)
{
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

      for (var i = 0; i < doc.data().downloadurl.length; i++)
      {
          var imgid = 'img' + (i+1);
          console.log('img id: ' + imgid);
          document.getElementById(imgid).src = doc.data().downloadurl[i].imgurl;
      }
      document.getElementById('ProductImg').src = doc.data().downloadurl[0].imgurl;

      document.getElementById('loading').style.display = 'none';
    }
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElemlentById('errorMessage').style.display = 'block';
  });
}
// ****************** Populate Campaign Data - Ends **********************

// ****************** Upload Media - Starts **********************

//**************************INSERT Image into Storage & get image url on ui *****************************//
var ImgName, ImgURL;
var files = [];
var reader;

//************ Select File ****************
  const btnSelect1 = document.getElementById('btnSelect1');
  const btnSelect2 = document.getElementById('btnSelect2');
  const btnSelect3 = document.getElementById('btnSelect3');
  const btnSelect4 = document.getElementById('btnSelect4');

  btnSelect1.addEventListener('click', function(e){selectImage(e,btnSelect1.id)}, false);
  btnSelect2.addEventListener('click', function(e){selectImage(e,btnSelect2.id)}, false);
  btnSelect3.addEventListener('click', function(e){selectImage(e,btnSelect3.id)}, false);
  btnSelect4.addEventListener('click', function(e){selectImage(e,btnSelect4.id)}, false);

function selectImage(e, btnid){
  console.log('e value: ' + e);
  console.log("Select Button Name: " + btnid );
  // document.getElementById("uploadImg").style.display = 'block';
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function() {
      if(btnid == 'btnSelect1')
        document.getElementById("img1").src = reader.result;
      if(btnid == 'btnSelect2')
        document.getElementById("img2").src = reader.result;
      if(btnid == 'btnSelect3')
        document.getElementById("img3").src = reader.result;
      if(btnid == 'btnSelect4')
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

btnUpload1.addEventListener('click', function(e){uploadImage(e,btnUpload1.id)}, false);
btnUpload2.addEventListener('click', function(e){uploadImage(e,btnUpload2.id)}, false);
btnUpload3.addEventListener('click', function(e){uploadImage(e,btnUpload3.id)}, false);
btnUpload4.addEventListener('click', function(e){uploadImage(e,btnUpload4.id)}, false);

// btnUpload1.onclick = function() {
function uploadImage(e, btnid){
  // ImgName = document.getElementById('namebox').value;
  ImgName = btnid + '.png';
  console.log('Image Name: ' + ImgName);
  const campaignID = document.getElementById('lblCampaignID').innerHTML;
  // var uploadTask = firebase.storage().ref('UserProfilePhotos/' + ImgName).put(files[0]);
  var uploadTask = firebase.storage().ref( campaignID + '/' + ImgName).put(files[0]);

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

        var downloadMedia = {
          img: ImgName,
          imgurl: ImgUrl,
          audio: "",
          audiourl: "",
          video: "",
          videourl:""
        };

        var docRef = db.collection('CampaignList').doc(docID);
        // Atomically add a new section to the collection array field.
        docRef.update({
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

// ****************** Publish Campaign Data - Starts **********************
const btnPublish = document.getElementById('btnPublish');

btnPublish.addEventListener('click', e => {
  e.preventDefault(); //Prevent to refresh the page


  //Create a for loop to push all the published data in
  //every device document id
  const deviceID = "RPul0HD4LHrlxG57mpaw";
  addDataSection(deviceID);
  // addSchedule(deviceID);

  const snapshot = db.collection('CampaignList').doc(docID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      console.log('Publish Data : ' + doc.id);
      // document.getElementById('lblCampaignDocID').innerHTML = doc.id;
      // document.getElementById('lblCampaignID').innerHTML = doc.data().campaignID;
      // document.getElementById('lblCampaignName').innerHTML = doc.data().campaignName;
      // document.getElementById('lblOrganizationName').innerHTML = doc.data().organizationName;
      // document.getElementById('lblOrganizationName').innerHTML = doc.data().organizationName;
      // document.getElementById('lblBrandName').innerHTML = doc.data().brand;
      // document.getElementById('lblCreatedTimestamp').innerHTML = doc.data().createdTimestamp;

      for (var i = 0; i < doc.data().downloadurl.length; i++)
      {
          // var imgid = 'img' + (i+1);
          // console.log('img id: ' + imgid);
          // document.getElementById(imgid).src = doc.data().downloadurl[i].imgurl;

            // var mediaInDataSection = {
            //   "img": doc.data().downloadurl[i].imgurl,
            //   "audio": "",
            //   "video": "",
            //   "media_id": (i+1)
            // }
            //
            // addMediaInDataSection(deviceID, mediaInDataSection);

            var downloadMedia = {
              img: doc.data().downloadurl[i].img,
              imgurl: doc.data().downloadurl[i].imgurl,
              audio: "",
              audiourl: "",
              video: "",
              videourl:""
            };

            addDownloadMediaData(deviceID, downloadMedia);



      }
      // document.getElementById('ProductImg').src = doc.data().downloadurl[0].imgurl;

      // document.getElementById('loading').style.display = 'none';
    }
  }).catch((error) => {
    // An error occurred
    document.getElementById('errorMessage').innerHTML = error.message;
    document.getElemlentById('errorMessage').style.display = 'block';
  });
});

function addDataSection(deviceID)
{
  console.log("data saving starts in document: " + deviceID);
  var dataSection = {
    camp_id: document.getElementById('lblCampaignID').innerHTML,
    camp_name: document.getElementById('lblCampaignName').innerHTML,
    org_name: document.getElementById('lblOrganizationName').innerHTML,
    country: "INDIA",
    state: "DELHI",
    sessionid:deviceID,
    dates: "",
    media: [
      {
        "img": document.getElementById('img1').src,
        "audio": "",
        "video": "",
        "media_id": 1
      },
      {
        "img": document.getElementById('img2').src,
        "audio": "",
        "video": "",
        "media_id": 2
      }
    ],
    defaultmedia: [],
    schedule: [{
      start: "10:01 AM",
      start_ts: 1630058460,
      end: "11:00 AM",
      end_ts: 1630062000
    },
    {
      start: "11:01 AM",
      start_ts: 1630062060,
      end: "12:00 PM",
      end_ts: 1630065600
    }
    ]
  };

  var docRef = db.collection('DeviceCampaignList').doc(deviceID);
  // Atomically add a new section to the collection array field.
  docRef.update({
    data: firebase.firestore.FieldValue.arrayUnion(dataSection)
  });
}
//
// function addSchedule (deviceID)
// {
//   var docRef = db.collection('DeviceCampaignList').doc(deviceID);
//   // Atomically add a new section to the collection array field.
//   docRef.update({
//     schedule: firebase.firestore.FieldValue.arrayUnion(scheduleSection)
//   });
// }

// function addMediaInDataSection(deviceID, mediaInDataSection) {
//   var docRef = db.collection('DeviceCampaignList').doc(deviceID);
//   // Atomically add a new section to the collection array field.
//   docRef.update({
//     data: firebase.firestore.FieldValue.arrayUnion(mediaInDataSection)
//   });
// }

function addDownloadMediaData(deviceID, downloadMedia) {
  var docRef = db.collection('DeviceCampaignList').doc(deviceID);
  // Atomically add a new section to the collection array field.
  docRef.update({
    downloadurl: firebase.firestore.FieldValue.arrayUnion(downloadMedia)
  });
}

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
  .then(() =>{
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

     SmallImg[0].onclick = function()
     {
       ProductImg.src = SmallImg[0].src;
       playbtn.style.display = "none";
     }
     SmallImg[1].onclick = function()
     {
       ProductImg.src = SmallImg[1].src;
       playbtn.style.display = "none";
     }
     SmallImg[2].onclick = function()
     {
       ProductImg.src = SmallImg[2].src;
       playbtn.style.display = "block";
     }
     SmallImg[3].onclick = function()
     {
       ProductImg.src = SmallImg[3].src;
       playbtn.style.display = "none";
     }

    var videoPlayer = document.getElementById("videoPlayer");
    var myVideo = document.getElementById("myVideo");
    var videoPlayer = document.getElementById("videoPlayer");

    function stopVideo(){
      videoPlayer.style.display = "none";
    }

    function playVideo(file){
      myVideo.src = file;
      videoPlayer.style.display = "block";
    }
