using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using WPProekt.Data;
using static WPProekt.Models.User;

namespace WPProekt.Filters {
    public class RoleAuthorizationFilter: AuthorizationFilterAttribute {
        private bool Active = true;
        private Roles[] ValidRoles;
        private BlogDbContext db = new BlogDbContext();

        public RoleAuthorizationFilter() { }

        public RoleAuthorizationFilter(bool active, Roles[] roles) {
            Active = active;
            ValidRoles = roles;
        }

        public override void OnAuthorization(HttpActionContext actionContext) {
            if (Active) {
                var uid = GetUidFromRequest(actionContext);
                if (uid == null) {
                    RespondUnauthorized(actionContext);
                    return;
                }

                if (!IsUserWithUidAuthorized(uid)) {
                    RespondUnauthorized(actionContext);
                    return;
                }

                base.OnAuthorization(actionContext);
            }
        }

        private string GetUidFromRequest(HttpActionContext context) {
            var headers = context.Request.Headers;
            if (headers.Contains("Uid")) {
                return headers.GetValues("Uid").First();
            }
            return null;
        }

        private bool IsUserWithUidAuthorized(string uid) {
            var user = db.Users.FirstOrDefault(u => u.Uid == uid);

            if(user == null || !ValidRoles.Contains(user.Role)) {
                return false;
            }
            return true;
        }

        private void RespondUnauthorized(HttpActionContext context) {
            context.Response = context.Request.CreateResponse(HttpStatusCode.Unauthorized);
        }
    }
}