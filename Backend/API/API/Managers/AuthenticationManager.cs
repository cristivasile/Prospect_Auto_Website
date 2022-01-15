using API.Entities;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Managers
{
    public class AuthenticationManager : IAuthenticationManager
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly ITokenManager tokenManager;

        public AuthenticationManager(UserManager<User> uManager, SignInManager<User> sManager, ITokenManager tManager)
        {
            userManager = uManager;
            signInManager = sManager;
            tokenManager = tManager;
        }

        /// <returns>
        /// token for success
        /// -1 for inexistent email
        /// -2 too many logins, user is locked out
        /// -3 incorrect password
        /// </returns>
        public async Task<TokenModel> Login(LoginModel login)
        {
            var result = new TokenModel();

            var user = await userManager.FindByEmailAsync(login.Email);

            if (user == null) {
                result.AccessToken = "-1";
                return result;
            }

            var tryLogin = await signInManager.CheckPasswordSignInAsync(user, login.Password, true);

            if (tryLogin.IsLockedOut){
                result.AccessToken = "-2";
                return result;
            }

            if (!tryLogin.Succeeded){
                result.AccessToken = "-3";
                return result;
            }

            var token = await tokenManager.GenerateToken(user);

            result.AccessToken = token;

            return result;
        }


        /// <returns>
        /// 0 for success
        /// -1 for failure
        /// </returns>
        public async Task<IdentityResult> SignUp(RegisterModel newUser)
        {
            var user = new User()
            {
                Email = newUser.Email,
                UserName = newUser.UserName
            };

            var result = await userManager.CreateAsync(user, newUser.Password);

            if (!result.Succeeded)
                return result;

            await userManager.AddToRoleAsync(user, newUser.Role);

            return result;
        }
    }
}
