using Microsoft.AspNetCore.Mvc;

namespace API.Features;

[ApiController]
[Route("[controller]")]
public abstract class ApiController : ControllerBase
{
}
