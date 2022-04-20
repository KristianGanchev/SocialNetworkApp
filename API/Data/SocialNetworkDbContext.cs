using API.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class SocialNetworkDbContext : IdentityDbContext<User>
{
    public SocialNetworkDbContext(DbContextOptions<SocialNetworkDbContext> options)
        : base(options)
    {

    }
}
