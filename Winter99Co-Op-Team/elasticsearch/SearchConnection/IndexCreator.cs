using Nest;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection
{
    public class IndexCreator<T> where T : class
    {
        private readonly IElasticClient _elasticClient;

        public IndexCreator(IElasticClient elasticClient)
        {
            _elasticClient = elasticClient;
        }

        public void CreateIndex(string indexName)
        {
            _elasticClient.Indices.Create(indexName,
                descriptor => descriptor.Map<T>(x => x.AutoMap()));
        }
        
    }
}