using System;
using System.Collections.Generic;
using System.Data;
using Winter99Co_Op_Team.elasticsearch.Model;

namespace Winter99Co_Op_Team.elasticsearch.FileReader
{
    public class TransactionDeSerializer : IDeSerializer<Transaction>
    {
        public HashSet<Transaction> DeSerializer(DataTable table)
        {
            var transactions = new HashSet<Transaction>();
            foreach (DataRow row in table.Rows)
            {
                var transaction = new Transaction()
                {
                    SourceAccount = row["SourceAccount"].ToString(),
                    DestinationAccount = row["DestinationAccount"].ToString(),
                    Date = DateTime.ParseExact(row["Date"].ToString() ?? string.Empty, "dd/MM/yyyy", null),
                    Time = DateTime.ParseExact(row["Time"].ToString() ?? string.Empty, "HH:mm:ss", null),
                    Amount = long.Parse(row["Amount"].ToString() ?? string.Empty),
                    Type = row["Type"].ToString(),
                    TransactionId = row["TransactionId"].ToString()
                };
                transactions.Add(transaction);
            }

            return transactions;
        }
    }
}