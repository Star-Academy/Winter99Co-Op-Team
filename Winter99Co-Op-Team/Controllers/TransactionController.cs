using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Winter99Co_Op_Team.elasticsearch.SearchConnection.Search;

namespace Winter99Co_Op_Team.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionSearcher _transactionSearcher;

        public TransactionController(ITransactionSearcher transactionSearcher)
        {
            _transactionSearcher = transactionSearcher;
        }

        [HttpPost]
        public IActionResult GetTransactionsOfAccount([FromBody] JObject accountId)
        {
            accountId.TryGetValue("accountId", out var value);
            var stringAccountId = value?.ToString();
            // if (!IsInputValid(stringAccountId))
            //     return Ok("Input Format is incorrect");

            var transactions = _transactionSearcher.GetAllTransactions(stringAccountId);
            return Ok(transactions);
        }

        private static bool IsInputValid(string accountId)
        {
            if (!long.TryParse(accountId, out var number))
                return false;
            return accountId.Length == 10;
        }
    }
}