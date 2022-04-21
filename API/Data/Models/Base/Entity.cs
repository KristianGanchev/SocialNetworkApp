using System.ComponentModel.DataAnnotations;

namespace API.Data.Models.Base;

public abstract class Entity<TKey> : IEntity
{
    [Key]
    public TKey Id { get; set; }

    public DateTime CreatedOn { get; set; }

    [Required]
    public string CreatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public string UpdatedBy { get; set; }
}
