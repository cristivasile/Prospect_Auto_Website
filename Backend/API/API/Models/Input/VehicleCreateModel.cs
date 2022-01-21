using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class VehicleCreateModel
    {
        public string Brand { get; set; }

        public string Model { get; set; }

        public int Odometer { get; set; }

        public int Year { get; set; }

        public float EngineSize { get; set; }

        public int Power { get; set; }

        public string LocationId { get; set; }

        public float Price { get; set; }
    }
}
