using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string Size { get; set; }
        public string EmployeeNumber { get; set; }
        public ICollection<Vehicle> OwnedVehicles { get; set; }
    }
}
