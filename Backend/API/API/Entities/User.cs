using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class User : IdentityUser
    {
        public virtual List<Role> Roles { get; set; }
    }
}
