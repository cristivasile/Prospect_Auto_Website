using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedFieldsToVehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "EngineSize",
                table: "Vehicles",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "Power",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EngineSize",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Power",
                table: "Vehicles");
        }
    }
}
