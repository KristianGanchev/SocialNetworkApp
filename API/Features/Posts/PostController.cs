namespace API.Features.Posts;

using API.Features.Posts.Services;
using API.Infrastructure.Services;

using static Infrastructure.WebConstants;

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

    [HttpGet]
    [Route(nameof(ByUser))]
    public async Task<IEnumerable<PostByUserResponseModel>> ByUser()
    {
        var userId = this.currentUser?.GetId();

        return await this.post.ByUser(userId);
    }

    [HttpGet]
    [Route(Id)]
    public async Task<PostDetailsResponseModel> Details(string id) =>
        await this.post.Details(id);

    [HttpPut]
    [Route(nameof(Update))]
    public async Task<ActionResult> Update(PostUpdateRequestModel model)
    {
        var userId = this.currentUser.GetId();

        var result = await this.post.Update(model.Id, model.Description, userId);

        if (result.Failure)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }

    [HttpDelete]
    [Route(Id)]
    public async Task<ActionResult> Delete(string id)
    {
        var userId = this.currentUser.GetId();

        var result = await this.post.Delete(id, userId);

        if (result.Failure)
        {
            return BadRequest(result.Error);
        }

        return Ok();
    }
}
