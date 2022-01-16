using API.Context;
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
        private readonly AppDbContext storage;

        public AuthenticationManager(UserManager<User> uManager, SignInManager<User> sManager, ITokenManager tManager, AppDbContext context)
        {
            userManager = uManager;
            signInManager = sManager;
            tokenManager = tManager;
            storage = context;
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

            var user = await userManager.FindByNameAsync(login.userName);

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
            var result = new IdentityResult();

            var user = new User()
            {
                Email = newUser.Email,
                UserName = newUser.UserName
            };

            //check if email already exists
            var emailExists = storage.Users.Any(x => x.Email.ToLower() == newUser.Email.ToLower());

            if (emailExists)
            {
                result = IdentityResult.Failed(new IdentityError[] { 
                                                new IdentityError { 
                                                    Code = "0001",
                                                    Description = "Email already exists!"
                                                }});
                return result;
            }

            result = await userManager.CreateAsync(user, newUser.Password);

            if (!result.Succeeded)
                return result;

            foreach (string role in newUser.Roles) 
                await userManager.AddToRoleAsync(user, role);
            
            return result;
        }

        private IdentityError[] DuplicateEmail(string v)
        {
            throw new NotImplementedException();
        }
    }
}
