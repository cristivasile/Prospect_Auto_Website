using API.Context;
using API.Entities;
using API.Interfaces;
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
        private readonly IVehicleRepository vehicleRepository;

        public VehicleController(IVehicleRepository vehicleRepository)
        {
            this.vehicleRepository = vehicleRepository;
        }
        
        [HttpGet("getAll")]
        public async Task<IActionResult> ReadVehicles()
        {
            var vehicles = await vehicleRepository.GetAll();
            return Ok(vehicles);
        }

        /*
        [HttpGet("getAvailable")]
        public async Task<IActionResult> ReadAvailableVehicles()
        {

            var vehicles = storage.Vehicles.ToList();

            return Ok(vehicles);
        }

        [HttpPost("")]
        public async Task<IActionResult> CreateVehicle()
        {

            Vehicle newVehicle = new() {
                Id = Guid.NewGuid().ToString(),
                Brand = "TestBrand",
                Model = "TestModel",
                LocationId = 3,
                Odometer = 12345,
                Price = 9999,
                Year = 1945
            };

            await storage.Vehicles.AddAsync(newVehicle);
            await storage.SaveChangesAsync();

            return Ok();
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle([FromRoute] string id, [FromBody] string newBrand)
        {

            var currentVehicle = await storage.Vehicles.FirstOrDefaultAsync(x => x.Id == id);
            if (currentVehicle == null)
                return NotFound();
            currentVehicle.Brand = newBrand;

            storage.Vehicles.Update(currentVehicle);

            await storage.SaveChangesAsync();
            return Ok();
        }
        */
    } 
}
