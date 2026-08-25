namespace APIMateriales2026Rista.Models;

public class Material
{
    public int MaterialID { get; set; }

    public string? Descripcion { get; set; }

    public decimal PrecioCosto { get; set; }

    public virtual ICollection<MaterialProducto>? MaterialProductos { get; set; }
}