namespace API.Infrastructure.Services;

public class Result
{
    public bool Succeeded { get; private set; }

    public static implicit operator Result(bool succeeded) =>
        new Result { Succeeded = succeeded };
}
