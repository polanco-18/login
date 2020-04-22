function registrar(){
    var email=document.getElementById('email').value;
    var contra = document.getElementById('password').value;
    console.log(email);
    console.log(contra);

    firebase.auth().createUserWithEmailAndPassword(email, contra).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
    });
}