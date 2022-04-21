﻿namespace API.Features.Identity.Services;

public interface IIdentityService
{
    string GenerateJwtToken(string userId, string userName, string secret);
}
