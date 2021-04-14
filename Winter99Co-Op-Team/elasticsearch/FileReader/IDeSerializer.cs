using System.Collections.Generic;
using System.Data;

namespace Winter99Co_Op_Team.elasticsearch.FileReader
{
    public interface IDeSerializer<T> where T : class
    {
        HashSet<T> DeSerializer(DataTable table);
    }
}