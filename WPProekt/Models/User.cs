using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WPProekt.Models {
    public class User {
        [Required]
        [Key]
        public string Uid { get; set; }
        public string UserName { get; set; }
        public Roles Role { get; set; }

        public enum Roles {
            Admin,
            User
        }
    }
}