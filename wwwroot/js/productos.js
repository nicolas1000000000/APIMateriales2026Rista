
let productoSeleccionado = 0;

function ObtenerProductos() {

    fetch('http://localhost:5002/api/Productos')
        .then(response => response.json())
        .then(data => {

            console.log("PRODUCTOS:", data);

            MostrarProductos(data);
        })
        .catch(error =>
            console.log("Error:", error)
        );
}

function MostrarProductos(data) {

    $('#todosLosProductos').empty();

    $.each(data, function (index, item) {

        $('#todosLosProductos').append(
            "<tr>" +
            "<td>" + item.productoID + "</td>" +
            "<td class = text-center>" + item.descripcion + "</td>" +
            "<td class = text-center>$" + Number(item.costoTotal || 0).toFixed(2) + "</td> " +
            "<td class='text-center'>$" + Number(item.precioVenta || 0).toFixed(2) + "</td>" +
            "<td class='text-center'>" + Number(item.porcentajeGanancia || 0).toFixed(2) + "%</td>" +


            "<td class = text-center><button class='btn btn-info' onclick='BuscarProductoId(" + item.productoID + ")'>Modificar</button></td>" +

            "<td class = text-center><button class='btn btn-danger' onclick='EliminarProducto(" + item.productoID + ")'>Eliminar</button></td>" +

            "<td class = text-center><button class='btn btn-warning' onclick='AbrirComposicion(" + item.productoID + ")'>Composición</button></td>" +

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

    let productoID = parseInt(document.getElementById("ProductoIDComposicion").value);

    let materialID = parseInt(document.getElementById("MaterialID").value);

    let cantidad = parseFloat(document.getElementById("CantidadMaterial").value);

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
        <td class = "text-center">${Number(x.cantidad).toFixed(2)}</td>
        <td class = "text-center">$ ${Number(x.precioCostoUnitario).toFixed(2)}</td>
        <td class = "text-center">$ ${Number(x.subtotal).toFixed(2)}</td>

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

            $("#lblCostoTotal").text( "$" + Number(total).toFixed(2));
        })
        .catch(error => {
            console.error("Error al cargar composición:", error);
        });
}




function CrearProducto() {
    var descripcion = document.getElementById("DescripcionProducto").value;
    if (descripcion == "" || descripcion == null) {
        return mensajesError('#error', null, "Por favor ingrese una descripcion");
    }
    let producto = {
        descripcion: document.getElementById("DescripcionProducto").value,
    
    };

    fetch('http://localhost:5002/api/Productos',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }
    )

        .then(response => response.json())
        .then(data => {
            if (data.status == undefined) {
                document.getElementById("DescripcionProducto").value = "";
                document.getElementById("PrecioCosto").value = "";
                // document.getElementById("MaterialID").value = "";
                $("#error").empty();
                $("#error").attr("hidden", true);

                $("#modalAgregarProductos").modal('hide');
                ObtenerProductos();
            }
            else {
                mensajesError('#error', data);
            }
        })
        .catch(error => console.log("Hubo un error al guardar el nuevo , verifique el error", error))

}

function EliminarProducto(id) {
    var siElimina = confirm("¿Esta seguro de borrar este producto?")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`http://localhost:5002/api/Productos/${id}`,
        {
            method: "DELETE"
        })
        .then(() => {
            ObtenerProductos();
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el error ", error))
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



function BuscarProductoId(id) {

    fetch(`http://localhost:5002/api/Productos/${id}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            document.getElementById("IdProducto").value = data.productoID;
            document.getElementById("DescripcionProductoEditar").value = data.descripcion;
            document.getElementById("PrecioCostoEditar").value = Number(data.costoTotal).toFixed(2);
            document.getElementById("PorcentajeGananciaEditar").value = data.porcentajeGanancia;
            document.getElementById("PrecioVentaEditar").value = Number(data.precioVenta).toFixed(2);

            $('#modalEditarProductos').modal('show');
        })


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

function EditarProducto() {

    let idProducto =
        parseInt(document.getElementById("IdProducto").value);

    let costoTotal = parseFloat(document.getElementById("PrecioCostoEditar").value);

    function EditarProducto() {

        let idProducto = parseInt(document.getElementById("IdProducto").value);

        let porcentajeGanancia = parseFloat(
            document.getElementById("PorcentajeGananciaEditar").value
        );

        // VALIDAR PORCENTAJE
        if (isNaN(porcentajeGanancia) ||  porcentajeGanancia < 0 || porcentajeGanancia > 100)
             { 
                alert("El porcentaje de ganancia debe estar entre 0 y 100.");
                return;
        }

let precioVenta = parseFloat(document.getElementById("PrecioVentaEditar").value);

        let editarProducto = {

            productoID: idProducto,

            descripcion:
                document.getElementById("DescripcionProductoEditar").value,

            costoTotal:
                parseFloat(
                    document.getElementById("PrecioCostoEditar").value
                ),

            porcentajeGanancia: porcentajeGanancia,

            precioVenta: precioVenta
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
            .catch(error => {

                console.error(error);

                alert("Ocurrió un error al modificar el producto.");
            });
    }

    let porcentajeGanancia =
        parseFloat(
            document.getElementById("PorcentajeGananciaEditar").value
        );



    let precioVenta =
        parseFloat(
            document.getElementById("PrecioVentaEditar").value
        );

    let editarProducto = {

        productoID: idProducto,

        descripcion:
            document.getElementById("DescripcionProductoEditar").value,

        costoTotal: costoTotal,

        porcentajeGanancia: porcentajeGanancia,

        precioVenta: precioVenta
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
        .catch(error => {

            console.error(error);

            alert("Ocurrió un error al modificar el producto.");
        });
}

function CalcularPrecioVenta() {

    let costo = parseFloat(
        document.getElementById("PrecioCostoEditar").value
    );

    let porcentaje = parseFloat(
        document.getElementById("PorcentajeGananciaEditar").value
    );

    if (isNaN(costo)) {
        costo = 0;
    }

    if (isNaN(porcentaje)) {
        porcentaje = 0;
    }

    let ganancia = costo * porcentaje / 100;

    let precioVenta = costo + ganancia;

    document.getElementById("PrecioVentaEditar").value =
        precioVenta.toFixed(2);
}

function GenerarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Listado de Productos", 14, 20);

    let fecha = new Date().toLocaleDateString();

    doc.setFontSize(10);
    doc.text("Fecha: " + fecha, 14, 28);

    let filas = [];

    $("#todosLosProductos tr").each(function () {

        let id = $(this).find("td").eq(0).text();
        let descripcion = $(this).find("td").eq(1).text();
        let costoTotal = $(this).find("td").eq(2).text();
        let precioVenta = $(this).find("td").eq(3).text();
        let porcentajeGanancia = $(this).find("td").eq(4).text();

        filas.push([
            id,
            descripcion,
            costoTotal,
            precioVenta,
            porcentajeGanancia
        ]);
    });

    doc.autoTable({
        startY: 35,

        head: [
            ["ID", "Descripción", "Costo Total", "Precio Venta", "Porcentaje Ganancia"]
        ],

        body: filas,

        headStyles: {
            halign: "center"
        },

        bodyStyles: {
            halign: "center"
        }
    });

    doc.save("Productos.pdf");
}

