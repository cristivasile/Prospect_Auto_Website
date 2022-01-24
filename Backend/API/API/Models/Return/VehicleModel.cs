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
        public string LocationAddress { get; set; }

        public VehicleModel(Vehicle x)
        {
            Id = x.Id;
            Brand = x.Brand;
            Model = x.Model;
            LocationId = x.LocationId;
            if(x.Location != null)
                LocationAddress = x.Location.Address;
            if (x.Image != null)
                Image = x.Image;
            Odometer = x.Odometer;
            Power = x.Power;
            EngineSize = x.EngineSize;
            Price = x.Price;
            Year = x.Year;
        }
    }
}
