﻿
namespace API.Models
{
    public class RegisterModel
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RepeatedPassword { get; set; }
    }
}
