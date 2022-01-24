using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class VehicleWithFeaturesModel : VehicleCreateModel
    {
        public string Id { get; set; }
        public Status Status { get; set; }
        new public List<Feature> Features { get; set; }

        public VehicleWithFeaturesModel(Vehicle x, List<Feature> features)
        {
            Id = x.Id;
            Brand = x.Brand;
            Model = x.Model;
            LocationId = x.LocationId;

            if (x.Status != null)
                Status = x.Status;

            if (x.Image != null)
                Image = x.Image;

            if (features != null)
                Features = features;

            Odometer = x.Odometer;
            Power = x.Power;
            EngineSize = x.EngineSize;
            Price = x.Price;
            Year = x.Year;
        }
    }
}
