var productos = JSON.parse(localStorage.getItem('productos')) || [];
var seleccionado = null;

function registrarProducto(){
    var nomProducto = document.getElementById('nomProducto').value;
    var precio = document.getElementById('precio').value;
    var costo = document.getElementById('costo').value;
    var stock = document.getElementById('stock').value;
    
    
    if(nomProducto == '' || costo == '' || precio == ''||  stock == ''){
        Swal.fire({
            title: "Faltan datos!",
            text: "Por favor rellene todos los campos del formulario!",
            icon: "warning"
        });
        return;
    }

    var producto = {
        nomProducto,
        precio,
        costo: costo,
        stock
    }

    if (seleccionado != null) {
        productos[seleccionado] = producto;
    } else {
        productos.push(producto);
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    window.location.href = 'productos.html';
}

function cargarDatos(){
    var cadena = '';
    
    for(let i = 0; i < productos.length; i++){

        cadena += ` <tr>
                        <td>${i+1}</td>
                        <td>${productos[i].nomProducto}</td>
                        <td>${productos[i].costo}</td>
                        <td>${productos[i].precio}</td>
                        <td>${productos[i].stock}</td>
                        <td>
                            <div class="acciones">
                                <button onclick="editarProducto(${i})" class="btn btn-edit m5">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button onclick="eliminarProducto(${i})" class="btn btn-delete m5">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`

    }
    if (productos.length == 0) {
        cadena += `<tr>
                        <td colspan="6" align="center">
                            <br>
                            <br>
                                No hay productos registrados!
                                <br>
                                <br>
                                <br>
                                <a href="productosForm.html" class="btn btn-nuevo">
                                    <i class="fa fa-plus"></i>
                                    Nuevo
                                </a>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
                    </tr>
                    `;
    }

    document.getElementById("listaProductos").innerHTML = cadena;    
}

function eliminarProducto(posicion){
    Swal.fire({
        title: "Está seguro?",
        text: "El producto se eliminará!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero eliminar!",
    }).then((result) => {
        if (result.isConfirmed) {            
            productos.splice(posicion, 1);
            localStorage.setItem('productos', JSON.stringify(productos));
            cargarDatos();
 
            Swal.fire({
                title: "Eliminado!",
                text: "Tu producto ha sido eliminado.",
                icon: "success",
            });
        }
    });
}

function editarProducto(posicion){

    localStorage.setItem('producto_seleccionado', posicion);
    window.location.href = 'productosForm.html';
}

function setearDatos(){
    seleccionado = localStorage.getItem('producto_seleccionado');

    if(seleccionado != null && seleccionado >= 0 && seleccionado!= 'undefined'){
    var elProducto = productos[seleccionado];

    document.getElementById('nomProducto').value = elProducto.nomProducto;
    document.getElementById('costo').value = elProducto.costo;
    document.getElementById('precio').value = elProducto.precio;
    document.getElementById('stock').value = elProducto.stock;
    }
}	

function buscarProducto(){

    var buscador = document.getElementById('buscar').value;
    var nuevoArray = [];

    if(buscador.trim() == "" || buscador.trim() == null){
        nuevoArray = JSON.parse(localStorage.getItem('productos')) || [];
    } else {
        for (let i=0; i < productos.length; i++){
            var texto = productos[i].nomProducto.toLowerCase();
            if(texto.search(buscador.toLowerCase()) >= 0) {
                nuevoArray.push(productos[i]);
            }
        }
    }
    productos = nuevoArray;
    cargarDatos();
}