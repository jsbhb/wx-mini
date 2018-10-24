// web/shoppingCart/shoppingCart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData:{
      type: 'title',
      title: '购物车',
      leftIcon: 'back',
      rightIcon: 'edit'
    },
    footerData: {
      active: 3
    },
    startX: 0,
    startY: 0,
    imgHost: app.globalData.imgHost,
    allChooseStatus: 'selected',
    shopCartStatus: 'normal'
  },
  goodsItemSelected: function(e){
    var that = this;
    var itemId = e.currentTarget.dataset.itemid;
    var itemIdReturn = that.getItemIdData(itemId);
    var itemIdData = itemIdReturn.data;
    var itemIdIndex = itemIdReturn.index;
    var allData = that.data.shopCartData;
    var selectedNum = 0;
    if (itemIdData.type == 2){
      if (itemIdData.status == 'selected') {
        itemIdData.status = '';
        that.setData({
          allChooseStatus: ''
        });
      }else{
        itemIdData.status = 'selected';
      }
    } else if (itemIdData.type == 0){
      if (itemIdData.status == 'selected') {
        itemIdData.status = '';
        that.setData({
          allChooseStatus: ''
        });
      } else {
        itemIdData.status = 'selected';
      }
    }
    for (var i = 0; i < allData.length; i++) {
      if (allData[i].status == 'selected') {
        selectedNum ++;
      }
    }
    if (selectedNum == allData.length) {
      that.setData({
        allChooseStatus: 'selected'
      });
    }
    allData[itemIdIndex] = itemIdData;
    that.setData({
      shopCartData: allData,
      selectedNum: selectedNum
    });
    that.getAllPrice(allData);
  },
  allGoodsSelected: function(){
    var that = this;
    var allStatus = '';
    var itemStatus = '';
    var allData = that.data.shopCartData;
    var allChooseStatus = that.data.allChooseStatus;
    if (allChooseStatus == 'selected'){
      allStatus = '';
      itemStatus = '';
      that.setData({
        selectedNum: 0
      });
    } else {
      allStatus = 'selected';
      itemStatus = 'selected';
      that.setData({
        selectedNum: allData.length
      });
    }
    for(var i = 0; i < allData.length; i++){
      allData[i].status = itemStatus
    }
    that.setData({
      shopCartData: allData,
      allChooseStatus: allStatus
    });
    that.getAllPrice(allData);
  },
  numberAdd: function(e){
    var that = this;
    var maxNum = e.currentTarget.dataset.max || 999999;
    var itemId = e.currentTarget.dataset.itemid;
    var itemIdReturn = that.getItemIdData(itemId);
    var itemIdData = itemIdReturn.data;
    var itemIdIndex = itemIdReturn.index;
    var allData = that.data.shopCartData;
    if (itemIdData.quantity < maxNum){
      itemIdData.quantity ++;
      allData[itemIdIndex] = itemIdData;
      that.setData({
        shopCartData: allData
      });
       that.getAllPrice(allData);
    }else{
      console.log('已超过最大购买数量');
    }
  },
  numberMinus: function(e){
    var that = this;
    var minNum = e.currentTarget.dataset.min || 1;
    var itemId = e.currentTarget.dataset.itemid;
    var itemIdReturn = that.getItemIdData(itemId);
    var itemIdData = itemIdReturn.data;
    var itemIdIndex = itemIdReturn.index;
    var allData = that.data.shopCartData;
    if (itemIdData.quantity > 1 && itemIdData.quantity > minNum) {
      itemIdData.quantity--;
      allData[itemIdIndex] = itemIdData;
      that.setData({
        shopCartData: allData,
      });
      that.getAllPrice(allData);
    }else{
      console.log('已到达最小购买数量');
    }
  },
  getItemIdData:function(itemId){
    var that = this;
    var shopCartData = that.data.shopCartData;
    var returnData = {};
    if (shopCartData && shopCartData.length > 0){
      for (var i = 0; i < shopCartData.length; i++) {
        if (shopCartData[i].goodsSpecs.priceList[0].itemId == itemId){
          returnData.data = shopCartData[i];
          returnData.index = i;
          return returnData;
        }
      }
    }
  },
  getAllPrice: function(data){
    var that = this;
    var allCrossPrice = 0;
    var allNormalPrice = 0;
    for (var i = 0; i < data.length; i++){
      if (data[i].type == 0 && data[i].status == 'selected') {
        allCrossPrice += data[i].goodsSpecs.priceList[0].price * data[i].quantity;
      } else if (data[i].type == 2 && data[i].status == 'selected') {
        allNormalPrice += data[i].goodsSpecs.priceList[0].price * data[i].quantity;
      }
    }
    that.setData({
      allCrossPrice: allCrossPrice.toFixed(2),
      allNormalPrice: allNormalPrice.toFixed(2)
    });
  },
  getSelectedData: function(data){
    var that = this;
    var allSelectedData = [];
    data.forEach(function(v,i){
      if (v.status == 'selected'){
        allSelectedData.push(v);
      }
    });
    return allSelectedData;
  },
  shopCartDelete: function(e){
    var that = this;
    var ids = [];
    var shopCartId = e.currentTarget.dataset.id;
    ids.push(shopCartId);
    var data = {
      userId: wx.getStorageSync('userId'),
      ids: ids
    };
    app.delShoppingCartData(that, data);
  },
  allShopCartDelete: function (e) {
    var ids = [];
    var that = this;
    var allData = that.data.shopCartData;
    var allSelectedData = that.getSelectedData(allData);
    allSelectedData.forEach(function(v,i){
      ids.push(v.id);
    });
    var data = {
      userId: wx.getStorageSync('userId'),
      ids: ids
    };
    app.delShoppingCartData(that, data);
  },
  touchstart: function (e) {
    var that = this;
    var allData = that.data.shopCartData;
    allData.forEach(function (v, i) {
      if (v.isTouchMove)
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      shopCartData: allData
    })
  },
  touchmove: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//当前索引
    var startX = that.data.startX;//开始X坐标
    var startY = that.data.startY;//开始Y坐标
    var touchMoveX = e.changedTouches[0].clientX;//滑动变化坐标
    var touchMoveY = e.changedTouches[0].clientY;//滑动变化坐标
    var angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });//获取滑动角度
    var allData = that.data.shopCartData;
    allData.forEach(function (v, i) {
      v.isTouchMove = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) {return}
      if (i == index) {
        if (touchMoveX > startX){
          v.isTouchMove = false;  //右滑
        } else {
          v.isTouchMove = true;   //左滑
        } 
      }
    })
    //更新数据
    that.setData({
      shopCartData: allData
    })
  },
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  del: function (e) {
    var that = this;
    var allData = that.data.shopCartData;
    allData.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      shopCartData: allData
    })
  },
  changeStatus:function(e){
    var that = this;
    var allData = that.data.shopCartData;
    var shopCartStatus = e.detail.shopCartStatus;
    that.setData({
      shopCartStatus: shopCartStatus
    });
    if (shopCartStatus == 'delete'){
      allData.forEach(function (v, i) {
        v.status = '';
      });
      that.getAllPrice(allData);
      that.setData({
        selectedNum: 0,
        shopCartData: allData,
        allChooseStatus: ''
      });
    }else{
      allData.forEach(function (v, i) {
        v.status = 'selected';
      });
      that.getAllPrice(allData);
      that.setData({
        selectedNum: allData.length,
        shopCartData: allData,
        allChooseStatus: 'selected'
      });
    }
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
    wx.hideTabBar({});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (app.globalData.isLogin == false) {
      wx.redirectTo({
        url: '/web/login/login'
      })
      return;
    }
    var data = {};
    app.getShoppingCartData(that, data);
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