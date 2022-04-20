using API.Data;
using API.Data.Models;
using API.Features.Identity.Services;
using API.Infrastructure.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Infrastructure.Extensions;

public static class ServiceCollectionsExtensions
{
    public static AppSettings GetAppSettings(this IServiceCollection services, IConfiguration configuration)
    {
        var appSettingsConfiguration = configuration.GetSection("ApplicationSettings");
        services.Configure<AppSettings>(appSettingsConfiguration);
        return appSettingsConfiguration.Get<AppSettings>();
    }

    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration) =>
        services.AddDbContext<SocialNetworkDbContext>(options => options
        .UseSqlServer(configuration.GetDefaultConnectionString()));

    public static IServiceCollection AddIdentity(this IServiceCollection services)
    {
        services
            .AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
            .AddEntityFrameworkStores<SocialNetworkDbContext>();

        return services;
    }

    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, AppSettings appSettings)
    {
        var key = Encoding.ASCII.GetBytes(appSettings.Secret);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        return services;
    }

    public static IServiceCollection AddApplicationServices(this IServiceCollection services) =>
        services
            .AddTransient<IIdentityService, IdentityService>();

    public static void AddApiControllers(this IServiceCollection services) => 
        services.AddControllers(options => options.Filters.Add<ModelOrNotFoundActionFilter>());
}
