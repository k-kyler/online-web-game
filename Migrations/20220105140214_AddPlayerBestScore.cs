using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineWebGame.Migrations
{
    public partial class AddPlayerBestScore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BestScore2048",
                table: "UserInfos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BestScoreFlappy",
                table: "UserInfos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BestScoreRobot",
                table: "UserInfos",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BestScoreSnake",
                table: "UserInfos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BestScore2048",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "BestScoreFlappy",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "BestScoreRobot",
                table: "UserInfos");

            migrationBuilder.DropColumn(
                name: "BestScoreSnake",
                table: "UserInfos");
        }
    }
}
