using API.Context;
using API.Entities;
using API.Interfaces;
using API.Managers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    //TODO - decide security levels

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

        [HttpGet("getAllGroupedByLocation")]
        public async Task<IActionResult> ReadGroupedVehicles()
        {
            var vehicles = await vehicleManager.GetAllGrouped();
            return Ok(vehicles);
        }

        /// <summary>
        /// Get all vehicles that have an associated "available" status.
        /// </summary>
        [HttpGet("getAvailable")]
        public async Task<IActionResult> ReadAvailableVehicles()
        {
            var vehicles = await vehicleManager.GetAvailable();
            return Ok(vehicles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadById([FromRoute] string id)
        {
            var vehicle = await vehicleManager.GetById(id);
            if (vehicle == null)
                return NotFound();
            return Ok(vehicle);
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
        [Authorize(Policy = "Admin")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] string id)
        {
            if (await vehicleManager.Delete(id) == -1)
                return NotFound();

            return Ok();
        }
    } 
}
