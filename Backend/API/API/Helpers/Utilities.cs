using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public static class Utilities
    {
        public static string GetGUID() => Guid.NewGuid().ToString();
    }
}
