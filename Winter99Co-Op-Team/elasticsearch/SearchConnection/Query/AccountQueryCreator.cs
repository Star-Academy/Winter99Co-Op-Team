using Nest;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Query
{
    public class AccountQueryCreator : IAccountQueryCreator
    {
        public TermQuery GetAccountById(string id)
        {
            var query = new TermQuery()
            {
                Field = "account_id",
                Value = id
            };
            return query;
        }
    }
}