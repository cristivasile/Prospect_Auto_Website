using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Entities
{
    public class WheelStock
    {
        public int LocationId { get; set; }
        public string WheelId { get; set; }
        /// <summary>
        /// Number of wheels at the location.
        /// </summary>
        public int Stock { get; set; }

        public Location Location { get; set; }
        public Wheel Wheel { get; set; }
        
    }
}
