using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
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
                    
                    Date = DateTime.ParseExact(row["Date"].ToString(), "M/d/yyyy",
                            CultureInfo.InvariantCulture)
                        .ToString("yyyy/MM/dd", CultureInfo.InvariantCulture),
                    
                    Time = DateTime.ParseExact(row["Time"].ToString(), "H:mm:ss",
                        CultureInfo.InvariantCulture).TimeOfDay.ToString(),
                    
                    Amount = long.Parse(row["Amount"].ToString()?.Replace(",", "") ?? string.Empty),
                    Type = row["Type"].ToString(),
                    TransactionId = row["TransactionId"].ToString()
                };
                transactions.Add(transaction);
            }

            return transactions;
        }
    }
}