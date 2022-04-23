namespace API.Features.Posts.Services;

public interface IPostServices
{
    public Task<string> Create(CreatePostRequestModel model, string userId);

    public Task<Result> Update(string id, string description, string userId);

    public Task<Result> Delete(string id, string userId);

    public Task<IEnumerable<PostByUserResponseModel>> ByUser(string userId);

    public Task<PostDetailsResponseModel> Details(string id);
}
