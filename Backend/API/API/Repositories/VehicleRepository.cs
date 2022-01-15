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

        public async Task<List<Vehicle>> GetAll()
        {
            var vehicles = await storage.Vehicles.ToListAsync();
            return vehicles;
        }

        public async Task<List<Vehicle>> GetAvailable()
        {
            var vehicles = await storage.Vehicles
                             .Include(x => x.Status)
                             .Where(x => x.Status.VehicleStatus.ToLower() == "available")
                             .ToListAsync();
            return vehicles;
        }
        
        public async Task<Vehicle> GetById(string id)
        {
            var vehicle = await storage.Vehicles.FindAsync(id);
            return vehicle;
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
