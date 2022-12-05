using System;
using System.Collections.Generic;

namespace SocialMedia.Models
{
    public partial class Group
    {
        public Group()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int UsrCount { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
