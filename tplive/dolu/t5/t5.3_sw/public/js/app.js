var swRegistration ;
if (!window.Promise) {
  window.Promise = Promise;
}
//
if ('serviceWorker' in navigator) {
  swRegistration = navigator.serviceWorker
    .register('\sw.js')
    .then(function() {

      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}
//push notifications starts
if('PushManager' in window){
  console.log('PushManager supproted');
console.log(Notification.permission)
}
else {
  console.log('PushManager not supproted');

}

//
const askforNotification = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }

    //
     showLocalNotification('TPLiVE', 'Thanks for Selecting notification', swRegistration);
}

//show notification
const showLocalNotification = (title, body, swRegistration) => {
    const options = {

      "body": body,
      "icon": "/img/TPLiVE_Logo.png",
      "dir": "ltr"
    };
    swRegistration.showNotification(title, options);
}
//push notifications ends
