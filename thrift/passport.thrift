#@namespace scala com.itiancai.passport.thrift

/**
* 渠道来源
**/
enum Source {
    WEB = 0//PC主站
    WEB_APP = 1//H5
    APP = 2//移动APP
    BACK =3//系统后台
    BATCH=4//批量导入
}

/**
* 用户信息
**/
struct User {
    1: required string mobile; //手机号
    2: required string passowrd; //密码
    3: required Source source;//渠道来源
    4: optional string loginName; //登录名(可为空)
}

/**
* 用户登录信息
**/
struct UserLogin {
    1: required string credential; //登录名
    2: required string password; //密码
    3: required Source source;//渠道来源
}

/**
* 返回结果信息
**/
struct PassportResult {
    1: required string err_code;//返回代码
    2: required string err_msg;//返回信息
    3: optional User user;//用户信息
}


//账户系统service
service PassportService {

    //注册信息验证接口
    PassportResult registerValidate(1:string name, 2:string value)
    //注册接口
    PassportResult regist(1:User user)
    //登录接口
    PassportResult login(1:UserLogin user)
    //查询用户接口
    PassportResult userInfo(1:i64 userId)
}
