using System;
using System.Collections.Generic;

namespace Social.Models
{
    public partial class Registeration
    {
        public int RegisterationId { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
    }
}
