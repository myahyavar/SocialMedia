using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SocialMedia.Models;

namespace SocialMedia.Controllers
{
    public class GroupHistoriesController : Controller
    {
        private readonly SocialDBContext _context;

        public GroupHistoriesController(SocialDBContext context)
        {
            _context = context;
        }

        // GET: GroupHistories
        public async Task<IActionResult> Index()
        {
              return View(await _context.GroupHistories.ToListAsync());
        }

        // GET: GroupHistories/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.GroupHistories == null)
            {
                return NotFound();
            }

            var groupHistory = await _context.GroupHistories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (groupHistory == null)
            {
                return NotFound();
            }

            return View(groupHistory);
        }

        // GET: GroupHistories/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: GroupHistories/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,GroupName,GroupsId,GroupsUsrCount,Status")] GroupHistory groupHistory)
        {
            if (ModelState.IsValid)
            {
                _context.Add(groupHistory);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(groupHistory);
        }

        // GET: GroupHistories/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.GroupHistories == null)
            {
                return NotFound();
            }

            var groupHistory = await _context.GroupHistories.FindAsync(id);
            if (groupHistory == null)
            {
                return NotFound();
            }
            return View(groupHistory);
        }

        // POST: GroupHistories/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,GroupName,GroupsId,GroupsUsrCount,Status")] GroupHistory groupHistory)
        {
            if (id != groupHistory.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(groupHistory);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GroupHistoryExists(groupHistory.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(groupHistory);
        }

        // GET: GroupHistories/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.GroupHistories == null)
            {
                return NotFound();
            }

            var groupHistory = await _context.GroupHistories
                .FirstOrDefaultAsync(m => m.Id == id);
            if (groupHistory == null)
            {
                return NotFound();
            }

            return View(groupHistory);
        }

        // POST: GroupHistories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.GroupHistories == null)
            {
                return Problem("Entity set 'SocialDBContext.GroupHistories'  is null.");
            }
            var groupHistory = await _context.GroupHistories.FindAsync(id);
            if (groupHistory != null)
            {
                _context.GroupHistories.Remove(groupHistory);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool GroupHistoryExists(int id)
        {
          return _context.GroupHistories.Any(e => e.Id == id);
        }
    }
}
