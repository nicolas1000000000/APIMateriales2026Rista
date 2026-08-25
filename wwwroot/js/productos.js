
let productoSeleccionado = 0;

function ObtenerProductos(){
    fetch('http://localhost:5002/api/Productos')
    .then(response => response.json())
    .then(data => MostrarProductos(data))
    .catch(error => console.log("No se pudo acceder a la api, verifique el error", error));
}

function MostrarProductos(data) {

    $('#todosLosProductos').empty();

    $.each(data, function (index, item) {

        $('#todosLosProductos').append(
            "<tr>" +
            "<td>" + item.productoID + "</td>" +
            "<td>" + item.descripcion + "</td>" +
            "<td>" + item.costoTotal + "</td>" +

            "<td><button class='btn btn-info' onclick='BuscarProductoId(" + item.productoID + ")'>Modificar</button></td>" +

            "<td><button class='btn btn-danger' onclick='EliminarProducto(" + item.productoID + ")'>Eliminar</button></td>" +

            "<td><button class='btn btn-primary' onclick='AbrirComposicion(" + item.productoID + ")'>Composición</button></td>" +

            "</tr>"
        );

    });
}


function AbrirComposicion(id) {

    productoSeleccionado = id;

    document.getElementById("ProductoIDComposicion").value = id;

    CargarComboMateriales();
    CargarComposicion();

    $("#modalComposicion").modal("show");
}

function CargarComboMateriales() {

    fetch("http://localhost:5002/api/Materiales")
        .then(response => response.json())
        .then(data => {

            $("#MaterialID").empty();

            data.forEach(material => {

                $("#MaterialID").append(`
                    <option value="${material.materialID}">
                        ${material.descripcion}
                    </option>
                `);

            });

        })
        .catch(error => {
            console.error("Error al cargar materiales:", error);
        });
}

// function AgregarMaterial() {
//     const productoID = Document.getElementById("IdProducto").value;
//     const materialID = Document.getElementById("MaterialID")
//     const cantidad = Document.getElementById("CantidadMaterial")
// }



// function AgregarMaterial(){

// let material = {

//     productoID: productoSeleccionado,

//     materialID: parseInt(
//         document.getElementById("MaterialID").value
//     ),

//     //  productoID: parseInt(
//     //     document.getElementById("productoID").value
//     // ),

//     cantidad: parseInt(
//         document.getElementById("CantidadMaterial").value
//     )

    

// };


// fetch("http://localhost:5002/api/MaterialProducto",{

//     method:"POST",

//     headers:{
//         "Content-Type":"application/json"
//     },

//     body:JSON.stringify(material)

// })

// .then(response=>{

//     if(!response.ok){
//         return response.text().then(t=>console.log(t));
//     }

//     CargarComposicion();

// });

// }

function AgregarMaterial() {

    let productoID = parseInt(
        document.getElementById("ProductoIDComposicion").value
    );

    let materialID = parseInt(
        document.getElementById("MaterialID").value
    );

    let cantidad = parseFloat(
        document.getElementById("CantidadMaterial").value
    );

    let composicion = {
        productoID: productoID,
        materialID: materialID,
        cantidad: cantidad
    };

    fetch("http://localhost:5002/api/MaterialProducto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(composicion)
    })
    .then(async response => {

        if (!response.ok) {
            let error = await response.text();
            console.error(error);
            alert("Se agrego el material");
            return;
        }

        // Limpiar cantidad
        document.getElementById("CantidadMaterial").value = "";

        // Cerrar modal
        $("#modalComposicion").modal("hide");

        // Actualizar productos
        ObtenerProductos();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al guardar.");
    });
}


// function CargarComposicion(){

// fetch(`http://localhost:5002/api/MaterialProducto/Producto/${productoSeleccionado}`)

// .then(response => {

//     console.log("Estado API:", response.status);

//     return response.text();

// })

// .then(texto => {

//     console.log("Respuesta API:", texto);

//     let data = JSON.parse(texto);


//     $("#tbodyMateriales").empty();

//     let total = 0;


//     data.forEach(x=>{

//         total += x.subtotal;


//         $("#tbodyMateriales").append(`

//         <tr>

//             <td>${x.material}</td>
//             <td>${x.cantidad}</td>
//             <td>${x.precioCostoUnitario}</td>
//             <td>${x.subtotal}</td>

//         </tr>

//         `);

//     });


//     $("#lblCostoTotal").text(total);


// });

// }

