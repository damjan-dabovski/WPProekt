namespace WPProekt.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedUserModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Uid = c.String(nullable: false, maxLength: 128),
                        UserName = c.String(),
                        Role = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Uid);
            
            AddColumn("dbo.Posts", "isDraft", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Posts", "isDraft");
            DropTable("dbo.Users");
        }
    }
}
