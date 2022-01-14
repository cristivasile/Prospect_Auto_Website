using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Entities
{
    public class Status
    {
        public int Id { get; set; }

        public string VehicleId { get; set; }

        /// <example>
        /// In stock, Sold, Deleted
        /// </example>
        public string VehicleStatus { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime DateSold { get; set; }

        public Vehicle Vehicle { get; set; }
    }
}
