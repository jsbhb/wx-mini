// pages/index/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerData:{
      imgs: [],
      indicatorDots: true,//是否显示面板指示点
      autoplay: true, //是否自动轮播
      interval: 5000, //自动切换时间间隔
      duration: 500, //滑动动画时长
      circular: true //	是否采用衔接滑动
    },
    headerData: {
      type: 'search',
      leftIcon: 'scan',
      rightIcon: 'news'
    },
    footerData:{
      active: 1
    }
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
    var data = {};
    app.getIndexData(that, data);
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