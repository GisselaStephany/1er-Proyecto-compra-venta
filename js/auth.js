function login() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if (usuario == 'admin' && contrasena == 'admin.1') {
        localStorage.setItem('sesion','si');
        
        swal.fire({
            title: "Bienvenido!",
            text: "Haz iniciado sesión!!",
            icon: "success",
        }).then (() => {
            window.location.href = "index.html";
        });
    } else {
        swal.fire({
            title: "Error!",
            text: "las credenciales no son válidas!!",
            icon: "error",
        }).then (() => {
            localStorage.removeItem('sesion')
            window.location.href = "login.html";
        });
        return;
    };
};

function verificar(){
    if(localStorage.getItem('sesion')!='si'){
        window.location.href = "login.html";
    }
}
function logout(){
    swal.fire({
        title: "Está seguro?",
        text: "Saldrá de la sesión!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Salir!",
    }).then ((result) => {
        if(result.isConfirmed){
        localStorage.removeItem('sesion');
        window.location.href = "login.html";
        }
    });
   
}