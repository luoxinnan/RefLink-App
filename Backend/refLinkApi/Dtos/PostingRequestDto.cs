namespace refLinkApi.Dtos;

public class PostingRequestDto
{
    public required string Title { get; set; }

    public required string Description { get; set; }

    public int EmployerId { get; set; }
}