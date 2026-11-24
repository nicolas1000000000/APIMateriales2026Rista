using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using APIMateriales2026Rista.Models;

using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>

{

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)

        : base(options)

    {

    }
    public DbSet<Material>  Materiales {get; set;} 

    public DbSet<Producto> Productos {get; set;}

    public DbSet<Rubro> Rubros {get; set;}


    public DbSet <MaterialProducto> MaterialProductos {get; set;}


      protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MaterialProducto>()
            .HasOne(mp => mp.Producto)
            .WithMany(p => p.MaterialProductos)
            .HasForeignKey(mp => mp.ProductoID)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<MaterialProducto>()
            .HasOne(mp => mp.Material)
            .WithMany(m => m.MaterialProductos)
            .HasForeignKey(mp => mp.MaterialID)
            .OnDelete(DeleteBehavior.NoAction);
    }
  
}