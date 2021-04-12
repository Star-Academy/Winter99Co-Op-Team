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
        [Keyword(Name = "account_type", Normalizer = "lowercase")]
        public string AccountType { get; set; }
        [Keyword(Name = "branch_telephone", Normalizer = "lowercase")]
        public string BranchTelephone { get; set; }
        [Keyword(Name = "branch_address", Normalizer = "lowercase")]
        public string BranchAddress { get; set; }
        [Keyword(Name = "branch_name", Normalizer = "lowercase")]
        public string BranchName { get; set; }
        [Keyword(Name = "owner_name", Normalizer = "lowercase")]
        public string OwnerName { get; set; }
        [Keyword(Name = "owner_family_name", Normalizer = "lowercase")]
        public string OwnerFamilyName { get; set; }
        [Keyword(Name = "owner_id", Normalizer = "lowercase")]
        public string OwnerId { get; set; }
    }
}