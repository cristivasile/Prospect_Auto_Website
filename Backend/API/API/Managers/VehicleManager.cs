using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace API.Managers
{
    public class VehicleManager : IVehicleManager
    {
        private readonly IVehicleRepository vehicleRepository;

        public VehicleManager(IVehicleRepository manager)
        {
            this.vehicleRepository = manager;
        }

        public async Task<List<VehicleModel>> GetAll()
        {
            var vehicles = await vehicleRepository.GetAll()
                                    .Select(x => new VehicleModel(x)).ToListAsync();

            return vehicles;
        }

        public async Task<List<VehicleModel>> GetAllGrouped()
        {
            //TODO - this
            /*
            var vehicles = await vehicleRepository.GetAll().GroupBy(x => x.LocationId).ToListAsync();

            List<VehicleModel> returned = new();
            foreach (var vehicle in vehicles)
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
            */
            throw new System.NotImplementedException();
        }

        public async Task<List<VehicleModel>> GetAvailable()
        {
            var vehicles = await vehicleRepository
                                .GetAll().Include(x => x.Status)
                                .Where(x => x.Status.VehicleStatus.ToLower() == "available")
                                .Select(x => new VehicleModel(x))
                                .ToListAsync();

            return vehicles;
        }

        public async Task Create(VehicleCreateModel vehicle)
        {
            Vehicle newVehicle = new()
            {
                Id = Utilities.GetGUID(),
                Brand = vehicle.Brand,
                Model = vehicle.Model,
                LocationId = vehicle.LocationId,
                Odometer = vehicle.Odometer,
                Price = vehicle.Price,
                Year = vehicle.Year
            };

            Status newStatus = new()
            {
                VehicleId = newVehicle.Id,
                VehicleStatus = "available",
                DateAdded = System.DateTime.Now,
                DateSold = null
            };

            await vehicleRepository.Create(newVehicle, newStatus);
        }

        public async Task<int> Update(string id, VehicleCreateModel updatedVehicle)
        {
            var currentVehicle = await vehicleRepository.GetAll()
                                        .FirstOrDefaultAsync(x => x.Id == id);

            ///404 not found
            if (currentVehicle == null)
                return -1;

            currentVehicle.Brand = updatedVehicle.Brand;
            currentVehicle.Model = updatedVehicle.Model;
            currentVehicle.Price = updatedVehicle.Price;
            currentVehicle.Odometer = updatedVehicle.Odometer;
            currentVehicle.LocationId = updatedVehicle.LocationId;
            currentVehicle.Year = updatedVehicle.Year;

            await vehicleRepository.Update(currentVehicle);
            return 0;
        }

        public async Task<int> Delete(string id)
        {
            var currentVehicle = await vehicleRepository.GetAll()
                                        .FirstOrDefaultAsync(x => x.Id == id);

            ///404 not found
            if (currentVehicle == null)
                return -1;

            await vehicleRepository.Delete(currentVehicle);
            return 0;
        }

        public async Task<VehicleModel> GetById(string id)
        {
            var vehicle = await vehicleRepository.GetById(id);

            VehicleModel returned = null;
            if (vehicle == null)
                return returned;

            returned = new (vehicle);

            return returned;
        }
    }
}
