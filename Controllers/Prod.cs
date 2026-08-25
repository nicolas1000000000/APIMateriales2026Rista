//   [HttpPost]
//         public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
//         {
//             if(string.IsNullOrEmpty(cliente.NombreCliente))
//                 return BadRequest("El Nombre del Cliente no puede quedar vacio.");


//             if(string.IsNullOrEmpty(cliente.ApellidoCliente))
//                 return BadRequest("El Apellido del Cliente no puede quedar vacio.");

//             if(string.IsNullOrEmpty(cliente.Dni.ToString()))
//                 return BadRequest("El DNI del Cliente no puede quedar vacio.");

//             _context.Cliente.Add(cliente);
//             await _context.SaveChangesAsync();

//             return CreatedAtAction("GetCliente", new { id = cliente.Id }, cliente);
//         }

// ---------------------------------------
//          [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteCliente(int id)
//         {
//             var cliente = await _context.Cliente.FindAsync(id);
//             if (cliente == null)
//             {
//                 return NotFound();
//             }

//             var clienteEnVentas = await _context.Venta.Where(v => v.ClienteId == id).FirstOrDefaultAsync();
//             if (clienteEnVentas != null)
//             {
//                 return BadRequest("No se puede eliminar el cliente porque tiene ventas asociadas.");
//             }

//             try
//             {
//                 _context.Cliente.Remove(cliente);
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!ClienteExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }
//             catch (DbUpdateException)
//             {
//                 return BadRequest("No se puede eliminar el cliente porque tiene ventas asociadas.");
//             }

//             return Ok("");
//         }

//         private bool ClienteExists(int id)
//         {
//             return _context.Cliente.Any(e => e.Id == id);
//         }
  
// ----------------------------

//        [HttpGet]
//         public async Task<ActionResult<IEnumerable<Venta>>> GetVenta()
//         {
//             return await _context.Venta.Include(x => x.Cliente).ToListAsync();
//         }

//         // GET: api/Ventas/5
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Venta>> GetVenta(int id)
//         {
//             var venta = await _context.Venta.FindAsync(id);

//             if (venta == null)
//             {
//                 return NotFound();
//             }

//             return venta;
//         }

//         // GET: api/Ventas/5/detalle
//         [HttpGet("{id}/detalle")]
//         public async Task<IActionResult> GetDetalleVenta(int id)
//         {
//             var detalle = await _context.VentaDetalle
//                 .Where(d => d.VentaId == id)
//                 .Include(d => d.Producto)
//                 .Select(d => new
//                 {
//                     nombreProducto = d.Producto!.NombreProducto,
//                     cantidad = d.Cantidad,
//                     precioUnitario = d.PrecioUnitario
//                 })
//                 .ToListAsync();

//             return Ok(detalle);
//         }


//         ------------------------------------------


//           [HttpPost]
//         public async Task<ActionResult<Venta>> PostVenta(Venta venta)
//         {
//             if (venta.ClienteId == 0)
//                 return BadRequest("Debe seleccionar un Cliente.");

//             if (venta.FechaVenta == DateTime.MinValue)
//                 return BadRequest("La Fecha de Venta es obligatoria.");

//             if (venta.ImporteTotal == 0)
//                 return BadRequest("El Importe Total de la Venta deb e ser mayor a 0.");

//             if (venta.VentaDetalle != null)
//             {
//                 foreach (var detalleVenta in venta.VentaDetalle)
//                 {
//                     //DE CADA DETALLE BUSCAMOS EN LA TABLA PRODUCTO ESE PRODUCTO EN ESPECIFICO
//                     var producto = await _context.Producto.FindAsync(detalleVenta.ProductoId);

//                     //SI EL PRODUCTO NO LO ENCUENTRA
//                     if (producto == null)
//                         return BadRequest($"El producto con ID {detalleVenta.ProductoId} no existe.");
                
//                     //SI EL PRODUCTO TIENE CANTIDAD MENOR A LO QUIERE VENDER DAR ERROR
//                     if (producto.Cantidad < detalleVenta.Cantidad)
//                         return BadRequest($"Stock insuficiente para '{producto.NombreProducto}'. " +
//                                           $"Stock disponible: {producto.Cantidad}, cantidad solicitada: {detalleVenta.Cantidad}.");
//                 }
//             }


