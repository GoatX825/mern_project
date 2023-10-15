import UserService from "../services/user.services.js";
import AuthService from "../services/auth.services.js";
class UserController {
  user_svc;
  auth_svc;

  constructor() {
    this.user_svc = new UserService();
    this.auth_svc = new AuthService();
  }

  userRegister =  (req, res, next) => {
    // server-side data validation
    let data =  req.body;
    console.log(data);
    let error_msgs = this.user_svc.validateRegister(data);

    if (req.file) {
      data["image"] = req.file.filename;
      // console.log(req.file.filename);
    }

    if (Object.keys(error_msgs).length > 0) {
      next({
        status_code: 400,
        msg: error_msgs,
      });

    } else {
      // trigger event. Event is async func : emit => generating events
      // req.myEvents.emit('register', {data: data});

      // db insert operation
      this.user_svc
        .userRegister(data)
        .then((response) => {
          // console.log(response);
          res.json({
            result: response,
            status: true,
            msg: "User Registered",
          });
        })
        .catch((error) => {
          next({ status_code: 400, msg: error });
        });
    }
  };

  listAllUsers = async (req, res, next) => {
    let all_users = await this.user_svc.getAllUsers();
    res.json({
      result: all_users,
      status: true,
      msg: "User Fetched",
    });
};

  getUserById = async (req, res, next) => {
    let user = await this.user_svc.getUserById(req.params.id);
    res.json({
      result: user,
      status: true,
      msg: "User Details Fetched"
    });
  };

  updateUserById = (req, res, next) => {
    let data =  req.body;
    console.log(data);
    let error_msgs = this.user_svc.validateRegister(data, true);

    if (req.file) {
      data["image"] = req.file.filename;
      // console.log(req.file.filename);
    }else{
      delete data.image;
    }

    if (Object.keys(error_msgs).length > 0) {
      next({
        status_code: 400,
        msg: error_msgs,
      });

    } else {
      // trigger event. Event is async func : emit => generating events
      // req.myEvents.emit('register', {data: data});

      // db insert operation
      this.user_svc
        .updateUserById(data, req.params.id)
        .then((response) => {
          // console.log(response);
          res.json({
            result: response,
            status: true,
            msg: "User Updated Successfully",
          });
        })
        .catch((error) => {
          next({ status_code: 400, msg: error });
        });
    }
  };

  deleteUserById = async (req, res, next) => {
    let user = await this.user_svc.deleteUserById(req.params.id);
    res.json({
      result: user,
      status: true,
      msg: "User Deleted Successfully"
    });
  };

  userLogin = (req, res, next) => { 
      // login
      let data = req.body;
      // console.log("Data: ", data);
      if(!data.username || !data.password){
          next({
              status_code: 400,
              msg: "Credentials are Invalid"
          })
      }else{
        
         this.auth_svc.login(data.username, data.password)
         .then((user) => {
              res.json({
                  result: user,
                  status: true,
                  msg: "User Logged In"
              })
         })
         .catch((err) => {
            // console.log("error", err);  
              next({
                  status_code: 500,
                  msg: err.msg
              })
         })
      }
  }

  myProfile = (req, res, next) => {
    res.json({
      result: req.auth_user,
      status: true,
      msg: "Your Profile"
    })
  }

}

export default UserController;
