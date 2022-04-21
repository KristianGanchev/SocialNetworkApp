using API.Infrastructure.Extensions;
using System.Security.Claims;

namespace API.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly ClaimsPrincipal user;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor) =>
        this.user = httpContextAccessor.HttpContext?.User;

    public string GetId() => 
        this.user?.GetId();

    public string GetUserName() =>
        this.user?.Identity?.Name;
}
