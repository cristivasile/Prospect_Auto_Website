using API.Interfaces;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public class LocationManager : ILocationManager
    {
        private readonly ILocationRepository locationRepository;

        public LocationManager(ILocationRepository repository)
        {
            locationRepository = repository;
        }

        public Task Create(LocationCreateModel newVehicle)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<LocationModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<LocationModel> GetById(string id)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(string id, LocationCreateModel updatedVehicle)
        {
            throw new NotImplementedException();
        }

        Task<List<LocationModel>> ILocationManager.GetAll()
        {
            throw new NotImplementedException();
        }

        Task<LocationModel> ILocationManager.GetById(string id)
        {
            throw new NotImplementedException();
        }
    }
}
