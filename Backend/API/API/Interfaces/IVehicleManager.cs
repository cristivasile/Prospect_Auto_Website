﻿using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IVehicleManager
    {
        Task<List<VehicleModel>> GetAll();
        Task<List<VehicleModel>> GetAvailable();
        Task Create(VehicleCreateModel newVehicle);
        Task<int> Update(string id, VehicleCreateModel updatedVehicle);
        Task<int> Delete(string id);
    }
}
