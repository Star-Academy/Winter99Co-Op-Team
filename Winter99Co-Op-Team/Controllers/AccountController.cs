using Microsoft.AspNetCore.Mvc;
using Winter99Co_Op_Team.elasticsearch.SearchConnection.Search;

namespace Winter99Co_Op_Team.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountSearcher _accountSearcher;

        public AccountController(IAccountSearcher accountSearcher)
        {
            _accountSearcher = accountSearcher;
        }

        [HttpPost]
        [HttpGet]
        public IActionResult GetAccount([FromQuery] string accountId)
        {
            var account = _accountSearcher.GetAccountById(accountId);
            return Ok(account);
        }
    }
}