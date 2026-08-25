namespace APIMateriales2026Rista.Models;

public class Rubro 
{
    public int RubroID {get; set;}
    public string? Descripcion {get; set;}
    public bool Eliminado {get; set;} = false;

 public virtual ICollection<Material>? Materiales { get; set; }

}