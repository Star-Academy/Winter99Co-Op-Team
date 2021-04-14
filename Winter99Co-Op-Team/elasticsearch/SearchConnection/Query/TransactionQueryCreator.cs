using System.Collections.Generic;
using Nest;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Query
{
    public class TransactionQueryCreator : ITransactionQueryCreator
    {
        public BoolQuery GetAllTransactions(string accountId)
        {
            var query = new BoolQuery()
            {
                Should = SetupShouldQuery(accountId),
                MinimumShouldMatch = 1
            };
            return query;
        }

        private IEnumerable<QueryContainer> SetupShouldQuery(string accountId)
        {
            var shouldQuery = new List<QueryContainer>()
            {
                new TermQuery()
                {
                    Field = "source_account",
                    Value = accountId
                },
                new TermQuery()
                {
                    Field = "destination_account",
                    Value = accountId
                }
            };
            return shouldQuery;
        }
    }
}