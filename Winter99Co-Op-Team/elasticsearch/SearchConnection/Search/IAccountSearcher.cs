using Winter99Co_Op_Team.elasticsearch.Model;

namespace Winter99Co_Op_Team.elasticsearch.SearchConnection.Search
{
    public interface IAccountSearcher
    {
        Account GetAccountById(string id);
    }
}