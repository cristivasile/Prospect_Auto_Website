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
        Task<List<VehicleModel>> GetAll();
    }
}
