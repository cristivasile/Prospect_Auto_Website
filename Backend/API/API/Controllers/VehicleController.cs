using API.Context;
using API.Entities;
using API.Interfaces;
using API.Managers;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleManager vehicleManager;

        public VehicleController(IVehicleManager manager)
        {
            this.vehicleManager = manager;
        }
        
        [HttpGet("getAll")]
        public async Task<IActionResult> ReadVehicles()
        {
            var vehicles = await vehicleManager.GetAll();
            return Ok(vehicles);
        }

        [HttpGet("getAvailable")]
        public async Task<IActionResult> ReadAvailableVehicles()
        {
            var vehicles = await vehicleManager.GetAvailable();
            return Ok(vehicles);
        }


        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleCreateModel vehicle)
        {
            await vehicleManager.Create(vehicle);
            return Ok();
        }
        
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle([FromRoute] string id, [FromBody] VehicleCreateModel updatedVehicle)
        {
            if (await vehicleManager.Update(id, updatedVehicle) == -1)
                return NotFound();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] string id)
        {
            if (await vehicleManager.Delete(id) == -1)
                return NotFound();

            return Ok();
        }
    } 
}
