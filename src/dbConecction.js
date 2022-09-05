var ref;
initFirebase()

function initFirebase(){
  var firebaseConfig = {
    "apiKey": "AIzaSyAUUpIP3tBA-7mTafBpl88WJ43faUtehPU",
    "authDomain": "horariosbusstacecilia.firebaseapp.com",
    "databaseURL": "https://horariosbusstacecilia-default-rtdb.firebaseio.com",
    "projectId": "horariosbusstacecilia",
    "storageBucket": "horariosbusstacecilia.appspot.com",
    "messagingSenderId": "328057200146",
    "appId": "1:328057200146:web:1b843c91ffbc089682c2cb"
};

    firebase.initializeApp(firebaseConfig);

    ref = firebase.database().ref();
}




//console.log(globallist)

  /*"Sta Elena - Sta Cecilia - La Cruz", 
  	"El Caoba  - Sta Cecilia - La Cruz", 
  	"Upala - Sta Cecilia - La Cruz", 
  	"San Carlos - Sta Cecilia - La Cruz", 
  	"Sta Cecilia - La Cruz", 
  	"La Cruz - Sta Cecilia", 
  	"Sta Cecilia - San José"]*/