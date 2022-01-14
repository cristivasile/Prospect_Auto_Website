using Microsoft.EntityFrameworkCore;

namespace API.DAL.Entities
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

                //1 - 1: Vehicle <-> Status
            modelBuilder.Entity<Vehicle>()
                .HasOne<Status>(x => x.Status)
                .WithOne(x => x.Vehicle);

                //1 - M : Vehicle <-> Location
            modelBuilder.Entity<Vehicle>()
                .HasOne<Location>(x => x.Location)
                .WithMany(x => x.OwnedVehicles)
                .HasForeignKey(x => x.LocationId);

                //M - M: Vehicle <-> Feature
            modelBuilder.Entity<VehicleFeature>()
                .HasKey(x => new { x.VehicleId, x.FeatureId });


            modelBuilder.Entity<VehicleFeature>()
                .HasOne<Vehicle>(x => x.Vehicle)
                .WithMany(x => x.VehicleFeatures)
                .HasForeignKey(x => x.VehicleId);

            modelBuilder.Entity<VehicleFeature>()
                .HasOne<Feature>(x => x.Feature)
                .WithMany(x => x.FeatureVehicles)
                .HasForeignKey(x => x.FeatureId);

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
                // - for Vehicle
            modelBuilder.Entity<Vehicle>()
                .Property(x => x.Model)
                .IsRequired();

            modelBuilder.Entity<Vehicle>()
                .Property(x => x.Brand)
                .IsRequired();

            modelBuilder.Entity<Vehicle>()
                .Property(x => x.Price)
                .HasDefaultValue(0);

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
        }
        
    }
}
