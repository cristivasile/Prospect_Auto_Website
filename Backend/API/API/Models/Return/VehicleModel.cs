using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class VehicleModel
    {
        public string Id { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public int Odometer { get; set; }

        public int Year { get; set; }

        public string LocationId { get; set; }

        public int Price { get; set; }

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
