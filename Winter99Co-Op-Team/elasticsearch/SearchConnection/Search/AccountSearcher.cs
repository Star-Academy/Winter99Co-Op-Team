using System.Linq;
using Nest;
using Winter99Co_Op_Team.elasticsearch.Model;
using Winter99Co_Op_Team.elasticsearch.SearchConnection.Query;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Search
{
    public class AccountSearcher : IAccountSearcher
    {
        private readonly IElasticClient _elasticClient;
        private readonly IAccountQueryCreator _queryCreator;
        private readonly string _index;

        public AccountSearcher(IElasticClient elasticClient, IAccountQueryCreator queryCreator, string index)
        {
            _elasticClient = elasticClient;
            _queryCreator = queryCreator;
            _index = index;
        }

        public Account GetAccountById(string id)
        {
            var query = _queryCreator.GetAccountById(id);
            var response = _elasticClient.Search<Account>(s => s
                .Index(_index)
                .Query(q => query)
                .Size(1));
            return response.Documents.FirstOrDefault();
        }
    }
}