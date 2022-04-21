namespace API.Features.Posts.Services;

public interface IPostServices
{
    public Task<string> Create(CreatePostRequestModel model, string userId);
}
