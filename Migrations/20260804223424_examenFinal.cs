using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIMateriales2026Rista.Migrations
{
    /// <inheritdoc />
    public partial class examenFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistorialMateriales");

            migrationBuilder.AddColumn<decimal>(
                name: "PrecioCosto",
                table: "Productos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "MaterialProductos",
                columns: table => new
                {
                    MaterialProductoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cantidad = table.Column<int>(type: "int", nullable: false),
                    PrecioUnitario = table.Column<float>(type: "real", nullable: false),
                    Subtotal = table.Column<float>(type: "real", nullable: false),
                    MaterialID = table.Column<int>(type: "int", nullable: false),
                    ProductoID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialProductos", x => x.MaterialProductoID);
                    table.ForeignKey(
                        name: "FK_MaterialProductos_Materiales_MaterialID",
                        column: x => x.MaterialID,
                        principalTable: "Materiales",
                        principalColumn: "MaterialID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialProductos_Productos_ProductoID",
                        column: x => x.ProductoID,
                        principalTable: "Productos",
                        principalColumn: "ProductoID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaterialProductos_MaterialID",
                table: "MaterialProductos",
                column: "MaterialID");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialProductos_ProductoID",
                table: "MaterialProductos",
                column: "ProductoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaterialProductos");

            migrationBuilder.DropColumn(
                name: "PrecioCosto",
                table: "Productos");

            migrationBuilder.CreateTable(
                name: "HistorialMateriales",
                columns: table => new
                {
                    HistorialMaterialID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CampoModificado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaCambio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaterialID = table.Column<int>(type: "int", nullable: false),
                    ValorAnterior = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValorNuevo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistorialMateriales", x => x.HistorialMaterialID);
                });
        }
    }
}
