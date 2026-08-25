function ObtenerRubros(){
    fetch('http://localhost:5002/api/Rubros')
    .then(response => response.json())
    .then(data => MostrarRubros(data))
    .catch(error => console.log("No se pudo acceder a la api, verifique el error", error));
}


function MostrarRubros(data) {

    $('#todosLosRubros').empty();

    $.each(data, function (index, item) {

        $('#todosLosRubros').append(
            "<tr>" +
            "<td>" + item.rubroID + "</td>" +
            "<td>" + item.descripcion + "</td>" +
            
            // "<td>" + item.eliminado + "</td>" +
            

            "<td><button class='btn btn-info' onclick='BuscarRubroId(" + item.rubroID + ")'>Modificar</button></td>" +

            "<td><button class='btn btn-danger' onclick='EliminarRubro(" + item.rubroID + ")'>Eliminar</button></td>" +

            // "<td><button class='btn btn-secondary' onclick='VerHistorial(" + item.rubroID + ")'>Historial</button></td>" +

            "</tr>"
        );

    });
}

// function VerHistorial(id) {



function CrearRubro (){
    var descripcion = document.getElementById("DescripcionRubro").value;
    if(descripcion == "" || descripcion == null){
        return mensajesError('#error', null, "Por favor ingrese una descripcion");
    }
 let rubro = {
    descripcion : document.getElementById("DescripcionRubro").value,


 };

 fetch('http://localhost:5002/api/Rubros',
    {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(rubro)
    }
 )

 .then (response => response.json())
 .then(data => {
    if (data.status == undefined){
        document.getElementById("DescripcionRubro").value = "";
        

        $("#error").empty();
        $("#error").attr("hidden", true);

        $("#modalAgregarRubros").modal('hide');
        ObtenerRubros();
    }
    else {
        mensajesError ('#error', data);
    }
 })
 .catch (error => console.log("Hubo un error al guardar el nuevo , verifique el error", error))

}

function EliminarRubro(id){
    var siElimina = confirm ("¿Esta seguro de borrar este rubro?")
      if (siElimina == true) {
            EliminarSi(id);
        }  
}

function EliminarSi(id){
    fetch (`http://localhost:5002/api/Rubros/${id}`,
        {
            method : "DELETE"
        })
        .then (() => {
            ObtenerRubros();
        })
        .catch (error => console.error("No se pudo acceder a la api, verifique el error ", error))
}

function BuscarRubroId (id) {
    fetch (`http://localhost:5002/api/Rubros/${id}`,{
        method : "GET"
    })
    .then (response => response.json())
    .then (data => {
        document.getElementById("IdRubro").value = data.rubroID;
        document.getElementById("DescripcionRubroEditar").value = data.descripcion;
     

        $('#modalEditarRubros').modal('show');
    })
    .catch (error => console.error("No se puedo acceder a la api, verifique el error", error));
}

function EditarRubro(){
    let idRubro = document.getElementById("IdRubro").value;

    let editarRubro = {
        rubroID : idRubro,
        descripcion : document.getElementById("DescripcionRubroEditar").value,
        
    }

   fetch(`http://localhost:5002/api/Rubros/${idRubro}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
       body: JSON.stringify(editarRubro)
    })
    
 .then(() => {
    $("#modalEditarRubros").modal("hide");
    ObtenerRubros();
});
}
 