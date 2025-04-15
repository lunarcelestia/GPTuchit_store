using GPTuchit_store.Models;
using Microsoft.EntityFrameworkCore;
namespace GPTuchit_store
{
    public class YourDbContext : DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; } // Пример таблицы курсов
                                                   // Добавьте другие DbSet для других сущностей
    }
}
