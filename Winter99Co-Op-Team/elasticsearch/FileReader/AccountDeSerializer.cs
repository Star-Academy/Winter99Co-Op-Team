using System.Collections.Generic;
using System.Data;
using Winter99Co_Op_Team.elasticsearch.Model;

namespace Winter99Co_Op_Team.elasticsearch.FileReader
{
    public class AccountDeSerializer : IDeSerializer<Account>
    {
        public HashSet<Account> DeSerializer(DataTable table)
        {
            var accounts = new HashSet<Account>();
            foreach (DataRow row in table.Rows)
            {
                var account = new Account()
                {
                    AccountId = row["AccountId"].ToString(),
                    CardId = row["CardId"].ToString(),
                    Sheba = row["Sheba"].ToString(),
                    AccountType = row["AccountType"].ToString(),
                    BranchTelephone = row["BranchTelephone"].ToString(),
                    BranchAddress = row["BranchAddress"].ToString(),
                    BranchName = row["BranchName"].ToString(),
                    OwnerName = row["OwnerName"].ToString(),
                    OwnerFamilyName = row["OwnerFamilyName"].ToString(),
                    OwnerId = row["OwnerId"].ToString()
                };

                accounts.Add(account);
            }

            return accounts;
        }
    }
}