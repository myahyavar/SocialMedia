using System;
using System.Collections.Generic;

namespace Social.Models
{
    public partial class Participant
    {
        public int ParticipantId { get; set; }
        public string? ParticipantName { get; set; }
        public string? Group { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string? PhotoFileName { get; set; }
    }
}
