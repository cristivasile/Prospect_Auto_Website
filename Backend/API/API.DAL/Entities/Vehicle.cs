using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Entities
{
    public class Vehicle
    {
        public string Id { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public int Odometer { get; set; }

        public int Year { get; set; }

        public int LocationId { get; set; }

        public int Price { get; set; }

        public Location Location { get; set; }

        public Status Status { get; set; }

        /// <summary>
        /// All features belonging to this vehicle.
        /// </summary>
        public ICollection<VehicleFeature> VehicleFeatures { get; set; }
    }
}

