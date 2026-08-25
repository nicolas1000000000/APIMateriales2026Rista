using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIMateriales2026Rista.Migrations
{
    /// <inheritdoc />
    public partial class correccionexfinal3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materiales_Rubros_RubroID",
                table: "Materiales");

            migrationBuilder.DropForeignKey(
                name: "FK_MaterialProductos_Materiales_MaterialID",
                table: "MaterialProductos");

            migrationBuilder.DropForeignKey(
                name: "FK_MaterialProductos_Productos_ProductoID",
                table: "MaterialProductos");

            migrationBuilder.DropColumn(
                name: "Eliminado",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "PrecioUnitario",
                table: "MaterialProductos");

            migrationBuilder.DropColumn(
                name: "Eliminado",
                table: "Materiales");

            migrationBuilder.RenameColumn(
                name: "PrecioCosto",
                table: "Productos",
                newName: "CostoTotal");

            migrationBuilder.AlterColumn<decimal>(
                name: "Subtotal",
                table: "MaterialProductos",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<decimal>(
                name: "PrecioCostoUnitario",
                table: "MaterialProductos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<int>(
                name: "RubroID",
                table: "Materiales",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Materiales_Rubros_RubroID",
                table: "Materiales",
                column: "RubroID",
                principalTable: "Rubros",
                principalColumn: "RubroID");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialProductos_Materiales_MaterialID",
                table: "MaterialProductos",
                column: "MaterialID",
                principalTable: "Materiales",
                principalColumn: "MaterialID");

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialProductos_Productos_ProductoID",
                table: "MaterialProductos",
                column: "ProductoID",
                principalTable: "Productos",
                principalColumn: "ProductoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materiales_Rubros_RubroID",
                table: "Materiales");

            migrationBuilder.DropForeignKey(
                name: "FK_MaterialProductos_Materiales_MaterialID",
                table: "MaterialProductos");

            migrationBuilder.DropForeignKey(
                name: "FK_MaterialProductos_Productos_ProductoID",
                table: "MaterialProductos");

            migrationBuilder.DropColumn(
                name: "PrecioCostoUnitario",
                table: "MaterialProductos");

            migrationBuilder.RenameColumn(
                name: "CostoTotal",
                table: "Productos",
                newName: "PrecioCosto");

            migrationBuilder.AddColumn<bool>(
                name: "Eliminado",
                table: "Productos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<float>(
                name: "Subtotal",
                table: "MaterialProductos",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<float>(
                name: "PrecioUnitario",
                table: "MaterialProductos",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AlterColumn<int>(
                name: "RubroID",
                table: "Materiales",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Eliminado",
                table: "Materiales",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Materiales_Rubros_RubroID",
                table: "Materiales",
                column: "RubroID",
                principalTable: "Rubros",
                principalColumn: "RubroID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialProductos_Materiales_MaterialID",
                table: "MaterialProductos",
                column: "MaterialID",
                principalTable: "Materiales",
                principalColumn: "MaterialID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MaterialProductos_Productos_ProductoID",
                table: "MaterialProductos",
                column: "ProductoID",
                principalTable: "Productos",
                principalColumn: "ProductoID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
