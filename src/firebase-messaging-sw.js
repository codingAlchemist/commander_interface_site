importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAjQilKUXLZauH4B-d_iN08LNoJtAxBcEo",
  authDomain: "gameachievements-7d6e1.firebaseapp.com",
  projectId: "gameachievements-7d6e1",
  storageBucket: "gameachievements-7d6e1.appspot.com",
  messagingSenderId: "631251765486",
  appId: "1:631251765486:web:11b276cb34a97376800bff",
  measurementId: "G-VB1F518LWS"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
