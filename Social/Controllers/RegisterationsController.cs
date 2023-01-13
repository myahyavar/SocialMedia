using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Social.Models;

namespace Social.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterationsController : ControllerBase
    {
        private readonly SocialMediaContext _context;

        public RegisterationsController(SocialMediaContext context)
        {
            _context = context;
        }

        // GET: api/Registerations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registeration>>> GetRegisterations()
        {
            return await _context.Registerations.ToListAsync();
        }

        // GET: api/Registerations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Registeration>> GetRegisteration(int id)
        {
            var registeration = await _context.Registerations.FindAsync(id);

            if (registeration == null)
            {
                return NotFound();
            }

            return registeration;
        }

        // PUT: api/Registerations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegisteration(int id, Registeration registeration)
        {
            if (id != registeration.RegisterationId)
            {
                return BadRequest();
            }

            _context.Entry(registeration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisterationExists(id))
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

        // POST: api/Registerations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Registeration>> PostRegisteration(Registeration registeration)
        {
            _context.Registerations.Add(registeration);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegisteration", new { id = registeration.RegisterationId }, registeration);
        }

        // DELETE: api/Registerations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegisteration(int id)
        {
            var registeration = await _context.Registerations.FindAsync(id);
            if (registeration == null)
            {
                return NotFound();
            }

            _context.Registerations.Remove(registeration);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegisterationExists(int id)
        {
            return _context.Registerations.Any(e => e.RegisterationId == id);
        }
    }
}
