using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string FirstName { get; set; } = string.Empty;

        [Column(TypeName = "varchar(50)")]
        public string LastName { get; set; } = string.Empty;

        [Column(TypeName = "varchar(13)")]
        public string Cnp { get; set; } = string.Empty;

        [Column(TypeName = "varchar(10)")]
        public string PhoneNumber { get; set; } = string.Empty;

        public int RoomNumber { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime StopDate { get; set; }

    }
}
