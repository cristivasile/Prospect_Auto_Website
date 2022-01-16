using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        /*
        [HttpGet("getAll")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> ReadVehicles()
        {
            var vehicles = await vehicleManager.GetAll();
            return Ok(vehicles);
        }
        */

        private readonly ILocationManager locationManager;

        public LocationController(ILocationManager manager)
        {
            locationManager = manager;
        }

        [HttpGet("getAll")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> ReadLocations()
        {
            var vehicles = await locationManager.GetAll();
            return Ok(vehicles);
        }


    }
}
