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
    searchValue: null,
    goodsName: '',
    sortName: 'sale_num',
    sortRule: 'asc',
    currentPage: 1,
    numPerPage: 10,
    scrollTop: 0,
  },
  chooseItem: function(e){
    var that = this;
    var newId = e.currentTarget.dataset.id;
    var oldId = that.data.dataId;
    var type;
    var data = {
      goodsName: that.data.goodsName,
      currentPage: 1,
      numPerPage: 10
    };
    if (newId == 0) {
      data.sortName = 'sale_num';
    }else if(newId == 1){
      data.sortName = 'rebate';
    }else if(newId == 2){
      data.sortName = 'fxqty';
    }else if(newId == 3){
      data.sortName = 'update_time';
    }
    that.setData({
      sortName: data.sortName,
      scrollTop: 0,
      currentPage: 1,
      numPerPage: 10
    });
    if (that.data.icon_type){
      type = that.data.icon_type.split('_')[0];
    }
    if (newId == oldId){
      if(type == 'top'){
        data.sortRule = 'asc';
        that.setData({
          icon_type: 'bottom_' + newId,
          sortRule: 'asc'
        });
      } else if (type == 'bottom'){
        data.sortRule = 'desc';
        that.setData({
          icon_type: 'top_' + newId,
          sortRule: 'desc'
        });
      }
    }else{
      data.sortRule = 'desc';
      that.setData({
        icon_type: 'top_' + newId,
        dataId: newId,
        sortRule: 'desc'
      });
    }
    app.getGoodsManageData(that, data);
  },
  showSearch: function(){
    var that = this;
    var inputShow = that.data.inputShow;
    that.setData({
      inputShow: !inputShow
    })
  },
  getMoreData: function(){
    var that = this;
    var goodsName = that.data.goodsName || '';
    var sortName = that.data.sortName;
    var sortRule = that.data.sortRule;
    var currentPage = that.data.currentPage;
    var numPerPage = that.data.numPerPage;
    var totalPages = that.data.totalPages;
    var oldData = that.data.goodsManageData;
    if (currentPage < totalPages){
      currentPage ++;
      that.setData({
        currentPage: currentPage
      })
      var data = {
        goodsName: goodsName,
        sortName: sortName,
        sortRule: sortRule,
        currentPage: currentPage,
        numPerPage: numPerPage
      }
      app.getGoodsManageData(that, data, oldData);
    }
  },
  searchProduct: function(e){
    var that = this;
    var goodsName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value;
    that.setData({
      goodsName: goodsName
    })
    var data = {
      goodsName: goodsName,
      sortName: that.data.sortName,
      sortRule: that.data.sortRule,
      currentPage: that.data.currentPage,
      numPerPage: that.data.numPerPage
    }
    app.getGoodsManageData(that, data);
  },
  toGoodsDetail: function(e){
    var goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '/web/goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = {
      goodsName: '',
      sortName: 'sale_num',
      sortRule: 'asc',
      currentPage: 1,
      numPerPage: 10,
      scrollTop: 0,
    }
    app.getGoodsManageData(that, data);
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