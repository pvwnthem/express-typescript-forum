export default {
    ensureAuthenticated: function(req: any, res: any, next: any) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/auth/login');
    },
    forwardAuthenticated: function(req: any, res: any, next: any) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/home');      
      
    }
  };