function CargarComposicion() {

    let productoID = parseInt(
        document.getElementById("ProductoIDComposicion").value
    );

    fetch(`http://localhost:5002/api/MaterialProducto/Producto/${productoID}`)
        .then(response => {

            if (!response.ok) {
                throw new Error("Error al obtener la composición");
            }

            return response.json();
        })
        .then(data => {

            $("#tbodyMateriales").empty();

            let total = 0;

            data.forEach(x => {

                total += x.subtotal;

                $("#tbodyMateriales").append(`
                    <tr>
                        <td>${x.material}</td>
        <td>${Number(x.cantidad).toFixed(2)}</td>
        <td>${Number(x.precioCostoUnitario).toFixed(2)}</td>
        <td>${Number(x.subtotal).toFixed(2)}</td>

                        <td>
                            <button 
                                class="btn btn-danger"
                                onclick="EliminarMaterial(${x.materialProductoID})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `);
            });

          $("#lblCostoTotal").text(Number(total).toFixed(2));
        })
        .catch(error => {
            console.error("Error al cargar composición:", error);
        });
}




function CrearProducto (){
    var descripcion = document.getElementById("DescripcionProducto").value;
    if(descripcion == "" || descripcion == null){
        return mensajesError('#error', null, "Por favor ingrese una descripcion");
    }
let producto = {
    descripcion: document.getElementById("DescripcionProducto").value,
    precioCosto: parseFloat(document.getElementById("PrecioCosto").value)
};

 fetch('http://localhost:5002/api/Productos',
    {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(producto)
    }
 )

 .then (response => response.json())
 .then(data => {
    if (data.status == undefined){
        document.getElementById("DescripcionProducto").value = "";
         document.getElementById("PrecioCosto").value = "";
        // document.getElementById("MaterialID").value = "";
        

        $("#error").empty();
        $("#error").attr("hidden", true);

        $("#modalAgregarProductos").modal('hide');
        ObtenerProductos();
    }
    else {
        mensajesError ('#error', data);
    }
 })
 .catch (error => console.log("Hubo un error al guardar el nuevo , verifique el error", error))

}

function EliminarProducto(id){
    var siElimina = confirm ("¿Esta seguro de borrar este producto?")
      if (siElimina == true) {
            EliminarSi(id);
        }  
}

function EliminarSi(id){
    fetch (`http://localhost:5002/api/Productos/${id}`,
        {
            method : "DELETE"
        })
        .then (() => {
            ObtenerProductos();
        })
        .catch (error => console.error("No se pudo acceder a la api, verifique el error ", error))
}


// function EliminarMaterial(id){
//     fetch(`http://localhost:5002/api/MaterialProducto/${id}`,{
//         method:"DELETE"
//     })
//     .then(()=>{
//         CargarComposicion();
//     });
// }

function EliminarMaterial(id) {

    fetch(`http://localhost:5002/api/MaterialProducto/${id}`, {
        method: "DELETE"
    })
    .then(async response => {

        if (!response.ok) {
            let error = await response.text();
            alert(error);
            return;
        }

        CargarComposicion();
        ObtenerProductos();
    })
    .catch(error => {
        console.error("Error al eliminar:", error);
    });
}



function BuscarProductoId (id) {
    fetch (`http://localhost:5002/api/Productos/${id}`,{
        method : "GET"
    })
    .then (response => response.json())
    .then (data => {
        document.getElementById("IdProducto").value = data.productoID;
        document.getElementById("DescripcionProductoEditar").value = data.descripcion;
        document.getElementById("PrecioCostoEditar").value = data.costoTotal;
        


        $('#modalEditarProductos').modal('show');
    })
    .catch (error => console.error("No se puedo acceder a la api, verifique el error", error));
}


// function BuscarProductoId (id) {
//     fetch (`http://localhost:5002/api/Productos/${id}`,{
//         method : "GET"
//     })
//     .then (response => response.json())
//     .then (data => {
//         document.getElementById("IdProducto").value = data.productoID;
//         document.getElementById("DescripcionProductoEditar").value = data.descripcion;
     
//          setTimeout(() => {
//                 document.getElementById("MaterialIDEditar").value = data.MaterialID;
//             }, 100);

//         $('#modalEditarProductos').modal('show');
//     })
//     .catch (error => console.error("No se puedo acceder a la api, verifique el error", error));
// }

function EditarProducto(){
    let idProducto = document.getElementById("IdProducto").value;

    let editarProducto = {
        productoID : idProducto,
        descripcion : document.getElementById("DescripcionProductoEditar").value,
          precioCosto: parseFloat(document.getElementById("PrecioCostoEditar").value),
    
        
    };

     fetch(`http://localhost:5002/api/Productos/${idProducto}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(editarProducto)
})
.then(async response => {
    if (!response.ok) {
        console.error(await response.text());
        alert("No se pudo modificar el producto.");
        return;
    }

    $("#modalEditarProductos").modal("hide");
    ObtenerProductos();
})
.catch(error => console.error(error));

}



