using Nest;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Query
{
    public interface IAccountQueryCreator
    {
        TermQuery GetAccountById(string id);
    }
}