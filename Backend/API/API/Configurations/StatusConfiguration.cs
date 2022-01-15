using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Configurations
{
    class StatusConfiguration : IEntityTypeConfiguration<Status>
    {
        public void Configure(EntityTypeBuilder<Status> builder)
        {
            //primary foreign
            builder
                .HasKey(x => x.VehicleId);

            builder
                .Property(x => x.VehicleStatus)
                .IsRequired();

            //nullable
            builder
                .Property(x => x.DateSold)
                .IsRequired(false);
        }
    }
}
