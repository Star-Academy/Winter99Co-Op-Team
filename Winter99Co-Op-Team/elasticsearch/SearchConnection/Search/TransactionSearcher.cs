using System.Collections.Generic;
using Nest;
using Winter99Co_Op_Team.elasticsearch.Model;
using Winter99Co_Op_Team.elasticsearch.SearchConnection.Query;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Search
{
    public class TransactionSearcher : ITransactionSearcher
    {
        private readonly IElasticClient _elasticClient;
        private readonly ITransactionQueryCreator _queryCreator;
        private readonly string _index;

        public TransactionSearcher(IElasticClient elasticClient, ITransactionQueryCreator queryCreator, string index)
        {
            _elasticClient = elasticClient;
            _queryCreator = queryCreator;
            _index = index;
        }

        public IEnumerable<Transaction> GetAllTransactions(string accountId)
        {
            var query = _queryCreator.GetAllTransactions(accountId);
            var response = _elasticClient.Search<Transaction>(s => s
                .Index(_index)
                .Query(q => query)
                .Size(50));
            return response.Documents;
        }
    }
}