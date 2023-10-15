export const isAdmin = (req, res, next) => {
    if(req.auth_user.role === 'admin') {
        next();
    }else{
        next({
            status_code: 403,
            msg: "Access Denied"
        })
    }
}  

export const isAdminSeller = (req, res, next) => {
    if(req.auth_user.role === 'admin'   || req.auth_user.role === 'seller') {
        next();
    }else{
        next({
            status_code: 403,
            msg: "Access Denied"
        })
    }
}    

