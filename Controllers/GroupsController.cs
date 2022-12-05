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
    public class GroupsController : Controller
    {
        private readonly SocialDBContext _context;

        public GroupsController(SocialDBContext context)
        {
            _context = context;
        }

        // GET: Groups
        public async Task<IActionResult> Index()
        {
              return View(await _context.Groups.ToListAsync());
        }
        public async Task<IActionResult> UIndex()
        {
            return View(await _context.Groups.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Login(Admin model)
        {
            if (ModelState.IsValid)
            {
                var Admin = from m in _context.Admins select m;
                Admin = Admin.Where(s => s.Id.Equals(model.Id));
                if (Admin.Count() != 0)
                {
                    if (Admin.First().Password == model.Password)
                    {
                        return RedirectToAction("Index");
                    }
                }
            }
            return RedirectToAction("Fail");
        }
        public IActionResult Fail()
        {
            return View();
        }


        // GET: Groups/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Groups == null)
            {
                return NotFound();
            }

            var @group = await _context.Groups
                .FirstOrDefaultAsync(m => m.Id == id);
            if (@group == null)
            {
                return NotFound();
            }

            return View(@group);
        }

        // GET: Groups/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Groups/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,UsrCount")] Group @group)
        {
            if (ModelState.IsValid)
            {
                _context.Add(@group);

                var gh = new GroupHistory();
                gh.GroupsId = group.Id;
                gh.GroupName = group.Name;
                gh.GroupsUsrCount = group.UsrCount;
                gh.Status = "Created";
                _context.Add(gh);

                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(@group);
        }

        // GET: Groups/Create (from user)
        public IActionResult UCreate()
        {
            return View();
        }

        // POST: Groups/Create (from user)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UCreate([Bind("Id,Name,UsrCount")] Group @group)
        {
            if (ModelState.IsValid)
            {
                _context.Add(@group);


                var gh = new GroupHistory();
                gh.GroupsId = group.Id;
                gh.GroupName = group.Name;
                gh.GroupsUsrCount = group.UsrCount;
                gh.Status = "Created";
                _context.Add(gh);

                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(UIndex));
            }
            return View(@group);
        }
        // GET: Groups/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Groups == null)
            {
                return NotFound();
            }

            var @group = await _context.Groups.FindAsync(id);
            if (@group == null)
            {
                return NotFound();
            }
            return View(@group);
        }

        // POST: Groups/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,UsrCount")] Group @group)
        {
            if (id != @group.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(@group);

                    var gh = new GroupHistory();
                    gh.GroupsId = group.Id;
                    gh.GroupName = group.Name;
                    gh.GroupsUsrCount = group.UsrCount;
                    gh.Status = "Updated";
                    _context.Add(gh);

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GroupExists(@group.Id))
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
            return View(@group);
        }

        // GET: Groups/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Groups == null)
            {
                return NotFound();
            }

            var @group = await _context.Groups
                .FirstOrDefaultAsync(m => m.Id == id);
            if (@group == null)
            {
                return NotFound();
            }

            return View(@group);
        }

        // POST: Groups/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Groups == null)
            {
                return Problem("Entity set 'SocialDBContext.Groups'  is null.");
            }
            var @group = await _context.Groups.FindAsync(id);
            if (@group != null)
            {
                var gh = new GroupHistory();
                gh.GroupsId = group.Id;
                gh.GroupName = group.Name;
                gh.GroupsUsrCount = group.UsrCount;
                gh.Status = "Deleted";
                _context.Add(gh);

                _context.Groups.Remove(@group);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool GroupExists(int id)
        {
          return _context.Groups.Any(e => e.Id == id);
        }
    }
}
