namespace API.Data.Models.Base;

public abstract class DeletableEntity<TKey> : Entity<TKey>, IDeletableEntity
{
    public DateTime? DeletedOn { get; set; }

    public string DeletedBy { get; set; }

    public bool IsDeleted { get; set; }
}
