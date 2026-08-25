function ObtenerMateriales(){
    fetch('http://localhost:5002/api/Materiales')
    .then(response => response.json())
    .then(data => MostrarMateriales(data))
    .catch(error => console.log("No se pudo acceder a la api, verifique el error", error));
}


function MostrarMateriales(data) {

    $('#todosLosMateriales').empty();

    $.each(data, function (index, item) {

        $('#todosLosMateriales').append(
            "<tr>" +
            "<td>" + item.materialID + "</td>" +
            "<td>" + item.descripcion + "</td>" +
            "<td>" + item.precioCosto + "</td>" +
            // "<td>" + item.eliminado + "</td>" +
            

            "<td><button class='btn btn-info' onclick='BuscarMaterialId(" + item.materialID + ")'>Modificar</button></td>" +

            "<td><button class='btn btn-danger' onclick='EliminarMaterial(" + item.materialID + ")'>Eliminar</button></td>" +


            "</tr>"
        );

    });
}

// function CargarRubros() {
//     fetch("http://localhost:5002/api/Rubros")
//         .then(r => r.json())
//         .then(data => {
//             const combo = document.getElementById("RubroID");
//             combo.innerHTML = "";

//             data.forEach(rubro => {
//                 combo.innerHTML += `
//                     <option value="${rubro.rubroID}">
//                         ${rubro.descripcion}
//                     </option>`;
//             });
//         });
// }

// function CargarRubrosEditar() {
//     fetch("http://localhost:5002/api/Rubros")
//         .then(response => response.json())
//         .then(data => {
//             const combo = document.getElementById("RubroIDEditar");
//             combo.innerHTML = "";

//             data.forEach(rubro => {
//                 combo.innerHTML += `
//                     <option value="${rubro.rubroID}">
//                         ${rubro.descripcion}
//                     </option>`;
//             });
//         });
// }



// function CrearMaterial() {

//     let descripcion = document.getElementById("DescripcionMaterial").value;
//     let precioCosto = document.getElementById("PrecioCosto").value;
  

//     console.log("Descripcion:", descripcion);
//     console.log("Precio:", precioCosto);
    

//     if (descripcion.trim() === "") {
//         alert("Debe ingresar una descripción");
//         return;
//     }

//     if (precioCosto === "") {
//         alert("Debe ingresar un precio");
//         return;
//     }

//     // if (rubroID === "") {
//     //     alert("Debe seleccionar un rubro");
//     //     return;
//     // }

//     let material = {
//         descripcion: descripcion,
//         precioCosto: parseFloat(precioCosto),
//         // rubroID: parseInt(rubroID)
//     };

//     console.log("OBJETO QUE SE ENVÍA:", material);

//     fetch("http://localhost:5002/api/Materiales", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(material)
//     })
//     .then(async response => {

//         console.log("STATUS:", response.status);

//         let texto = await response.text();

//         console.log("RESPUESTA API:", texto);

//         if (!response.ok) {
//             alert("ERROR AL CREAR MATERIAL:\n" + texto);
//             return;
//         }

//         alert("Material creado correctamente");

//         document.getElementById("DescripcionMaterial").value = "";
//         document.getElementById("PrecioCosto").value = "";
//         // document.getElementById("RubroID").value = "";

//         ObtenerMateriales();

//     })
//     .catch(error => {

//         console.error("ERROR FETCH:", error);

//         alert("No se pudo conectar con la API");

//     });
// }

function CrearMaterial() {

    let descripcion = document.getElementById("DescripcionMaterial").value;
    let precioCosto = parseFloat(document.getElementById("PrecioCosto").value);

    if (descripcion.trim() === "") {
        alert("Por favor ingrese una descripción.");
        return;
    }

    if (isNaN(precioCosto) || precioCosto <= 0) {
        alert("El precio de costo debe ser mayor que cero.");
        return;
    }

    let material = {
        descripcion: descripcion,
        precioCosto: precioCosto
    };

    fetch("http://localhost:5002/api/Materiales", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(material)
    })
    .then(async response => {

        if (!response.ok) {
            let error = await response.text();
            console.error("Error API:", error);
            alert(error);
            return;
        }

        let data = await response.json();

        console.log("Material creado:", data);

        document.getElementById("DescripcionMaterial").value = "";
        document.getElementById("PrecioCosto").value = "";

        $("#modalAgregarMateriales").modal("hide");

        ObtenerMateriales();
    })
    .catch(error => {
        console.error("Error al crear material:", error);
        alert("No se pudo crear el material.");
    });
}

function EliminarMaterial(id) {

    let siElimina = confirm("¿Está seguro de borrar este material?");

    if (!siElimina) {
        return;
    }

    fetch(`http://localhost:5002/api/Materiales/${id}`, {
        method: "DELETE"
    })
    .then(async response => {

        if (!response.ok) {

            let mensaje = await response.text();

            alert(mensaje);

            return;
        }

        alert("Material eliminado correctamente.");

        ObtenerMateriales();
    })
    .catch(error => {

        console.error("Error:", error);

        alert("No se pudo acceder a la API.");
    });
}

function EliminarSi(id){
    fetch (`http://localhost:5002/api/Materiales/${id}`,
        {
            method : "DELETE"
        })
        .then (() => {
            ObtenerMateriales();
        })
        .catch (error => console.error("No se pudo acceder a la api, verifique el error ", error))
}

function BuscarMaterialId (id) {
    fetch (`http://localhost:5002/api/Materiales/${id}`,{
        method : "GET"
    })
    .then (response => response.json())
    .then (data => {
        document.getElementById("IdMaterial").value = data.materialID;
        document.getElementById("DescripcionMaterialEditar").value = data.descripcion;
        document.getElementById("PrecioCostoEditar").value = data.precioCosto;

        // setTimeout(() => {
        //     document.getElementById("RubroIDEditar").value = data.rubroID;
        // }, 100);
        


        $('#modalEditarMateriales').modal('show');
    })
    .catch (error => console.error("No se puedo acceder a la api, verifique el error", error));
}

// function BuscarMaterialId(id) {
//     fetch(`http://localhost:5002/api/Materiales/${id}`)
//         .then(response => response.json())
//         .then(data => {

//             CargarRubrosEditar();

//             document.getElementById("IdMaterial").value = data.materialID;
//             document.getElementById("DescripcionMaterialEditar").value = data.descripcion;
//             document.getElementById("PrecioCostoEditar").value = data.precioCosto;

          
//             setTimeout(() => {
//                 document.getElementById("RubroIDEditar").value = data.rubroID;
//             }, 100);

//             $("#modalEditarMateriales").modal("show");
//         });
// }

function EditarMaterial(){
    let idMaterial = document.getElementById("IdMaterial").value;

  let editarMaterial = {
    materialID: parseInt(idMaterial),
    descripcion: document.getElementById("DescripcionMaterialEditar").value,
    precioCosto: parseFloat(document.getElementById("PrecioCostoEditar").value),
    // rubroID: parseInt(document.getElementById("RubroIDEditar").value)
    
};

 fetch(`http://localhost:5002/api/Materiales/${idMaterial}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(editarMaterial)
})
.then(async response => {
    if (!response.ok) {
        console.error(await response.text());
        alert("No se pudo modificar el material.");
        return;
    }

    $("#modalEditarMateriales").modal("hide");
    ObtenerMateriales();
})
.catch(error => console.error(error));
;
}