using Nest;

namespace Winter99Co_Op_Team.elasticsearch.Model
{
    public class Transaction
    {
        [Keyword(Name = "source_account", Normalizer = "lowercase")]
        public string SourceAccount { get; set; }
        
        [Keyword(Name = "destination_account", Normalizer = "lowercase")]
        public string DestinationAccount { get; set; }
        
        [Date(Format = "yyyy/MM/dd")]
        public string Date { get; set; }
        
        [Date(Format = "HH:mm:ss")]
        public string Time { get; set; }
        
        [Number(NumberType.Long)]
        public long Amount { get; set; }
        
        [Text(Name = "type", Analyzer = "standard")]
        public string Type { get; set; }
        
        [Keyword(Name = "transaction_id", Normalizer = "lowercase")]
        public string TransactionId { get; set;}
    }
}