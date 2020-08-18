using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WPProekt.Data;
using WPProekt.Filters;
using WPProekt.Models;
using static WPProekt.Models.User;

namespace WPProekt.Controllers
{
    [EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
    public class PostsController : ApiController {
        private BlogDbContext db = new BlogDbContext();

        // GET: api/Posts
        public IQueryable<Post> GetPosts(bool getDrafts = false) {
            if (getDrafts) {
                return db.Posts;
            } else {
                return db.Posts.Where(post => !post.isDraft);
            }
        }

        // GET: api/Posts/newest
        [HttpGet]
        [Route("api/posts/newest")]
        public IQueryable<Post> NewestPosts() {
            var newestPosts = (from post in db.Posts
                               orderby post.DateCreated descending
                               select post)
                               .Where(post => !post.isDraft)
                               .Take(3);

            return newestPosts;
        }

        // GET: api/Posts/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult GetPost(int id)
        {
            Post postToReturn = db.Posts
               .Where(post => post.ID == id)
               .Include(post => post.Comments)
               .FirstOrDefault();
            if (postToReturn == null)
            {
                return NotFound();
            }

            return Ok(postToReturn);
        }

        // PUT: api/Posts/5
        [ResponseType(typeof(void))]
        [RoleAuthorizationFilter(true, new Roles[] { Roles.Admin })]
        public IHttpActionResult PutPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var postToUpdate = db.Posts
                .Where(p => p.ID == post.ID)
                .Include(p => p.Comments)
                .FirstOrDefault();

            if (postToUpdate != null) {
                postToUpdate.Update(post);
            } else {
                return BadRequest();
            }

            db.Entry(postToUpdate).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(post.ID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Posts
        [ResponseType(typeof(Post))]
        [RoleAuthorizationFilter(true, new Roles[] { Roles.Admin })]
        public IHttpActionResult PostPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Posts.Add(post);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = post.ID }, post);
        }

        // DELETE: api/Posts/5
        [ResponseType(typeof(Post))]
        [RoleAuthorizationFilter(true, new Roles[] { Roles.Admin })]
        public IHttpActionResult DeletePost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            db.SaveChanges();

            return Ok(post);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(int id)
        {
            return db.Posts.Count(e => e.ID == id) > 0;
        }
    }
}