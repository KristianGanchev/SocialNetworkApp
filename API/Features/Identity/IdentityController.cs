﻿namespace API.Features.Identity;

using API.Features.Identity.Services;


public class IdentityController : ApiController
{
    private readonly UserManager<User> userManager;
    private readonly IIdentityService identityService;
    private readonly AppSettings appSettings;

    public IdentityController(
        UserManager<User> userManager,
        IIdentityService identityService,
        IOptions<AppSettings> appSettings)
    {
        this.userManager = userManager;
        this.identityService = identityService;
        this.appSettings = appSettings.Value;
    }

    [HttpPost]
    [Route(nameof(Register))]
    public async Task<ActionResult> Register(RegiserRequestModel model)
    {
        var user = new User
        {
            Email = model.Email,
            UserName = model.UserName,
        };

        var result = await this.userManager.CreateAsync(user, model.Password);

        if(result.Succeeded)
        {
            return Ok();
        }

        return BadRequest(result.Errors);
    }

    [HttpPost]
    [Route(nameof(Login))]
    public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
    {
        var user = await this.userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return Unauthorized();
        }

        var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

        if(!passwordValid)
        {
            return Unauthorized();
        }

        var token = this.identityService.GenerateJwtToken(user.Id, user.UserName, this.appSettings.Secret);

        return new LoginResponseModel(token);
    }
}
