using API.Interfaces;
using API.Models;
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
        private readonly ILocationManager locationManager;

        public LocationController(ILocationManager manager)
        {
            locationManager = manager;
        }

        [HttpGet("getAll")]
        [Authorize(Policy = "User")]
        public async Task<IActionResult> ReadLocations()
        {
            var locations = await locationManager.GetAll();
            return Ok(locations);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "User")]
        public async Task<IActionResult> ReadById([FromRoute] string id)
        {
            var location = await locationManager.GetById(id);
            if (location == null)
                return NotFound();
            return Ok(location);
        }

        [HttpPost]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> CreateLocation([FromBody] LocationCreateModel newLocation)
        {
            await locationManager.Create(newLocation);
            return Ok();
        }


        [HttpPut("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> UpdateLocation([FromRoute] string id, [FromBody] LocationCreateModel updatedLocation)
        {
            if (await locationManager.Update(id, updatedLocation) == -1)
                return NotFound();

            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> DeleteLocation([FromRoute] string id)
        {
            if (await locationManager.Delete(id) == -1)
                return NotFound();

            return Ok();
        }

    }
}
