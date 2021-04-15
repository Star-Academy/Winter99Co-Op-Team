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
                    Date = DeserializeDate(row["Date"].ToString()),
                    Time = DeserializeTime(row["Time"].ToString()),
                    Amount = DeserializeAmount(row["Amount"].ToString()),
                    Type = row["Type"].ToString(),
                    TransactionId = row["TransactionId"].ToString()
                };
                transactions.Add(transaction);
            }

            return transactions;
        }

        private static long DeserializeAmount(string amount)
        {
            return long.Parse(amount.Replace(",", ""));
        }

        private static string DeserializeTime(string time)
        {
            return DateTime.ParseExact(time, "H:mm:ss", CultureInfo.InvariantCulture)
                .TimeOfDay.ToString();
        }

        private static string DeserializeDate(string date)
        {
            return DateTime.ParseExact(date, "M/d/yyyy", CultureInfo.InvariantCulture)
                .ToString("yyyy/MM/dd", CultureInfo.InvariantCulture);
        }
    }
}