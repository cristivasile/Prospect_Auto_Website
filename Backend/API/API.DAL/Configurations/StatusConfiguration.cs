﻿using API.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DAL.Configurations
{
    class StatusConfiguration : IEntityTypeConfiguration<Status>
    {
        public void Configure(EntityTypeBuilder<Status> builder)
        {
            builder
                .Property(x => x.VehicleId)
                .IsRequired();

            builder
                .Property(x => x.VehicleStatus)
                .IsRequired();
        }
    }
}
