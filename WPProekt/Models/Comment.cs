using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WPProekt.Models {
    public class Comment {
        public int ID { get; set; }

        [Required]
        public string AuthorName { get; set; }

        public string Content { get; set; }

        public DateTime DateCreated { get; set; }

        public int PostID { get; set; }

        public Comment() {
            DateCreated = DateTime.UtcNow;
        }
    }
}