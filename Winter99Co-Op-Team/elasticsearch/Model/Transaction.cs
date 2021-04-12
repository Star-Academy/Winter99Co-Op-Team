using System;
using Nest;

namespace Winter99Co_Op_Team.elasticsearch.Model
{
    public class Transaction
    {
        [Keyword(Name = "source_account", Normalizer = "lowercase")]
        public string SourceAccount { get; set; }
        [Keyword(Name = "destination_account", Normalizer = "lowercase")]
        public string DestinationAccount { get; set; }
        [Date(Format = "yyyy/mm/dd")]
        public DateTime Date { get; set; }
        [Date(Format = "HH:mm:ss")]
        public DateTime Time { get; set; }
        [Number(NumberType.Long)]
        public long Amount { get; set; }
        [Keyword(Name = "type", Normalizer = "lowercase")]
        public string Type { get; set; }
        [Keyword(Name = "transaction_id", Normalizer = "lowercase")]
        public string TransactionId { get; set;}
    }
}