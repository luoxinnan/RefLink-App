using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace refLinkApi.Models;

public class Employer
{
    
    public  string AuthId { get; set; }
    
    public Guid GuidId { get; set; } = Guid.NewGuid();

    public required string Name { get; set; }

    public  required string Company { get; set; }

    public required string Email { get; set; } 

    public ICollection<Posting>? Postings { get; set; }
}