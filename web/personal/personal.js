// web/personal/personal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      type: 'title',
      title: '个人中心',
      leftIcon: false,
      rightIcon: false
    },
    footerData: {
      active: 4
    },
    imgHost: app.globalData.imgHost,
  },

  logout: function(){
    var that = this;
    that.setData({
      isLogin: false
    });
    wx.removeStorageSync('authId');
    wx.removeStorageSync('userId');
    app.globalData.authentication = null;
    app.globalData.isLogin = false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideTabBar({});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var host = app.globalData.host;
    var centerId = app.globalData.centerId;
    var userId = wx.getStorageSync('userId');
    var shopId = wx.getStorageSync('shopId') || 2;
    if (userId){
      that.setData({
        isLogin: app.globalData.isLogin
      });
      var data1 = {
        centerId: centerId,
        userId: userId
      }
      var data2 = {
        centerId: centerId,
        shopId: shopId
      }
      app.userDetailQuery(that, data1);
      app.shopDetailQuery(that, data2);
    }
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