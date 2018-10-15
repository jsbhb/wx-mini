// web/nav/nav.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTotalData: {},
    navRightData: {},
    firstActive: '',
    headerData: {
      type: 'search'
    },
    footerData: {
      active: 2
    },
    scrollHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - 45 + 'px'
    });
    wx.request({
      url: app.globalData.host + '/goodscenter/auth/1.0/goods/navigation?centerId=2',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(response){
        that.setData({
          navTotalData : response.data.obj,
          navRightData: response.data.obj[0].dictList,
          firstActive: response.data.obj[0].id
        });
      }
    })
  },

  chooseItem: function(e){
    var that = this;
    var firstActive = e.currentTarget.id;
    var navTotalData = that.data.navTotalData;
    for (var i = 0; i < navTotalData.length; i++){
      if (navTotalData[i].id == firstActive){
        that.setData({
          navRightData: navTotalData[i].dictList,
          firstActive: firstActive
        });
      }
    }
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