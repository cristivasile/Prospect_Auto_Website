using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class LocationModel
    {
        public string Id { get; set; }
        public string Address { get; set; }
        public string Size { get; set; }
        public int EmployeeNumber { get; set; }

        public LocationModel(Location ob)
        {
            this.Id = ob.Id;
            this.Address = ob.Address;
            this.Size = ob.Size;
            this.EmployeeNumber = ob.EmployeeNumber;
        }
    }
}
