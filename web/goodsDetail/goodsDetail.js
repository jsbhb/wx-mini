// web/goodsDetail/goodsDetail.js
const app = getApp();
const ajaxFun = require('../../until/until.js').ajaxFun;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData:{
      type: 'title',
      title: '商品详情',
      leftIcon: 'home',
      rightIcon: 'shopCart'
    },
    bannerData: {
      imgs: [],
      imgHeight: '560rpx',//图片高度
      indicatorDots: true,//是否显示面板指示点
      autoplay: true, //是否自动轮播
      interval: 5000, //自动切换时间间隔
      duration: 500, //滑动动画时长
      circular: true //	是否采用衔接滑动
    },
    imgHost: app.globalData.imgHost
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && (options.goodsId || options.itemId)){
      var that = this;
      var host = app.globalData.host;
      var centerId = app.globalData.centerId;
      var requestUrl = host + '/goodscenter/auth/1.0/' + centerId + '/goods?goodsId=' + options.goodsId || options.itemId;
      ajaxFun.getGoodsDetailData(that, requestUrl);
    }else{
      wx.navigateBack({
        delta: 1
      })
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