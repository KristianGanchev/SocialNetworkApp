﻿namespace API.Infrastructure.Extensions;

using System.Security.Claims;

public static class IdentityExtensions
{
    public static string GetId(this ClaimsPrincipal user) =>
        user
        .Claims
        .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
        ?.Value;
}
