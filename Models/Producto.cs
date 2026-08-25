namespace APIMateriales2026Rista.Models;

public class Producto {
    public int ProductoID {get; set;}
    public string? Descripcion {get; set;}
    public decimal CostoTotal { get; set; }
   
 

     public virtual ICollection<MaterialProducto>? MaterialProductos { get; set; }
}