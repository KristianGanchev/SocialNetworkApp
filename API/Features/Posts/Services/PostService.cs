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

        this.dbContext.Posts.Add(post);

        await this.dbContext.SaveChangesAsync();

        return post.Id.ToString();
    }

    public async Task<IEnumerable<PostByUserResponseModel>> ByUser(string userId) =>
        await this.dbContext
            .Posts
            .Where(p => p.AuthorId == userId)
            .Select(p => new PostByUserResponseModel(p.Id.ToString(), p.ImageUrl))
            .ToListAsync();

    public async Task<PostDetailsResponseModel> Details(string id) =>
        await this.dbContext
            .Posts
            .Where(p => p.Id.ToString() == id)
            .Select(p => new PostDetailsResponseModel(p.Id.ToString(), p.Description, p.ImageUrl, p.AuthorId, p.Author.UserName))
            .FirstOrDefaultAsync();

    public async Task<Result> Update(string id, string description, string userId)
    {
        var post = await GetByIdAndUserId(id, userId);

        if (post == null)
        {
            return "Post cannot be updated!";
        }

        post.Description = description;

        await this.dbContext.SaveChangesAsync();

        return true;
    }
  
    public async Task<Result> Delete(string id, string userId)
    {
        var post = await GetByIdAndUserId(id, userId);

        if (post == null)
        {
            return "Post cannot be deleted!";
        }

        this.dbContext.Posts.Remove(post);

        await this.dbContext.SaveChangesAsync();

        return true;
    }

    private async Task<Post> GetByIdAndUserId(string id, string userId) => 
        await this.dbContext
                    .Posts
                    .Where(p => p.Id.ToString() == id && p.AuthorId == userId)
                    .FirstOrDefaultAsync();

}
