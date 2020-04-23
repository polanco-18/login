function registrar(){
    var email=document.getElementById('email').value;
    var contra = document.getElementById('password').value;
    var errorCode;
    var errorMessage='';
    firebase.auth().createUserWithEmailAndPassword(email, contra)
    .then(function(){
        verficar()
    })
    .catch(function(error) {
    // Handle Errors here.
    errorCode = error.code;
    errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage); 
    Swal.fire(
        'Error',
        errorMessage+' - '+errorCode,
        'error'
      )
    // ...
    });
    if(errorMessage==''){
        Swal.fire(
            'Se Registro Correctamente',
            'Revise su correo -> '+email,
            'success'
          )
    }     
}

function ingreso(){
    var email=document.getElementById('email').value;
    var contra = document.getElementById('password').value;
    if(email!=''&& contra!=''){
    var errorCode;
    var errorMessage='';
    firebase.auth().signInWithEmailAndPassword(email, contra).catch(function(error) {
    // Handle Errors here.
    errorCode = error.code;
    errorMessage = error.message;
    Swal.fire(
        'Error',
        errorMessage+' - '+errorCode,
        'error'
      )
    // ...
    });
    if(errorMessage==''){
        //notificacion de iniciando sesion
        let timerInterval
            Swal.fire({
            title: 'Validando datos',
            html: 'Se esta ingresando <b></b> milesegundos.',
            timer: 1000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                    b.textContent = Swal.getTimerLeft()
                    }
                }
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)                
            //termina
            observador();
            location.href ="Principal.html";            
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
            })
    }}
    else{
        Swal.fire(
            'Ingrese todos los datos',
            '  ',
            'error'
          )
    } 
}
//validar sesiones activas
function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {                                   
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log('Existe Usuario Activo ->'+email);  
          //mostrar texto en menu
          var contenido=document.getElementById('contenido');
          contenido.innerHTML=`Usuario : `+email;
          console.log(user)
          // ...
        } else {
          // User is signed out.
          // ... 
          console.log('No Existe Usuario Activo');
        }
      });
}
observador();//se ejecuta cuando se ingresa a


function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        //notificacion de cerrar sesion
        let timerInterval
            Swal.fire({
            title: 'Cerrando Sesion',
            html: 'Se esta cerrando <b></b> milesegundos.',
            timer: 1000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                    b.textContent = Swal.getTimerLeft()
                    }
                }
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)                
            //termina
            location.href ="index.html";
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
            })
    })
    .catch(function(error){
        
    })
}

//verficar
function verficar(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('Enviando Correo...');
    }).catch(function(error) {
    // An error happened.
    console.log(error);
    });
}