//             using var transaction = await _context.Database.BeginTransactionAsync();
//             // using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
//             {
//                 try
//                 {
//                     _context.Venta.Add(venta);
//                     await _context.SaveChangesAsync();

//                     // Funcion que actualiza el stock de los productos vendidos.
//                     if (venta.VentaDetalle != null)
//                     {
//                         foreach (var item in venta.VentaDetalle)
//                         {
//                             await RestarStockProducto(item.ProductoId, item.Cantidad);
//                         }
//                     }

//                     // Funcion que actualiza el saldo del cliente.
//                     await SumarSaldoCliente(venta.ClienteId, venta.ImporteTotal);

//                     // scope.Complete();
//                     transaction.Commit();

//                     return CreatedAtAction("GetVenta", new { id = venta.Id }, venta);
//                 }
//                 catch (Exception ex)
//                 {
//                     transaction.Rollback();
//                     return BadRequest(ex.Message);
//                 }
//             }
//         }

//         ------------------------------------------------

//           [HttpPatch("RestarStockProducto")]
//         public async Task RestarStockProducto(int productoId, int cantidadRestar)
//         {
//             var producto = await _context.Producto.FindAsync(productoId);
//             if (producto != null)
//             {
//                 producto.Cantidad -= cantidadRestar;
//                 await _context.SaveChangesAsync();
//             }
//         }


//            [HttpPatch("SumarSaldoCliente")]
//         public async Task SumarSaldoCliente(int clienteId, float importeTotal)
//         {
//             var cliente = await _context.Cliente.FindAsync(clienteId);
//             if (cliente != null)
//             {
//                 cliente.Saldo += importeTotal;
//                 await _context.SaveChangesAsync();
//             }
//         }


//         -----------------------------------


//                [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteVenta(int id)
//         {
//             // var venta = await _context.Venta.FindAsync(id);
//             var venta = await _context.Venta.Include(x => x.VentaDetalle).Where(x => x.Id == id).FirstOrDefaultAsync();
//             if (venta == null)
//             {
//                 return NotFound();
//             }

//             using var transaction = await _context.Database.BeginTransactionAsync();
//             {
//                 try
//                 {
//                     // Funcion que actualiza el stock de los productos.
//                     if (venta.VentaDetalle != null)
//                     {
//                         foreach (var item in venta.VentaDetalle)
//                         {
//                             await SumarStockProducto(item.ProductoId, item.Cantidad);
//                         }
//                     }

//                     // Funcion que actualiza el saldo del cliente.
//                     await RestarSaldoCliente(venta.ClienteId, venta.ImporteTotal);

//                     _context.Venta.Remove(venta);
//                     await _context.SaveChangesAsync();

//                     transaction.Commit();
//                 }
//                 catch (DbUpdateConcurrencyException)
//                 {
//                     transaction.Rollback();

//                     if (!VentaExists(id))
//                     {
//                         return NotFound();
//                     }
//                     else
//                     {
//                         throw;
//                     }
//                 }
//             }

//             return NoContent();
//         }

//         private bool VentaExists(int id)
//         {
//             return _context.Venta.Any(e => e.Id == id);
//         }
    

   //  ---------------------------------------


//     if (producto.FechaAlta > DateTime.Now)
// {
//     return BadRequest("La fecha no puede ser futura.");
// }



// ------------------------------

// VA AL FINAL DEL PUT :

    // if (alumnoOriginal.Domicilio != alumnoEditado.Domicilio)
    // {
    //     _context.HistorialAlumnos.Add(new HistorialAlumno
    //     {
    //         AlumnoID = alumnoOriginal.AlumnoID,
    //         CampoModificado = "Domicilio",
    //         ValorAnterior = alumnoOriginal.Domicilio,
    //         ValorNuevo = alumnoEditado.Domicilio,
    //         FechaCambio = DateTime.Now
    //     });
    // }

    // // ACTUALIZAR DATOS
   
    // alumnoOriginal.Domicilio = alumnoEditado.Domicilio;

    // await _context.SaveChangesAsync();

    // return Ok();