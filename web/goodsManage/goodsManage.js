const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: app.globalData.imgHost,
    icon_type: null,
    dataId: null,
    inputShow: false,
    searchValue: null
  },
  chooseItem: function(e){
    var that = this;
    var newId = e.currentTarget.dataset.id;
    var oldId = that.data.dataId;
    var type;
    if (that.data.icon_type){
      type = that.data.icon_type.split('_')[0];
    }
    if (newId == oldId){
      if(type == 'top'){
        that.setData({
          icon_type: 'bottom_' + newId
        });
      } else if (type == 'bottom'){
        that.setData({
          icon_type: 'top_' + newId
        });
      }
    }else{
      that.setData({
        icon_type: 'top_' + newId,
        dataId: newId
      });
    }
  },
  showSearch: function(){
    var that = this;
    var inputShow = that.data.inputShow;
    if(inputShow){
      that.setData({
        searchValue: null
      })
    }
    that.setData({
      inputShow: !inputShow
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