namespace API.Features.Posts;

using static Data.Validations.Post;

public record CreatePostRequestModel([MaxLength(MaxDescriptionLength)]string Description, string ImageUrl);
