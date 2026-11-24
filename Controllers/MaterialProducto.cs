using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIMateriales2026Rista.Models;

namespace APIMateriales2026Rista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialProductoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MaterialProductoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MaterialProducto/Producto/1
        [HttpGet("Producto/{productoId}")]
        public async Task<ActionResult> GetMaterialesProducto(int productoId)
        {
            var lista = await _context.MaterialProductos
                .Include(x => x.Material)
                .Where(x => x.ProductoID == productoId)
                .Select(x => new
                {
                    x.MaterialProductoID,
                    Material = x.Material.Descripcion,
                    x.Cantidad,
                    x.PrecioCostoUnitario,
                    x.Subtotal
                })
                .ToListAsync();

            return Ok(lista);
        }

        // POST
        [HttpPost]
        public async Task<ActionResult> Post(MaterialProducto dto)
        {
            var material = await _context.Materiales
                .FindAsync(dto.MaterialID);

            if (material == null)
                return BadRequest("Material inexistente.");

            var producto = await _context.Productos
                .FindAsync(dto.ProductoID);

            if (producto == null)
                return BadRequest("Producto inexistente.");

            if (dto.Cantidad <= 0)
                return BadRequest("La cantidad debe ser mayor que cero.");

            // Obtener costo del material
            dto.PrecioCostoUnitario = material.PrecioCosto;

            // Calcular subtotal
            dto.Subtotal = dto.Cantidad * dto.PrecioCostoUnitario;

            // Guardar composición
            _context.MaterialProductos.Add(dto);

            await _context.SaveChangesAsync();

            // Actualizar costo del producto
            await ActualizarCostoProducto(dto.ProductoID);

            return Ok(dto);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var mp = await _context.MaterialProductos
                .FindAsync(id);

            if (mp == null)
                return NotFound();

            int productoId = mp.ProductoID;

            _context.MaterialProductos.Remove(mp);

            await _context.SaveChangesAsync();

            await ActualizarCostoProducto(productoId);

            return NoContent();
        }

        // CALCULAR COSTO TOTAL
        private async Task ActualizarCostoProducto(int productoId)
        {
            decimal total = await _context.MaterialProductos
                .Where(x => x.ProductoID == productoId)
                .SumAsync(x => x.Subtotal);

            var producto = await _context.Productos
                .FindAsync(productoId);

            if (producto == null)
                return;

            producto.CostoTotal = total;

            await _context.SaveChangesAsync();
        }
    }
}