lnkLogout.addEventListener('click', e => {
  auth.signOut().then(() => {
    // Sign-out successful.
    window.location.href = "../login";
    console.log('Successfully Logged Out');
  }).catch((error) => {
    // An error happened.
    console.log('Error: ' + error.message);
    window.location.href = "../login";
  });
});


  var ImgName, ImgURL;
  var files = [];
  var reader;

  //************ Select File ****************
  document.getElementById("select").onclick = function(e) {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function(){
      document.getElementById("myimg").src = reader.result;
      }
      reader.readAsDataURL (files[0]);

    }
    input.click();
  }

  //************ File Upload to Cloud Storage  ****************
  document.getElementById('upload').onclick = function() {
    ImgName = document.getElementById('namebox').value;
    console.log('ImageName: ' + ImgName);
    console.log('Storage: ' + firebase.storage());

    var uploadTask = storage.ref('Images/'+ImgName+".png").put(files[0]);

    //Progress of the image upload into storageBucket
    uploadTask.on('state_changed', function(snapshot){
      // var progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
      // document.getElementById('UpProgress').innerHTML = 'Upload'+progress+'%';
    },

    function(error) {
        alert ('error in saving the image');
      },

      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
          ImgUrl = url;

          alert ('ImgUrl: ' + ImgUrl );

        // firebase.firestore().ref('Pictures/'+ImgName).set({
        //   Name: ImgName,
        //   Link: ImgUrl
        // });

        db.collection("Images").add({
            UserID: auth.currentUser.uid,
            CorporateID: '10000',
            AdsID: '1',
            ImageID: '1',
            ImageName: ImgName,
            ImageURL: ImgUrl,
            UploadTimestamp: (new Date()).toString()
          })
          .then((docRef) => {
            console.log("Image added successful");
          })
          .catch((error) => {
            console.error("Error adding image: ", error);
          });




        alert('image added successful');
      }
    );
    } );
  }

  //************ Retrive image from storage & url from db  ****************
    // document.getElementById('retrieve').onclick = function(){
    //   ImgName = document.getElementById('namebox').value;
    //
    //   firebase.firestore().collection('Images').orderBy('Timestamp').onSnapshot(snapshot => {
    //     let changes = snapshot.docChanges();
    //     // console.log(changes);
    //     changes.forEach (change => {
    //       // console.log(change.doc.data());
    //       if (change.type == 'added') {
    //         var imageURL = change.doc.data().ImageURL;
    //       }
    //       else if (change.type == 'removed') {
    //         let li = contactMessageList.querySelector('[data-id=' + change.doc.id + ']');
    //         dataListList.removeChild(li);
    //       }
    //     })
    //   })
    //
    // }
