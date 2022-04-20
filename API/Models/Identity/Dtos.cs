using System.ComponentModel.DataAnnotations;

namespace API.Models.Identity.Dtos;

public record RegiserRequestModel([Required] string UserName, [Required] string Email, [Required] string Password);

public record LoginRequestModel([Required] string Email, [Required] string Password);

