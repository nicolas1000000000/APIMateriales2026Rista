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
    public class MaterialesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MaterialesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Materiales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Material>>> GetMateriales()
        {
            return await _context.Materiales.ToListAsync();
        }

        // GET: api/Materiales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> GetMaterial(int id)
        {
            var material = await _context.Materiales.FindAsync(id);

            if (material == null)
            {
                return NotFound();
            }

            return material;
        }



        // PUT: api/Materiales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterial(int id, Material material)
        {
            if (id != material.MaterialID)
            {
                return BadRequest();
            }

            _context.Entry(material).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


//      


        // POST: api/Materiales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
[HttpPost]
public async Task<ActionResult<Material>> PostMaterial(Material material)
{
    if (string.IsNullOrWhiteSpace(material.Descripcion))
    {
        return BadRequest("La descripción es obligatoria.");
    }

    if (material.PrecioCosto <= 0)
    {
        return BadRequest("El precio de costo debe ser mayor que cero.");
    }

    _context.Materiales.Add(material);

    await _context.SaveChangesAsync();

    return CreatedAtAction(
        nameof(GetMaterial),
        new { id = material.MaterialID },
        material
    );
}
              


        // DELETE: api/Materiales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            var material = await _context.Materiales.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }



            _context.Materiales.Remove(material);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MaterialExists(int id)
        {
            return _context.Materiales.Any(e => e.MaterialID == id);
        }
    }
}
