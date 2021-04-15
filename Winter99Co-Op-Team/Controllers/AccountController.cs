using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
        public IActionResult GetAccount([FromBody] JObject accountId)
        {
            accountId.TryGetValue("accountId", out var value);
            var stringAccountId = value?.ToString();
            if (!IsInputValid(stringAccountId))
                return Ok("Input Format is incorrect");

            var account = _accountSearcher.GetAccountById(stringAccountId);
            return Ok(account);
        }

        private static bool IsInputValid(string accountId)
        {
            if (!long.TryParse(accountId, out var number))
                return false;
            return accountId.Length == 10;
        }
    }
}