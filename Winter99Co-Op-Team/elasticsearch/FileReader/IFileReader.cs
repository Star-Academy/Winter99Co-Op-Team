using System.Data;

namespace Winter99Co_Op_Team.elasticsearch.FileReader
{
    public interface IFileReader
    {
        DataTable ReadDate(string path);
    }
}