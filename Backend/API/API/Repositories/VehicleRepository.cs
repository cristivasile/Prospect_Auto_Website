using API.Context;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly AppDbContext storage;
        
        public VehicleRepository(AppDbContext context)
        {
            storage = context;
        }

        public async Task<List<VehicleModel>> GetAll()
        {
            var vehicles = await storage.Vehicles.ToListAsync();

            List<VehicleModel> returned = new(); 
            foreach(var vehicle in vehicles)
            {
                VehicleModel auxVehicle = new()
                {
                    Id = vehicle.Id,
                    Brand = vehicle.Brand,
                    Model = vehicle.Model,
                    Odometer = vehicle.Odometer,
                    Year = vehicle.Year,
                    LocationId = vehicle.LocationId,
                    Price = vehicle.Price
                };

                returned.Add(auxVehicle);
            }

            return returned;
        }
    }
}
