// web/login/login.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      type: 'title',
      title: '帐号登录',
      leftIcon: 'home',
      rightIcon: false
    },
    imgHost: app.globalData.imgHost,
    account: {
      value: '',
      status: 0
    },
    password: {
      value: '',
      status: 0
    },
    register: true
  },

  accountBlur:function(e){
    var that = this;
    var account = e.detail.value;
    var isPhone = (/^1(3|4|5|7|8)\d{9}$/gi).test(account);
    var data = {
      account: account
    }
    if (isPhone){
      app.userCheck(that, data);
      that.setData({
        'account.value': account,
        'account.status': 0
      });
    }else{
      console.log('手机号码不正确');
      that.setData({
        'account.value': account,
        'account.status': 1
      })
    }
  },

  passwordBlur: function(e){
    var that = this;
    var password = e.detail.value;
    if (password.length > 5){
      that.setData({
        'password.value': password,
        'password.status': 0
      });
    }else{
      console.log('密码长度需6-12位');
      that.setData({
        'password.value': password,
        'password.status': 1
      });
    }
  },

  accountClear: function(){
    var that = this;
    that.setData({
      'account.value': ''
    });
  },

  userLogin: function(){
    var that = this;
    var account = that.data.account.value;
    var password = that.data.password.value;
    var account_status = that.data.account.status;
    var password_status = that.data.password.status;
    var data = {
      account: account,
      password: password
    }
    var register = that.data.register;
    if (register == false){
      console.log('手机号未注册');
      return false;
    }
    if (account_status != 1 && password_status != 1){
      app.userLogin(that,data);
    }else{
      if (account_status == 1){
        if (account == ''){
          console.log('帐号不能为空');
        }else{
          console.log('帐号格式不正确');
        }
      } else if (password_status == 1){
        if(password == ''){
          console.log('密码不能为空');
        } else {
          console.log('密码长度不正确');
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.isLogin = false;
    wx.removeStorageSync('authId');
    wx.removeStorageSync('userId');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})