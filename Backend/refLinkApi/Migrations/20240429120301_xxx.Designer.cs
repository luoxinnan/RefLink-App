﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace refLinkApi.Migrations
{
    [DbContext(typeof(RefLinkContext))]
    [Migration("20240429120301_xxx")]
    partial class xxx
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("refLinkApi.Models.Candidate", b =>
                {
                    b.Property<Guid>("GuidId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PostingGuid")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GuidId");

                    b.HasIndex("PostingGuid");

                    b.ToTable("Candidates");
                });

            modelBuilder.Entity("refLinkApi.Models.Employer", b =>
                {
                    b.Property<Guid>("GuidId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AuthId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Company")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GuidId");

                    b.ToTable("Employers");
                });

            modelBuilder.Entity("refLinkApi.Models.Posting", b =>
                {
                    b.Property<Guid>("GuidId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("EmployerGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GuidId");

                    b.HasIndex("EmployerGuid");

                    b.ToTable("Postings");
                });

            modelBuilder.Entity("refLinkApi.Models.Question", b =>
                {
                    b.Property<Guid>("GuidId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<Guid>("PostingGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("GuidId");

                    b.HasIndex("PostingGuid");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("refLinkApi.Models.Referencer", b =>
                {
                    b.Property<Guid>("GuidId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CandidateGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GuidId");

                    b.HasIndex("CandidateGuid");

                    b.ToTable("Referencers");
                });

            modelBuilder.Entity("refLinkApi.Models.Response", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("GuidId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("QuestionGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ReferencerGuid")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("QuestionGuid");

                    b.HasIndex("ReferencerGuid");

                    b.ToTable("Responses");
                });

            modelBuilder.Entity("refLinkApi.Models.Candidate", b =>
                {
                    b.HasOne("refLinkApi.Models.Posting", "Posting")
                        .WithMany("Candidates")
                        .HasForeignKey("PostingGuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Posting");
                });

            modelBuilder.Entity("refLinkApi.Models.Posting", b =>
                {
                    b.HasOne("refLinkApi.Models.Employer", "Employer")
                        .WithMany("Postings")
                        .HasForeignKey("EmployerGuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("refLinkApi.Models.Question", b =>
                {
                    b.HasOne("refLinkApi.Models.Posting", "Posting")
                        .WithMany("Questions")
                        .HasForeignKey("PostingGuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Posting");
                });

            modelBuilder.Entity("refLinkApi.Models.Referencer", b =>
                {
                    b.HasOne("refLinkApi.Models.Candidate", "Candidate")
                        .WithMany("Referencers")
                        .HasForeignKey("CandidateGuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Candidate");
                });

            modelBuilder.Entity("refLinkApi.Models.Response", b =>
                {
                    b.HasOne("refLinkApi.Models.Question", "Question")
                        .WithMany("Responses")
                        .HasForeignKey("QuestionGuid");

                    b.HasOne("refLinkApi.Models.Referencer", "Referencer")
                        .WithMany("Responses")
                        .HasForeignKey("ReferencerGuid");

                    b.Navigation("Question");

                    b.Navigation("Referencer");
                });

            modelBuilder.Entity("refLinkApi.Models.Candidate", b =>
                {
                    b.Navigation("Referencers");
                });

            modelBuilder.Entity("refLinkApi.Models.Employer", b =>
                {
                    b.Navigation("Postings");
                });

            modelBuilder.Entity("refLinkApi.Models.Posting", b =>
                {
                    b.Navigation("Candidates");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("refLinkApi.Models.Question", b =>
                {
                    b.Navigation("Responses");
                });

            modelBuilder.Entity("refLinkApi.Models.Referencer", b =>
                {
                    b.Navigation("Responses");
                });
#pragma warning restore 612, 618
        }
    }
}
