using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Entities
{
    public class AppDbContext : DbContext
    {
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Location> Locations { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //1 - 1: Vehicle <-> Status
            modelBuilder.Entity<Vehicle>()
                .HasOne(x => x.Status)
                .WithOne(x => x.Vehicle);

            //M - 1: Location -> Vehicle
            modelBuilder.Entity<Location>()
                .HasMany(x => x.OwnedVehicles)
                .WithOne(x => x.Location);
        }
        
    }
}
