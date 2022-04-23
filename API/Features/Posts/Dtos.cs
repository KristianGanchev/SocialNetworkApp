namespace API.Features.Posts;

using static Data.Validations.Post;

public record CreatePostRequestModel([MaxLength(MaxDescriptionLength)]string Description, string ImageUrl);

public record PostByUserResponseModel(string Id, string ImageUrl);

public record PostDetailsResponseModel(string Id, string Description, string ImageUrl, string UserId, string UserName);

public record PostUpdateRequestModel(string Id, [MaxLength(MaxDescriptionLength)] string Description);
