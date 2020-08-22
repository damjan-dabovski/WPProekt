package finki.dabod.wpproekt.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor extends HandlerInterceptorAdapter {
    private final AuthService service;

    public AuthInterceptor(AuthService service) {
        this.service = service;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        HandlerMethod handlerMethod = (HandlerMethod) handler;

        RequireAdmin isAdminRequired = handlerMethod.getMethod().getAnnotation(RequireAdmin.class);
        RequireLogin isAnyUserRequired = handlerMethod.getMethod().getAnnotation(RequireLogin.class);

        if(isAdminRequired == null && isAnyUserRequired == null)
            return true;

        String requestUid = request.getHeader("uid");
        if(StringUtils.isEmpty(requestUid)) {
            setUnauthorizedStatus(response);
            return false;
        }

        if(isAdminRequired != null){
            return handleAdminAuth(requestUid, response);
        }

        return handleAnyUserAuth(requestUid, response);
    }

    private boolean handleAdminAuth(String uid, HttpServletResponse response){
        if(service.doesUserHaveRole(uid, AuthService.Role.ADMIN)){
            return true;
        } else {
            setUnauthorizedStatus(response);
            return false;
        }
    }

    private boolean handleAnyUserAuth(String uid, HttpServletResponse response){
        if(service.doesUserHaveRole(uid, AuthService.Role.USER)|| service.doesUserHaveRole(uid, AuthService.Role.ADMIN)){
            return true;
        } else {
            setUnauthorizedStatus(response);
            return false;
        }
    }

    private void setUnauthorizedStatus(HttpServletResponse response){
        response.setStatus(401);
    }
}
