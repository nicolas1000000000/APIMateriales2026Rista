function CargarProductos(){
     fetch("http://localhost:5002/api/Productos")
      .then(response => response.json())
        .then(data => {

            $("#ProductoID").empty();

            data.forEach(producto => {

                $("#ProductoID").append(`
                    <option value="${producto.productoID}">
                        ${producto.descripcion}
                    </option>
                `);

            });

        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
        });
}

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
                        <td>${x.producto}</td>
        <td class = "text-center">${Number(x.cantidad).toFixed(2)}</td>
        <td class = "text-center">$ ${Number(x.precioCostoUnitario).toFixed(2)}</td>
        <td class = "text-center">$ ${Number(x.subtotal).toFixed(2)}</td>

                        
                    </tr>
                `);
            });

            $("#lblCostoTotal").text( "$" + Number(total).toFixed(2));
        })
        .catch(error => {
            console.error("Error al cargar composición:", error);
        });
}