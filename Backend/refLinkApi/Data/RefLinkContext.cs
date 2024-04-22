using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using refLinkApi.Models;

    public class RefLinkContext : DbContext
    {
        public RefLinkContext (DbContextOptions<RefLinkContext> options)
            : base(options)
        {
        }

        public DbSet<Employer> Employers { get; set; } = default!;
        public DbSet<Candidate> Candidates { get; set; } = default!;
        public DbSet<Posting> Postings { get; set; } = default!;
        public DbSet<Question> Questions { get; set; } = default!;
        public DbSet<Referencer> Referencers  { get; set; } = default!;
        public DbSet<Response> Responses  { get; set; } = default!;
    }