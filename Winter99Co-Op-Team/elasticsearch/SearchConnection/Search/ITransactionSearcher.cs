using System.Collections.Generic;
using Winter99Co_Op_Team.elasticsearch.Model;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Search
{
    public interface ITransactionSearcher
    {
        IEnumerable<Transaction> GetAllTransactions(string accountId);
    }
}