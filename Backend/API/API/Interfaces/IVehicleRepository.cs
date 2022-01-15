using API.Entities;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IVehicleRepository
    {
        IQueryable<Vehicle> GetAll();
        Task<Vehicle> GetById(string id);
        Task Create(Vehicle newVehicle, Status newStatus);
        Task Update(Vehicle updatedVehicle);
        Task Delete(Vehicle toDelete);
    }
}
