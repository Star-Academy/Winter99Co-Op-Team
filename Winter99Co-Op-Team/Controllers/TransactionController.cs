using Microsoft.AspNetCore.Mvc;
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

        [HttpPost, HttpGet]
        public IActionResult GetTransactionsOfAccount([FromQuery, FromBody] string accountId)
        {
            if (!IsInputValid(accountId))
                return Ok("Input Format is incorrect");

            var transactions = _transactionSearcher.GetAllTransactions(accountId);
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