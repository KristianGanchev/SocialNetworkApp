namespace API.Features.Posts.Services;

public class PostService : IPostServices
{
    private readonly SocialNetworkDbContext dbContext;

    public PostService(SocialNetworkDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<string> Create(CreatePostRequestModel model, string userId)
    {
        var post = new Post
        {
            Description = model.Description,
            ImageUrl = model.ImageUrl,
            AuthorId = userId
        };

        this.dbContext.Add(post);

        await this.dbContext.SaveChangesAsync();

        return post.Id.ToString();
    }
}
