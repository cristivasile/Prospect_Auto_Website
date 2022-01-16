using API.Entities;
using API.Helpers;
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

        public async Task Create(LocationCreateModel newLocation)
        {
            var createdLocation = new Location()
            {
                Id = Utilities.GetGUID(),
                Address = newLocation.Address,
                EmployeeNumber = newLocation.EmployeeNumber,
                Size = newLocation.Size
            };

            await locationRepository.Create(createdLocation); 
        }

        public async Task<int> Delete(string id)
        {
            var foundLocation = await locationRepository.GetById(id);

            ///404 not found
            if (foundLocation == null)
                return -1;

            await locationRepository.Delete(foundLocation);
            return 0;
        }

        public async Task<List<LocationModel>> GetAll()
        {
            var locations = await Task.FromResult(
                (await locationRepository.GetAll())
                .Select(x => new LocationModel(x)).ToList());
            return locations;
        }

        public async Task<LocationModel> GetById(string id)
        {
            var location = await locationRepository.GetById(id);

            //404 not found
            if (location == null)
                return null;

            var foundLocation = new LocationModel(location);
            return foundLocation;
        }

        public async Task<int> Update(string id, LocationCreateModel updatedLocation)
        {
            var location = await locationRepository.GetById(id);

            //404 not found
            if (location == null)
                return -1;

            location.Address = updatedLocation.Address;
            location.EmployeeNumber = updatedLocation.EmployeeNumber;
            location.Size = updatedLocation.Size;

            await locationRepository.Update(location);
            return 0;
        }

    }
}
