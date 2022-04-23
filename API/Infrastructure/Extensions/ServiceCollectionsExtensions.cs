namespace API.Infrastructure.Extensions;

using API.Features.Identity.Services;
using API.Features.Posts.Services;
using API.Infrastructure.Filters;
using API.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;


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
            .AddScoped<ICurrentUserService, CurrentUserService>()
            .AddTransient<IIdentityService, IdentityService>()
            .AddTransient<IPostServices, PostService>();

    public static void AddApiControllers(this IServiceCollection services) =>
        services.AddControllers(options => options.Filters.Add<ModelOrNotFoundActionFilter>());

    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Social Network API", Version = "v1" });
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "Jwt auth header",
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
        });

        return services;
    }
}
