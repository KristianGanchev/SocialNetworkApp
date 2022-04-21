namespace API.Data;

using API.Data.Models.Base;
using API.Infrastructure.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


public class SocialNetworkDbContext : IdentityDbContext<User>
{
    private readonly ICurrentUserService currentUser;

    public SocialNetworkDbContext(DbContextOptions<SocialNetworkDbContext> options, ICurrentUserService currentUser)
        : base(options)
    {
        this.currentUser = currentUser;
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder
            .Entity<Post>()
            .HasQueryFilter(p => !p.IsDeleted)
            .HasOne(p => p.Author)
            .WithMany(a => a.Posts)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        base.OnModelCreating(builder);
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        this.ApplyAuditInfo();

        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    {
        this.ApplyAuditInfo();

        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private void ApplyAuditInfo() =>
        this.ChangeTracker
            .Entries()
            .ToList()
            .ForEach(entry =>
            {
                var userName = this.currentUser.GetUserName();

                if(entry.Entity is IDeletableEntity deletableEntity)
                {
                    if(entry.State == EntityState.Deleted)
                    {
                        deletableEntity.DeletedOn = DateTime.UtcNow;
                        deletableEntity.DeletedBy = userName;
                        deletableEntity.IsDeleted = true;

                        entry.State = EntityState.Modified;
                    }
                }

                if(entry.Entity is IEntity entity)
                {
                    if(entry.State == EntityState.Added)
                    {
                        entity.CreatedOn = DateTime.UtcNow;
                        entity.CreatedBy = userName;
                    }
                    else if(entry.State == EntityState.Modified)
                    {
                        entity.UpdatedOn = DateTime.UtcNow;
                        entity.UpdatedBy = userName; 
                    }
                }
            });
    

    
}
