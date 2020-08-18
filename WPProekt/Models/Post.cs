using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WPProekt.Models {
    public class Post {

        public int ID { get; set; }
        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        public string Content { get; set; }

        public string AuthorName { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public List<Comment> Comments { get; set; }

        public bool isDraft { get; set; }

        public Post() {
            DateModified = DateCreated = DateTime.UtcNow;
            Comments = new List<Comment>();
        }

        public void Update(Post newVersion) {
            Title = newVersion.Title;
            Content = newVersion.Content;
            DateModified = DateTime.UtcNow;
        }
    }
}