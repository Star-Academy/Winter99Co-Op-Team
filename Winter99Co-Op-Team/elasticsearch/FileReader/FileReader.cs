using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;

namespace Winter99Co_Op_Team.elasticsearch.FileReader
{
    public class FileReader : IFileReader
    {
        public DataTable ReadDate(string path)
        {
            if (!DoesFileExist(path)) return default;
            
            var reader = new StreamReader(path);
            var header = reader.ReadLine()?.Split(",");

            var table = GetInitialTable(header);
            AddRowsIntoTable(table, reader);
            return table;
        }

        private static bool DoesFileExist(string path)
        {
            if (!File.Exists(path))
                throw new IOException("file doesn't exists!");
            return true;
        }

        private static DataTable GetInitialTable(IEnumerable<string> header)
        {
            var table = new DataTable();
            foreach (var columnName in header)
            {
                table.Columns.Add(columnName.Trim('\"'));
            }

            return table;
        }

        private static void AddRowsIntoTable(DataTable table, TextReader streamReader)
        {
            var row = streamReader.ReadLine();
            while (row != null)
            {
                var columns = row.Split("\",\"").Select(x => x.Trim('\"')).Cast<object>().ToArray();
                table.Rows.Add(columns);
                row = streamReader.ReadLine();
            }
            streamReader.Close();
            streamReader.Dispose();
        }
        
    }
}