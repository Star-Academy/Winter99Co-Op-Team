using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Nest;
using Winter99Co_Op_Team.elasticsearch.FileReader;
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
        private readonly string _accountIndex;
        private readonly string _transactionIndex;


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _accountPath = Configuration.GetValue<string>("AccountPath");
            _transactionPath = Configuration.GetValue<string>("TransactionPath");
            _accountIndex = Configuration.GetValue<string>("AccountIndex");
            _transactionIndex = Configuration.GetValue<string>("TransactionIndex");
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson();
            services.AddMvc().AddNewtonsoftJson();
            
            AddClassesToIoC(services);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "Winter99Co_Op_Team", Version = "v1"});
            });
        }

        private void AddClassesToIoC(IServiceCollection services)
        {
            services.AddSingleton<IFileReader, FileReader>();
            services.AddSingleton<IDeSerializer<Account>, AccountDeSerializer>();
            services.AddSingleton<IDeSerializer<Transaction>, TransactionDeSerializer>();

            var client = new ElasticClientFactory(Configuration).CreateElasticClient();
            services.AddSingleton(client);
            services.AddSingleton<IndexCreator<Account>>();
            services.AddSingleton<IndexCreator<Transaction>>();
            services.AddSingleton<Importer<Account>>();
            services.AddSingleton<Importer<Transaction>>();

            services.AddSingleton<IAccountQueryCreator, AccountQueryCreator>();
            services.AddSingleton<ITransactionQueryCreator, TransactionQueryCreator>();

            services.AddSingleton<IAccountSearcher>(p => new AccountSearcher(client,
                p.GetService<IAccountQueryCreator>(), _accountIndex));
            services.AddSingleton<ITransactionSearcher>(p => new TransactionSearcher(client,
                p.GetService<ITransactionQueryCreator>(), _transactionIndex));
        }

        private void RunApplication(IServiceProvider serviceProvider)
        {
            var client = serviceProvider.GetService<IElasticClient>();
            if (IsIndexExisting(_accountIndex, client))
                return;
            
            var fileReader = serviceProvider.GetService<IFileReader>();
            var accountDeserializer = serviceProvider.GetService<IDeSerializer<Account>>();
            var transactionDeserializer = serviceProvider.GetService<IDeSerializer<Transaction>>();
            var accounts = accountDeserializer?.DeSerializer(fileReader?.ReadDate(_accountPath));
            var transactions = transactionDeserializer?.DeSerializer(fileReader?.ReadDate(_transactionPath));

            var accountIndexCreator = serviceProvider.GetService<IndexCreator<Account>>();
            var transactionIndexCreator = serviceProvider.GetService<IndexCreator<Transaction>>();
            accountIndexCreator?.CreateIndex(_accountIndex);
            transactionIndexCreator?.CreateIndex(_transactionIndex);
            
            var accountImporter = serviceProvider.GetService<Importer<Account>>();
            var transactionImporter = serviceProvider.GetService<Importer<Transaction>>();
            accountImporter?.Import(accounts, _accountIndex);
            transactionImporter?.Import(transactions, _transactionIndex);
        }
        
        private static bool IsIndexExisting(string indexName, IElasticClient client)
        {
            var response = client.Indices.Exists(indexName);
            return response.Exists;
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            RunApplication(app.ApplicationServices);
            
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

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}