using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIMateriales2026Rista.Models;

namespace APIMateriales2026Rista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Productos
[HttpGet]
public async Task<ActionResult> GetProductos()
{
    var productos = await _context.Productos
        .Select(p => new
        {
            p.ProductoID,
            p.Descripcion,

            CostoTotal = _context.MaterialProductos
                .Where(mp => mp.ProductoID == p.ProductoID)
                .Select(mp => (decimal?)mp.Subtotal)
                .Sum() ?? 0,

            p.PorcentajeGanancia,
            p.PrecioVenta
        })
        .ToListAsync();

    return Ok(productos);
}

        // GET: api/Productos/5
 [HttpGet("{id}")]
public async Task<ActionResult> GetProducto(int id)
{
    var producto = await _context.Productos
        .FindAsync(id);

    if (producto == null)
    {
        return NotFound();
    }

    decimal costoTotal = await _context.MaterialProductos
        .Where(x => x.ProductoID == id)
        .Select(x => (decimal?)x.Subtotal)
        .SumAsync() ?? 0;

    return Ok(new
    {
        producto.ProductoID,
        producto.Descripcion,
        CostoTotal = costoTotal,
        producto.PorcentajeGanancia,
        producto.PrecioVenta
    });
}

        // PUT: api/Productos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
 [HttpPut("{id}")]
public async Task<IActionResult> PutProducto(int id, Producto producto)
{
    if (id != producto.ProductoID)
    {
        return BadRequest();
    }

        if (producto.PorcentajeGanancia < 0 || producto.PorcentajeGanancia > 100)
    {
        return BadRequest("El porcentaje de ganancia debe estar entre 0 y 100.");
    }

    _context.Entry(producto).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!ProductoExists(id))
        {
            return NotFound();
        }

        throw;
    }

    return NoContent();
}

        // POST: api/Productos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducto", new { id = producto.ProductoID }, producto);
           
        }

public void RecalcularCostoProducto(int ProductoID)
{
   
}

        // DELETE: api/Productos/5
       [HttpDelete("{id}")]
public async Task<IActionResult> DeleteProducto(int id)
{
    var producto = await _context.Productos.FindAsync(id);

    if (producto == null)
    {
        return NotFound();
    }

    _context.Productos.Remove(producto);

    await _context.SaveChangesAsync();

    return NoContent();
}


private bool ProductoExists(int id)
{
    return _context.Productos.Any(e => e.ProductoID == id);
}

}

    }






