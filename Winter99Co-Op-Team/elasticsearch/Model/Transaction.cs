using System;

namespace Winter99Co_Op_Team.elasticsearch.Model
{
    public class Transaction
    {
        public string SourceAccount { get; set; }
        public string DestinationAccount { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public long Amount { get; set; }
        public string Type { get; set; }
        public string TransactionId { get; set;}
    }
}