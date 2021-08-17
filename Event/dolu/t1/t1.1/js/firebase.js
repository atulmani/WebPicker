const firebaseConfig = {
  apiKey: "AIzaSyCQyeAWJ3PMMSQlHhLfhESEZdZZvBAIJac",
  authDomain: "eventmanager-4228c.firebaseapp.com",
  projectId: "eventmanager-4228c",
  storageBucket: "eventmanager-4228c.appspot.com",
  messagingSenderId: "894210757296",
  appId: "1:894210757296:web:617980c473510b41ebe175",
  databaseURL: "https://eventmanager-4228c.firebaseio.com"

};
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 //Refrence to create firebase database//
 const db = firebase.firestore();

//**************************SELECT/GET DATA*****************************//

db.collection("Events").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  console.log(changes);

  changes.forEach (change => {
    if (change.type =='added'){
      // console.log(change.doc.data());
      // var item = document.createElement("item1");
      // itemlist = document.getElementById("event-list");
      // itemlist.innerHTML = "<div class='item'><div class='post-content'><h3 class='post-title'>" + change.doc.data().EventName + "</h3></div></div>";
      // document.getElementById("event-list").appendChild(itemlist);

       // document.getElementById("homepage_eventname").innerHTML = change.doc.data().EventName;
       // document.getElementById("homepage_eventvenue").innerHTML = change.doc.data().EventVenue;
       // document.getElementById("homepage_eventdate").innerHTML = change.doc.data().EventDate;
       // console.log (document.getElementById("eventname_homepage").value);
    }

    // itemlist = document.getElementById("firebase-event-list");
    let item = document.createElement('div');
    item.classList.add("item");
    // item.innerHTML = "<div class='post-content'><h3 class='post-title'>" + change.doc.data().EventName + "</h3></div>";

    item.innerHTML = "<a style='text-decoration:none;' href='./Events/EventDetails.html'>"+
      "<div class='item'>" +
        "<div class='post-slide'>" +
          "<div class='post-img'>" +
            "<img style='border-radius:5%;' src='./img/card1.png' alt='' width='100%'>" +
          "</div>" +
          "<div class='post-content'>" +
            "<h3 class='post-title' id='homepage_eventname'>" + change.doc.data().EventName +
            "</h3>" +
            "<p class='description'>" +
              "<span style='font-weight:bold'>Venue: </span>" + change.doc.data().EventVenue +
              "<span style='letter-spacing:1px;' id='homepage_eventvenue'></span>" +
              "<br>" +
              "<span style='font-weight:bold'>Date: </span>" +
              "<span style='letter-spacing:1px;line-height:30px;'  id='homepage_eventdate'>" +
              "</span>" +
              "<br>" +
              "<span style='letter-spacing:1px;line-height:14px;'><span style='font-weight:bold'>Price</span>: ₹ 4999 </span>" +
            "</p>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</a>"


    $('#event-list').trigger('add.owl.carousel', [item]).trigger('refresh.owl.carousel');

    console.log(change.doc.data().EventName);
  })
}
)




//**************************INSERT/SAVE DATA*****************************//
 eventForm.addEventListener('submit', (e)=>{
   e.preventDefault();
   storeData();
 }
 )

 function storeData(){
   console.log("data sending to db-started");

   var eventname = document.getElementById("eventname").value;
   var eventvenue = document.getElementById("eventvenue").value;
   var eventdate = document.getElementById("eventdate").value;
   var eventOrganiserName = document.getElementById("eventOrganiserName").value;
   var organiserEmail = document.getElementById("organiserEmail").value;
   var eventorganiserPhone = document.getElementById("eventorganiserPhone").value;
   var eventorganiserPhoneAlt = document.getElementById("eventorganiserPhoneAlt").value;

   db.collection("Events").add({
     EventId: "1",
     EventName: eventname,
     EventVenue: eventvenue,
     EventDate:  eventdate,
     EventOrganiserName: eventOrganiserName,
     OrganiserEmail: organiserEmail,
     EventorganiserPhone:eventorganiserPhone,
     EventorganiserPhone: eventorganiserPhone,
     EventorganiserPhoneAlt: eventorganiserPhoneAlt,
     Timestamp:(new Date()).toString()

   })
   .then((docRef) => {
     console.log("Data added sucessfully in the document: " + docRef.toString() );
   })
   .catch((error) => {
     console.error("error adding document:", error);
   });

   console.log("data sending to db-completed");
 }
