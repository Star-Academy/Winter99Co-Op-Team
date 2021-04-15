using System;
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

        [HttpPost, HttpGet]
        public IActionResult GetAccount([FromQuery, FromBody] string accountId)
        {
            if (!IsInputValid(accountId))
                return Ok("Input Format is incorrect");

            var account = _accountSearcher.GetAccountById(accountId);
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