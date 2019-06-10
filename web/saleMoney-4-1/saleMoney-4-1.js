const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: app.globalData.imgHost
  },
  cardBankChange: function(e){
    var that = this;
    var cardBank = e.detail.value;
    that.setData({
      cardBank: cardBank
    });
  },
  cardNoChange: function(e){
    var that = this;
    var cardNo = e.detail.value;
    var reg = /^([1-9]{1})(\d{14}|\d{18})$/;
    that.setData({
      cardNo: cardNo
    });
    var data = {
      cardNo: cardNo
    }
    if (reg.test(cardNo)){
      app.checkBankType(that, data);
    }
  },
  cardNameChange: function(e){
    var that = this;
    var cardName = e.detail.value;
    that.setData({
      cardName: cardName
    });
  },
  cardMobileChange: function(e){
    var that = this;
    var cardMobile = e.detail.value;
    that.setData({
      cardMobile: cardMobile
    });
  },
  addBankList: function(){
    var that = this;
    var cardNo = that.data.cardNo;
    var cardBank = that.data.cardBank;
    var cardName = that.data.cardName;
    var cardMobile = that.data.cardMobile;
    var data = {
      cardNo: cardNo,
      cardBank: cardBank,
      cardName: cardName,
      cardMobile: cardMobile
    }
    app.bindBank(that,data);
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