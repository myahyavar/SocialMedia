using System;
using System.Collections.Generic;

namespace SocialMedia.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public int? GroupId { get; set; }

        public virtual Group? Group { get; set; }
    }
}
