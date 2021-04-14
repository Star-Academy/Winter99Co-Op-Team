using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Nest;
using Winter99Co_Op_Team.elasticsearch.Model;
using Winter99Co_Op_Team.elasticsearch.SearchConnection.Launch;
using Winter99Co_Op_Team.elasticsearch.SearchConnection.Query;
using Winter99Co_Op_Team.elasticsearch.SearchConnection.Search;

namespace Winter99Co_Op_Team
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly string _accountPath;
        private readonly string _transactionPath;
        

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _accountPath = Configuration.GetValue<string>("AccountPath");
            _transactionPath = Configuration.GetValue<string>("TransactionPath");
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            
            var client = new ElasticClientFactory(Configuration).CreateElasticClient();
            services.AddSingleton(client);
            
            
            var importer = (IElasticClient)services.BuildServiceProvider().GetService(typeof(IElasticClient));
            services.AddSingleton<IndexCreator<Account>>();
            services.AddSingleton<IndexCreator<Transaction>>();
            services.AddSingleton<Importer<Account>>();
            services.AddSingleton<Importer<Transaction>>();
            services.AddTransient<IAccountQueryCreator, AccountQueryCreator>();
            services.AddTransient<ITransactionQueryCreator, TransactionQueryCreator>();
            services.AddSingleton(new AccountSearcher(client, , _accountPath));
            
            
            var indexCreator = (IndexCreator<Account>) 
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "Winter99Co_Op_Team", Version = "v1"});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Winter99Co_Op_Team v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                
                endpoints.MapControllers();
            });
        }
    }
}