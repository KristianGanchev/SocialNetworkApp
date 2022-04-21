namespace API.Features.Posts;

using API.Features.Posts.Services;
using API.Infrastructure.Services;

public class PostController : ApiController
{
    private readonly IPostServices post;
    private readonly ICurrentUserService currentUser;

    public PostController(IPostServices post, ICurrentUserService currentUser)
    {
        this.post = post;
        this.currentUser = currentUser;
    }

    [HttpPost]
    [Route(nameof(Create))]
    public async Task<ActionResult> Create(CreatePostRequestModel model)
    {
        var userId = this.currentUser.GetId();


        if(userId == null)
        {
            return Unauthorized();
        }

        var id = await this.post.Create(model, userId);

        return Created(nameof(this.Create), id);
    }
}
