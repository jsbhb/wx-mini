const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      type: 'title',
      title: '管理收货地址',
      leftIcon: 'back',
      rightIcon: false
    },
    imgHost: app.globalData.imgHost
  },
  setDefaultAddress: function(e){
    var that = this;
    var data = {};
    var id = e.currentTarget.dataset.id;
    var addressListData = that.data.addressListData;
    addressListData.forEach(function(v,i){
      if(v.id == id){
        v.setDefault = 1;
        data = v;
      }
    });
    app.updateAddressMsg(that, data);
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
    var that = this;
    app.getAddressData(that,{});
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