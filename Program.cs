using Microsoft.AspNetCore.Identity; 
using Microsoft.EntityFrameworkCore;
 
 using APIMateriales2026Rista.Models; 
 using System.Text; 

 var builder = WebApplication.CreateBuilder(args); 
 
 builder.Services.AddDbContext<ApplicationDbContext>
 (options => 
 options.UseSqlServer(builder.Configuration.GetConnectionString
 ("APIMateriales2026Rista")));
  
   builder.Services.AddIdentity<ApplicationUser,
    IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
     .AddDefaultTokenProviders();
   
             builder.Services.AddAuthorization();
              builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
         builder.Services.AddSwaggerGen();


          builder.Services.AddCors(options => 
          { options.AddPolicy("AllowAll", policy =>
           { policy.AllowAnyOrigin()
            .AllowAnyMethod() 
            .AllowAnyHeader();
             }); 
             });
              var app = builder.Build(); 
              app.UseSwagger(); app.UseSwaggerUI();

            
           if (app.Environment.IsDevelopment()) { 

           } 
           app.UseHttpsRedirection(); 
            app.UseDefaultFiles(); 
            app.UseStaticFiles();
             app.UseCors("AllowAll");
             app.UseAuthentication(); 
             app.UseAuthorization();
              app.MapControllers(); 
              app.Run();


               
               
               
               