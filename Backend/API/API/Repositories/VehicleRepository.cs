using API.Context;
using API.Entities;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public IQueryable<Vehicle> GetAll()
        {
            var vehicles = storage.Vehicles;
            return vehicles;
        }

        public async Task Create(Vehicle newVehicle, Status newStatus)
        {
            await storage.Vehicles.AddAsync(newVehicle);
            await storage.Statuses.AddAsync(newStatus);
            await storage.SaveChangesAsync();
        }

        public async Task Update(Vehicle updatedVehicle)
        {
            storage.Vehicles.Update(updatedVehicle);
            await storage.SaveChangesAsync();
        }

        public async Task Delete(Vehicle toDelete)
        {
            storage.Vehicles.Remove(toDelete);
            await storage.SaveChangesAsync();
        }
    }
}
