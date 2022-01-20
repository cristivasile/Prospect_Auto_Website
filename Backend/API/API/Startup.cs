using API.Context;
using API.Entities;
using API.Interfaces;
using API.Managers;
using API.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;
using System.Text;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public object JwtBearerDefault { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

                //for auth token in swagger
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
                //--
            });

            services.AddControllersWithViews()
                   .AddNewtonsoftJson(options =>
                   options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddScoped<IVehicleRepository, VehicleRepository>();
            services.AddScoped<IVehicleManager, VehicleManager>();

            services.AddScoped<ILocationManager, LocationManager>();
            services.AddScoped<ILocationRepository, LocationRepository>();

            services.AddScoped<IFeatureManager, FeatureManager>();
            services.AddScoped<IFeatureRepository, FeatureRepository>();

            services.AddScoped<IWheelManager, WheelManager>();
            services.AddScoped<IWheelRepository, WheelRepository>();

            services.AddDbContext<AppDbContext>(options => options
                                                            .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
                                                            .UseSqlServer(Configuration.GetConnectionString("ConnString")));

            services.AddCors();

            /*
            services.AddCors(options =>
            {
                options.AddPolicy(name: "_allowSpecificOrigins",
                                  builder =>
                                  {
                                      builder.WithOrigins("localhost:4200", "http://localhost:4200/", "https://localhost:4200/").AllowAnyMethod().AllowAnyHeader();
                                  });
            });
            */

            //-- authentication config
            services.AddIdentity<User, Role>()
                    .AddEntityFrameworkStores<AppDbContext>();
            services.AddScoped<IAuthenticationManager, AuthenticationManager>();
            services.AddScoped<ITokenManager, TokenManager>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer("AuthScheme", options => {
                    options.SaveToken = true;
                    var secret = Configuration.GetSection("Jwt").GetSection("Token").Get<string>();
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        RequireExpirationTime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddAuthorization(options => {
                options.AddPolicy("User", policy => policy.RequireRole("User")
                .RequireAuthenticatedUser().AddAuthenticationSchemes("AuthScheme").Build());

                options.AddPolicy("Admin", policy => policy.RequireRole("Admin")
                .RequireAuthenticatedUser().AddAuthenticationSchemes("AuthScheme").Build());

                options.AddPolicy("Sysadmin", policy => policy.RequireRole("Sysadmin")
                .RequireAuthenticatedUser().AddAuthenticationSchemes("AuthScheme").Build());
            });

            //---
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            //app.UseCors("_allowSpecificOrigins");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
