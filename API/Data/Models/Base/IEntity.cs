namespace API.Data.Models.Base;

public interface IEntity
{
    DateTime CreatedOn { get; set; }

    string CreatedBy { get; set; }

    DateTime? UpdatedOn { get; set; }

    string UpdatedBy { get; set; }
}
