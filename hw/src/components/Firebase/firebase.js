import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAYrEQKdLedSr5BA0t1FkkWc1gyTEtQ2sA",
    authDomain: "jsiconverter.firebaseapp.com",
    databaseURL: "https://jsiconverter.firebaseio.com",
    projectId: "jsiconverter",
    storageBucket: "jsiconverter.appspot.com",
    messagingSenderId: "290844832718",
    appId: "1:290844832718:web:41628e754fa377fb31719f"
};
firebase.initializeApp(firebaseConfig);

class Firebase {

    doSingUp = (surname, name, login, apple, password, file, authTrue, authFalse) => {
        const ref = firebase.database().ref().child('users').child(login).child('Login');
        ref.on('value', snap => {
            if (login === snap.val()) {
                authFalse();
            } else {
                const uploadTask = firebase.storage().ref('users/' + file.name).put(file);

                uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: {
                            console.log('Upload is paused');
                            break;
                        }
                        case firebase.storage.TaskState.RUNNING: {
                            console.log('Upload is running');
                            break;
                        }
                    }
                }, function (error) {
                    switch (error.code) {
                        case 'storage/unauthorized': {
                            console.log("User doesn't have permission to access the object");
                            break;
                        }
                        case 'storage/canceled': {
                            console.log("User canceled the upload");
                            break;
                        }
                        case 'storage/unknown': {
                            console.log("Unknown error occurred, inspect error.serverResponse");
                            break;
                        }
                    }
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        firebase.database().ref('users/' + login).set({
                            Surname: surname,
                            Name: name,
                            Login: login,
                            Apple: apple,
                            Password: password,
                            filePath: downloadURL
                        }, function (error) {
                            if (error) {
                                authFalse();
                            } else {
                                authTrue();
                            }
                        });
                        console.log('File available at', downloadURL);
                    });
                });
            }
        })
    }

    doSingIn = (login, password, authTrue, authFalse) => {
        const ref = firebase.database().ref().child('users').child(login).child('Password');
        ref.on('value', snap => {
            password === snap.val() ? authTrue() : authFalse();
        })
    }
}

export default Firebase;