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

        [HttpPost]
        public IActionResult GetTransactionsOfAccount([FromBody] string accountId)
        {
            var transactions = _transactionSearcher.GetAllTransactions(accountId);
            return Ok(transactions);
        }
    }
}