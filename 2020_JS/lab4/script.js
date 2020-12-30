function setDataToServer() {
    const file = document.getElementById('file_input').files[0];
    const uploadTask = firebase.storage().ref('feedback/' + file.name).put(file);

    uploadTask.on('state_changed', function(snapshot) {
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
    }, function(error) {
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
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.database().ref('feedback').push({
                Surname: surname_input.value,
                Name: name_input.value,
                pol: pol_select.value,
                phone: phone_input.value,
                filepath: downloadURL
            }, function(error) {
                if (error) {
                    document.getElementById('submit_button').style.backgroundColor = 'red';
                } else {
                    document.getElementById('submit_button').style.backgroundColor = 'green';
                }
            });
            console.log('File available at', downloadURL);
        });
    });    
}