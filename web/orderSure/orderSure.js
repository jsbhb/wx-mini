const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHost: app.globalData.imgHost,
    addressId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getAddressData(that, {});
    if (options && options.addressId){
      that.setData({
        addressId: options.addressId
      });
    }
    getApp().setWatcher(that);
  },
  watch: {
    addressId: function (newVal, oldVal) {
      var that = this;
      var addressId = newVal;
      that.getPostFee(addressId);
    },
    postFeeArr: function (newVal, oldVal){
      var that = this;
      var ordersInfo = wx.getStorageSync('ordersInfo');
      var isHave = false;
      newVal.forEach(function(v,i){
        for (let k1 in ordersInfo) {
          for (let k2 in ordersInfo[k1]) {
            if (ordersInfo[k1][k2].supplierId == v.supplierId) {
              ordersInfo[k1][k2].postFee = v.postFee.toFixed(2);
            }
          }
        }
      });
      that.setData({
        ordersInfo: ordersInfo
      });
      that.getTaxFee(ordersInfo);
    }
  },
  getPostFee: function(addressId){
    var that = this;
    var addressListData = that.data.addressListData;
    var postFeeArr = that.data.postFeeArr || [];
    addressListData.forEach(function(v,i){
      if (v.id == addressId){
        var ordersInfo = wx.getStorageSync('ordersInfo');
        var isCount = false;
        var dataArr = [];
        for (let k1 in ordersInfo){
          for (let k2 in ordersInfo[k1]){
            var data = {};
            for (let k3 in ordersInfo[k1][k2].itemObj){
              if (ordersInfo[k1][k2].itemObj[k3].freePost == 0){
                isCount = true;
                data.weight = ordersInfo[k1][k2].supplierWeight;
                data.price = ordersInfo[k1][k2].supplierPrice;
                data.province = v.province;
                data.supplierId = ordersInfo[k1][k2].supplierId;
                dataArr.push(data);
              }
            }
          }
        }
        if (isCount){
          app.getPostFee(that, dataArr);
        }
      }
    });
  },
  getTaxFee: function (ordersInfo){
    var that = this;
    var d = ordersInfo;
    var exciseTaxFee = 0;
    var incrementTaxFee = 0;
    for(let k1 in d){
      for(let k2 in d[k1]){
        for(let k3 in d[k1][k2].itemObj){
          if (d[k1][k2].itemObj[k3].freeTax == 0){
            let itemTotalPrice = d[k1][k2].itemObj[k3].quantity * d[k1][k2].itemObj[k3].priceList[0].price;
            let itemPostFee = d[k1][k2].postFee * (itemTotalPrice / d[k1][k2].supplierPrice);
            let itemExciseTax = d[k1][k2].itemObj[k3].exciseTax;
            let itemIncrementTax = d[k1][k2].itemObj[k3].incrementTax;
            let itemExciseTaxFee = 0;
            let itemIncrementTaxFee = 0;
            if (itemExciseTax && itemExciseTax != 0){
              itemExciseTaxFee = (itemTotalPrice + itemPostFee) / (1 - itemExciseTax) * itemExciseTax * 0.7;
            }
            if (itemIncrementTax && itemIncrementTax != 0){
              itemIncrementTaxFee = ((itemTotalPrice + itemPostFee) + (itemTotalPrice + itemPostFee) / (1 - itemExciseTax) * itemExciseTax * 0.7) * itemIncrementTax * 0.7;
            }
            exciseTaxFee += itemExciseTaxFee;
            incrementTaxFee += itemIncrementTaxFee;
          }
        }
        d[k1][k2].exciseTaxFee = exciseTaxFee.toFixed(2);
        d[k1][k2].incrementTaxFee = incrementTaxFee.toFixed(2);
        d[k1][k2].supplierPrice = (d[k1][k2].supplierPrice).toFixed(2);
        d[k1][k2].taxFee = (d[k1][k2].exciseTaxFee*1 + d[k1][k2].incrementTaxFee*1).toFixed(2);
        d[k1][k2].totalPrice = (d[k1][k2].supplierPrice * 1 + d[k1][k2].taxFee * 1 + d[k1][k2].postFee * 1).toFixed(2);
        exciseTaxFee = 0;
        incrementTaxFee = 0;
      }
    }
    that.setData({
      ordersInfo: d
    });
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
    var d = wx.getStorageSync('ordersInfo');
    for (let k1 in d) {
      for (let k2 in d[k1]) {
        d[k1][k2].exciseTaxFee = (d[k1][k2].exciseTaxFee*1).toFixed(2);
        d[k1][k2].incrementTaxFee = (d[k1][k2].exciseTaxFee*1).toFixed(2);
        d[k1][k2].supplierPrice = (d[k1][k2].supplierPrice).toFixed(2);
        d[k1][k2].taxFee = (d[k1][k2].exciseTaxFee * 1 + d[k1][k2].incrementTaxFee * 1).toFixed(2);
        d[k1][k2].totalPrice = (d[k1][k2].supplierPrice * 1 + d[k1][k2].taxFee * 1 + d[k1][k2].postFee * 1).toFixed(2);
      }
    }
    that.setData({
      ordersInfo: d
    });

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