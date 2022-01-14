﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Entities
{
    public class Wheel
    {
        public string Id { get; set; }
        public string Width { get; set; }
        public string Diameter { get; set; }
        public string BoltPattern { get; set; }
        public string Weight { get; set; }
        public string Material { get; set; }
        
        /// <summary>
        /// All locations where this type of wheel is stored.
        /// </summary>
        public ICollection<WheelStock> Locations { get; set; }
    }
}
