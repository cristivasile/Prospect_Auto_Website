using API.DAL.Configurations;
using API.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DAL.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<VehicleFeature> VehicleFeature { get; set; }
        public DbSet<Wheel> Wheels { get; set; }
        public DbSet<WheelStock> WheelStock { get; set; }

        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //relationships

                //M - M: Wheel <-> Location

            modelBuilder.Entity<WheelStock>()
                .HasKey(x => new { x.WheelId, x.LocationId });

            modelBuilder.Entity<WheelStock>()
                .HasOne<Wheel>(x => x.Wheel)
                .WithMany(x => x.Locations)
                .HasForeignKey(x => x.WheelId);

            modelBuilder.Entity<WheelStock>()
                .HasOne<Location>(x => x.Location)
                .WithMany(x => x.Wheels)
                .HasForeignKey(x => x.LocationId);

            //data constraints

                // - for Feature
            modelBuilder.Entity<Feature>()
                .Property(x => x.Name)
                .IsRequired();

                // - for Location
            modelBuilder.Entity<Location>()
                .Property(x => x.Address)
                .IsRequired();

                // - for Status
            modelBuilder.Entity<Status>()
                .Property(x => x.VehicleId)
                .IsRequired();

            modelBuilder.Entity<Status>()
                .Property(x => x.VehicleStatus)
                .IsRequired();

                // - for Wheel
            modelBuilder.Entity<Wheel>()
                .Property(x => x.BoltPattern)
                .IsRequired();

            modelBuilder.Entity<Wheel>()
                .Property(x => x.Width)
                .IsRequired();

            modelBuilder.Entity<Wheel>()
                .Property(x => x.Diameter)
                .IsRequired();


            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new VehicleConfiguration());
            modelBuilder.ApplyConfiguration(new VehicleFeatureConfiguration());
        }
        
    }
}
