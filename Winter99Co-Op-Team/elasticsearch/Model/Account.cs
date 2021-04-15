using Nest;

namespace Winter99Co_Op_Team.elasticsearch.Model
{
    public class Account
    {
        [Keyword(Name = "account_id", Normalizer = "lowercase")]
        public string AccountId { get; set; }
        
        [Keyword(Name = "card_id", Normalizer = "lowercase")]
        public string CardId { get; set; }
        
        [Keyword(Name = "sheba", Normalizer = "lowercase")]
        public string Sheba { get; set; }
        
        [Text(Name = "account_type", Analyzer = "standard")]
        public string AccountType { get; set; }
        
        [Keyword(Name = "branch_telephone", Normalizer = "lowercase")]
        public string BranchTelephone { get; set; }
        
        [Text(Name = "branch_address", Analyzer = "standard")]
        public string BranchAddress { get; set; }
        
        [Text(Name = "branch_name", Analyzer = "standard")]
        public string BranchName { get; set; }
        
        [Text(Name = "owner_name", Analyzer = "standard")]
        public string OwnerName { get; set; }
        
        [Text(Name = "owner_family_name", Analyzer = "standard")]
        public string OwnerFamilyName { get; set; }
        
        [Keyword(Name = "owner_id", Normalizer = "lowercase")]
        public string OwnerId { get; set; }
    }
}