namespace APIMateriales2026Rista.Models;

public class MaterialProducto{


    public int MaterialProductoID {get; set;}

     public int MaterialID {get; set;}

     public int ProductoID {get; set;}

    public decimal Cantidad {get; set;}

    public decimal PrecioCostoUnitario {get; set;}

    public decimal Subtotal {get; set;} 

    public  virtual Material? Material { get; set; }

     public virtual  Producto? Producto { get; set; }

    

}