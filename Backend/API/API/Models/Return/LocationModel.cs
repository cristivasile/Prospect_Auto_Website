using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class LocationModel : LocationCreateModel
    {
        public string Id { get; set; }

        public LocationModel(Location ob)
        {
            this.Id = ob.Id;
            this.Address = ob.Address;
            this.Size = ob.Size;
            this.EmployeeNumber = ob.EmployeeNumber;
        }
    }
}
