using System;
using System.Collections.Generic;

namespace SocialMedia.Models
{
    public partial class GroupHistory
    {
        public int Id { get; set; }
        public string? GroupName { get; set; }
        public int? GroupsId { get; set; }
        public int? GroupsUsrCount { get; set; }
        public string? Status { get; set; }
    }
}
