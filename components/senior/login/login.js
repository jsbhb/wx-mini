const app = getApp();
Component({
  data: {
    phone: '',
    pwd: '',
    isClick: false,
    alertMsg: {}
  },
  methods: {
    userPhoneBlur: function(e){
      var that = this;
      if ((/^1(3|4|5|7|8)\d{9}$/gi).test(e.detail.value)) {
        that.setData({
          phone: e.detail.value
        })
      } else {
        that.setData({
          ['alertMsg.isShow']: true,
          ['alertMsg.alertTitle']: '温馨提示',
          ['alertMsg.alertMsg']: '请输入正确的手机号码',
          phone: ''
        })
        setTimeout(function(){
          that.setData({
            ['alertMsg.isShow']: false
          })
        },1000);
      }
    },
    userPhoneInput: function(e){
      var that = this;
      var phone = e.detail.value;
      var pwd = that.data.pwd;
      if(phone != '' && pwd != ''){
        that.setData({
          isClick: true
        })
      }else{
        that.setData({
          isClick: false
        })
      }
    },
    userPwdBlur: function(e){
      var that = this;
      if (e.detail.value < 6) {
        that.setData({
          ['alertMsg.isShow']: true,
          ['alertMsg.alertTitle']: '温馨提示',
          ['alertMsg.alertMsg']: '密码长度不得低于6位',
          phone: ''
        })
        setTimeout(function () {
          that.setData({
            ['alertMsg.isShow']: false
          })
        }, 1000);
      } else {
        that.setData({
          pwd: e.detail.value
        })
      }
    },
    userPwdInput: function(e){
      var that = this;
      var phone = that.data.phone;
      var pwd = e.detail.value;
      if (phone != '' && pwd != '' && pwd.length > 5) {
        that.setData({
          isClick: true
        })
      }else{
        that.setData({
          isClick: false
        })
      }
    },
    userSubmit: function(){
      var that = this;
      var phone = that.data.phone;
      var pwd = that.data.pwd;
      wx.request({
        url: app.globalData.host + '/authcenter/auth/login',
        data: {
          platUserType: 5,
          loginType: 1,
          phone: phone,
          password: pwd
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function(options){
          if (options.data.success){
            wx.redirectTo({
              url: '../index/index',
            })
          }else{
            that.setData({
              ['alertMsg.isShow']: true,
              ['alertMsg.alertTitle']: '温馨提示',
              ['alertMsg.alertMsg']: options.data.errorMsg
            })
            setTimeout(function () {
              that.setData({
                ['alertMsg.isShow']: false
              })
            }, 1000);
          }
        },
        fail: function () {
          that.setData({
            ['alertMsg.isShow']: true,
            ['alertMsg.alertTitle']: '温馨提示',
            ['alertMsg.alertMsg']: '登录失败，请重试！'
          })
          setTimeout(function () {
            that.setData({
              ['alertMsg.isShow']: false
            })
          }, 1000);
          console.log("登录失败，请重试！")
        }
      })
    }
  }
});