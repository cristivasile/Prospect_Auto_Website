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
            var vehicles = await storage.Vehicles
                                .Include(x => x.Status)
                                .Include(x => x.Location)
                                .ToListAsync();
            return vehicles;
        }

        public async Task<List<Vehicle>> GetAvailable()
        {
            var vehicles = await storage.Vehicles
                             .Include(x => x.Status)
                             .Where(x => x.Status.VehicleStatus.ToLower() == "available")
                             .Include(x => x.Location)
                             .ToListAsync();

            return vehicles;
        }
        
        public async Task<Vehicle> GetById(string id)
        {
            var vehicles = await storage.Vehicles.Include(x => x.Status).Include(x => x.Location).Where(x => x.Id == id).ToListAsync();
            var vehicle = vehicles[0];
            return vehicle;
        }

        public async Task Create(Vehicle newVehicle, Status newStatus, List<VehicleFeature> features)
        {
            await storage.Vehicles.AddAsync(newVehicle);
            await storage.Statuses.AddAsync(newStatus);

            //assign features
            await storage.VehicleFeature.AddRangeAsync(features);

            await storage.SaveChangesAsync();
        }

        public async Task Update(Vehicle updatedVehicle, List<VehicleFeature> features)
        {
            await Task.FromResult(storage.Vehicles.Update(updatedVehicle));
            //delete old features
            storage.VehicleFeature.RemoveRange(storage.VehicleFeature.Where(x => x.VehicleId == updatedVehicle.Id));
            //assign new features
            await storage.VehicleFeature.AddRangeAsync(features);

            await storage.SaveChangesAsync();
        }

        public async Task Delete(Vehicle toDelete)
        {
            var features = await storage.VehicleFeature.Where(x => x.VehicleId == toDelete.Id)
                                                       .ToListAsync();
            foreach(var feature in features)
                await Task.FromResult(storage.VehicleFeature.Remove(feature));

            await Task.FromResult(storage.Vehicles.Remove(toDelete));
            await storage.SaveChangesAsync();
        }

        public async Task<List<Feature>> GetFeaturesByVehicleId(string id)
        {
            var features = await storage.VehicleFeature
                                        .Where(x => x.VehicleId == id)
                                        .Include(x => x.Feature)
                                        .Select(x => x.Feature)
                                        .OrderBy(x => -x.Desirability)
                                        .ToListAsync();

            return features;
        }

        public async Task UpdateStatus(Status updatedStatus)
        {
            try
            {
                storage.Statuses.Update(updatedStatus);
            }
            catch
            {
                var entity = storage.Statuses.First(x => x.VehicleId == updatedStatus.VehicleId);
                storage.Entry(entity).CurrentValues.SetValues(updatedStatus);
            }
            await storage.SaveChangesAsync();
        }
    }
}
