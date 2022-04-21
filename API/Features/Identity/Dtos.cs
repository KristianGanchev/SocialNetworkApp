namespace API.Features.Identity;

public record RegiserRequestModel([Required] string UserName, [Required][EmailAddress] string Email, [Required] string Password);

public record LoginRequestModel([Required][EmailAddress] string Email, [Required] string Password);

public record LoginResponseModel(string Token);

