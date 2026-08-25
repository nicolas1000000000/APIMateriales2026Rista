using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIMateriales2026Rista.Migrations
{
    /// <inheritdoc />
    public partial class HistorialMaterial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HistorialMateriales",
                columns: table => new
                {
                    HistorialMaterialID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaterialID = table.Column<int>(type: "int", nullable: false),
                    CampoModificado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValorAnterior = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValorNuevo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaCambio = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistorialMateriales", x => x.HistorialMaterialID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistorialMateriales");
        }
    }
}
