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
    goodsListData_1:[],
    goodsListData_2:[],
    footerData:{
      active: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/goodscenter/auth/1.0/applet/index/4',
      method: 'GET',
      data:{},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(options){
        var data = options.data.module;
        var goodsListData_1 = [];
        var goodsListData_2 = [];
        for (var i = 0; i < data.length; i++){
          if (data[i].code == "banner-1"){
            that.setData({
              ['bannerData.imgs']: data[i].cont
            });
          }
          if (data[i].code == "goodsList-2"){
            goodsListData_1.push(data[i]);
          }
          if (data[i].code == "goodsList-3") {
            goodsListData_2.push(data[i]);
          }
        }
        for (var i = 0; i < goodsListData_2.length; i++){
          for (var j = 0; j < goodsListData_2[i].cont.length; j++){
            if (goodsListData_2[i].cont[j].tagPath){
              goodsListData_2[i].cont[j].tagPath = goodsListData_2[i].cont[j].tagPath.split(',');
            }
          }
        }
        that.setData({
          goodsListData_1: goodsListData_1,
          goodsListData_2: goodsListData_2,
        });
      }
    })
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