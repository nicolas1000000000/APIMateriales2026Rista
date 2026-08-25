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
    public class RubrosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RubrosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Rubros
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rubro>>> GetRubros()
        {
            return await _context.Rubros.ToListAsync();
        }

        // GET: api/Rubros/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rubro>> GetRubro(int id)
        {
            var rubro = await _context.Rubros.FindAsync(id);

            if (rubro == null)
            {
                return NotFound();
            }

            return rubro;
        }

        // PUT: api/Rubros/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRubro(int id, Rubro rubro)
        {
            if (id != rubro.RubroID)
            {
                return BadRequest();
            }

            _context.Entry(rubro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RubroExists(id))
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

        // POST: api/Rubros
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rubro>> PostRubro(Rubro rubro)
        {
            _context.Rubros.Add(rubro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRubro", new { id = rubro.RubroID }, rubro);
        }

        // DELETE: api/Rubros/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRubro(int id)
        {
            var rubro = await _context.Rubros.FindAsync(id);
            if (rubro == null)
            {
                return NotFound();
            }




            _context.Rubros.Remove(rubro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RubroExists(int id)
        {
            return _context.Rubros.Any(e => e.RubroID == id);
        }
    }
}
