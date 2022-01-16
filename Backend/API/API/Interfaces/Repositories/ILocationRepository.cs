﻿using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAll();
        Task<Location> GetById(string id);
        Task Create(Location newLocation);
        Task Update(Location updatedLocation);
        Task Delete(Location toDelete);
    }
}
