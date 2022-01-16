using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class VehicleModel : VehicleCreateModel
    {
        public string Id { get; set; }

        public VehicleModel(Vehicle x)
        {
            Id = x.Id;
            Brand = x.Brand;
            Model = x.Model;
            LocationId = x.LocationId;
            Odometer = x.Odometer;
            Price = x.Price;
            Year = x.Year;
        }
    }
}
