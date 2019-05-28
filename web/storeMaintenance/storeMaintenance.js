const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName: '',
    shopDesc: '',
    imgHost: app.globalData.imgHost,
    nodeHost: app.globalData.nodeHost,
    userShopImg: app.globalData.imgHost + '/images/platform/personal/icon_shop.jpg'
  },
  changeShopName: function(e){
    var that = this;
    var shopName = e.detail.value;
    that.setData({
      shopName: shopName
    })
  },
  changeShopDesc: function (e) {
    var that = this;
    var shopDesc = e.detail.value;
    that.setData({
      shopDesc: shopDesc
    })
  },
  saveShopMsg: function(){
    var that = this;
    var shopName = that.data.shopName;
    var shopDesc = that.data.shopDesc;
    //ajax
  },
  upload: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.id;
    var shopId = wx.getStorageSync('shopId');
    var imgUrl = 'https://teststatic.cncoopay.com:8080/';
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.uploadFile({
          url: that.data.nodeHost + '/Data/img/imgUpLoad?shopId=' + shopId,
          filePath: res.tempFilePaths[0],
          name: 'image',
          success: function (res) {
            var r = JSON.parse(res.data);
              that.setData({
                userShopImg: imgUrl + r.downUrl
              });
          }
        })
      }
    })
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