using System;
using Microsoft.Extensions.Configuration;
using Nest;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection
{
    public class ElasticClientFactory
    {
        private readonly IElasticClient _elasticClient;
        private readonly IConfiguration _configuration;

        public ElasticClientFactory(IConfiguration configuration)
        {
            _configuration = configuration;
            _elasticClient = CreateClient();
        }

        private IElasticClient CreateClient()
        {
            var uriString = _configuration.GetValue<string>("Uri");
            var uri = new Uri(uriString);
            
            var connectionString = new ConnectionSettings(uri);
            return new ElasticClient(connectionString);
        }

        public IElasticClient CreateElasticClient()
        {
            return _elasticClient;
        }
    }
}