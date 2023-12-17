using Microsoft.EntityFrameworkCore;
using ToDoApp.Model;

namespace ToDoApp.ConEntity
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ListTable>().Property(p => p.Tasks).HasMaxLength(500);
        }
        public DbSet<ListTable> ListTables { get; set; }
    }
}
