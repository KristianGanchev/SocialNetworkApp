namespace API.Data.Models;

using API.Data.Models.Base;

using static Validations.Post;

public class Post : DeletableEntity<Guid>
{
    [MaxLength(MaxDescriptionLength)]
    public string Description { get; set; }

    [Required]
    public string ImageUrl { get; set; }

    [Required]
    public string AuthorId { get; set; }

    public User Author { get; set; }
}
