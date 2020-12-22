  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDQ3Jw1VNrmWfqViAhCrQ0zRA-TydW8BVg",
    authDomain: "chat-app-c9cc2.firebaseapp.com",
    databaseURL: "https://chat-app-c9cc2.firebaseio.com",
    projectId: "chat-app-c9cc2",
    storageBucket: "chat-app-c9cc2.appspot.com",
    messagingSenderId: "1004612102674",
    appId: "1:1004612102674:web:b4686ee979e552fbd586cb"
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  if (!localStorage.getItem('username')) {
	    username = prompt('What is your name?');
	    localStorage.setItem('username', username);
    } else {
	    username = localStorage.getItem('username');
  }

 document.querySelector('#name').innerText = username;

 document.querySelector('#change-name').addEventListener('click', () => {
	username = prompt('What is your name?');
	localStorage.setItem('username', username);
	document.querySelector('#name').innerText = username;
 });
 
document.querySelector('#message-form').addEventListener('submit', e => {

    e.preventDefault();
    let message = document.querySelector('#message-input').value;

    console.log(db.collection('messages'));

    db.collection('messages')
	.add({

		name: username,
        message: message,
        date: firebase.firestore.Timestamp.fromMillis(Date.now())
	})
	.then((docRef) => {
		console.log(`Document written with ID: ${docRef.id}`);
		document.querySelector('#message-form').reset()
	})
	.catch((error) => {
		console.error(`Error adding document: ${error}`);
    });

    console.log(db.collection('messages'));
    

});


db.collection('messages')
.orderBy('date','asc')
.onSnapshot(snapshot => {
	document.querySelector('#messages').innerHTML = '';
	snapshot.forEach(doc => {
		let message = document.createElement('div')
		message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
		document.querySelector('#messages').prepend(message)
	})
})

document.querySelector('#clear').addEventListener('click', () => {
    db.collection('messages')
    .get()
    .then(snapshot => {
        snapshot.forEach(doc => {
			db.collection('messages').doc(doc.id).delete()
            .then(() => {
				console.log('Document successfully deleted!')
			})
            .catch(error => {
				console.error(`Error removing document: ${error}`)
			})
        })
    })
    .catch(error => {
        console.log(`Error getting documents: ${error}`)
    })
})







