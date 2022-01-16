using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class LocationCreateModel
    {
        public string Address { get; set; }
        public string Size { get; set; }
        public int EmployeeNumber { get; set; }
    }
}
