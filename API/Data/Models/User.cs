﻿using API.Data.Models.Base;
using Microsoft.AspNetCore.Identity;

namespace API.Data.Models;

public class User : IdentityUser, IDeletableEntity
{
    public DateTime CreatedOn { get; set; }

    public string CreatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public string UpdatedBy { get; set; }

    public DateTime? DeletedOn { get; set; }

    public string DeletedBy { get; set; }

    public bool IsDeleted { get; set; }
   
}
