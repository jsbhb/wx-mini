const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      type: 'search',
      searchData: ''
    },
    currentPage: 1,
    searchListData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var centerId = app.globalData.centerId;
    var requestUrl = host + '/goodscenter/auth/1.0/goods/base' + '?centerId=' + centerId + '&numPerPage=' + 10 + '&currentPage=' + that.data.currentPage;
    if (options.goodsName){
      that.setData({
        ['headerData.searchData']: options.goodsName
      });
    }
    if (options.firstCategory) {
      requestUrl += '&firstCategory=' + options.firstCategory
    }
    if (options.secondCategory) {
      requestUrl += '&secondCategory=' + options.secondCategory
    }
    if (options.thirdCategory){
      requestUrl += '&thirdCategory=' + options.thirdCategory
    }
    wx.request({
      url: requestUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (response) {
        var rSearchListData = response.data.obj.goodsList || [];
        var searchListData = that.data.searchListData.concat(rSearchListData);
        var tagListArr = [];
        if (rSearchListData && rSearchListData.length > 0){
          for (var i = 0; i < rSearchListData.length; i++) {
            if (rSearchListData[i].goodsSpecsList && rSearchListData[i].goodsSpecsList.length > 0) {
              for (var j = 0; j < rSearchListData[i].goodsSpecsList.length; j++) {
                if (rSearchListData[i].goodsSpecsList[j].tagList && rSearchListData[i].goodsSpecsList[j].tagList.length > 0) {
                  for (var k = 0; k < rSearchListData[i].goodsSpecsList[j].tagList.length; k++) {
                    if (tagListArr.indexOf(rSearchListData[i].goodsSpecsList[j].tagList[k].tagName) == -1 && tagListArr.length < 3) {
                      tagListArr.push(rSearchListData[i].goodsSpecsList[j].tagList[k].tagName);
                    }
                  }
                }
              }
            }
            rSearchListData[i].tagListArr = tagListArr;
            tagListArr = [];
          }
        }
        that.setData({
          searchListData: searchListData
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