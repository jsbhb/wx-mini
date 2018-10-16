const app = getApp();
const ajaxFun = require('../../until/until.js').ajaxFun;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      type: 'search', 
      leftIcon: 'scan',
      rightIcon: 'news'
    },
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var centerId = app.globalData.centerId;
    var requestUrl = host + '/goodscenter/auth/1.0/goods/base' + '?centerId=' + centerId + '&numPerPage=' + 10 + '&currentPage=' + that.data.currentPage;
    var oldData = that.data.searchListData || [];
    if (options.goodsName){
      that.setData({
        ['headerData.searchData']: options.goodsName
      });
    }
    if (options.firstCategory) {
      requestUrl += '&firstCategory=' + options.firstCategory;
    }
    if (options.secondCategory) {
      requestUrl += '&secondCategory=' + options.secondCategory;
    }
    if (options.thirdCategory){
      requestUrl += '&thirdCategory=' + options.thirdCategory;
    }
    if (options.upShelves){
      requestUrl += '&upShelves=' + options.upShelves;
    }
    if (options.type){
      requestUrl += '&type=' + options.type;
    }
    that.setData({
      'searchListData.requestUrl_comprehensive': requestUrl,
      'searchListData.requestUrl_new': requestUrl + '&sortList[0].sortField=create_time&sortList[0].sortRule=desc',
      'searchListData.requestUrl_price_plus': requestUrl + '&sortList[0].sortField=price&sortList[0].sortRule=asc',
      'searchListData.requestUrl_price_minus': requestUrl + '&sortList[0].sortField=price&sortList[0].sortRule=desc'
    });
    var newData = ajaxFun.getSearchListData(that, oldData, that.data.searchListData.requestUrl_comprehensive);
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