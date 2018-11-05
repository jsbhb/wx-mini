// web/goodsDetail/goodsDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData:{
      type: 'title',
      title: '商品详情',
      leftIcon: 'home',
      rightIcon: 'shopCart'
    },
    bannerData: {
      imgs: [],
      imgHeight: '560rpx',//图片高度
      indicatorDots: true,//是否显示面板指示点
      autoplay: true, //是否自动轮播
      interval: 5000, //自动切换时间间隔
      duration: 500, //滑动动画时长
      circular: true //	是否采用衔接滑动
    },
    imgHost: app.globalData.imgHost,
    alertShow: false,
    attrValueList: [],
    quantity: 1
  },
  numAdd: function(e){
    var that = this;
    if (JSON.stringify(e.currentTarget.dataset) == '{}'){
      return;
    }
    var maxNum = e.currentTarget.dataset.max || 999999;
    var stock = e.currentTarget.dataset.stock;
    var itemId = e.currentTarget.dataset.itemid;
    var quantity = that.data.quantity;
    if (quantity < maxNum && quantity < stock) {
      quantity++;
      that.setData({
        quantity: quantity
      });
    } else {
      console.log('已超过最大购买数量');
    }
  },
  numMinus: function(e){
    var that = this;
    if (JSON.stringify(e.currentTarget.dataset) == '{}') {
      return;
    }
    var minNum = e.currentTarget.dataset.min || 1;
    var stock = e.currentTarget.dataset.stock;
    var itemId = e.currentTarget.dataset.itemid;
    var quantity = that.data.quantity;
    if (quantity > minNum) {
      quantity--;
      that.setData({
        quantity: quantity
      });
    } else {
      console.log('购买数量不得低于最小购买量');
    }
  },
  numChange: function(e){
    var that = this;
    if (JSON.stringify(e.currentTarget.dataset) == '{}') {
      that.setData({
        quantity: 1
      });
    }
    var maxNum = e.currentTarget.dataset.max || 999999;
    var minNum = e.currentTarget.dataset.min || 1;
    var stock = e.currentTarget.dataset.stock;
    var itemId = e.currentTarget.dataset.itemid;
    var num = e.detail.value;
    var quantity = 1;
    if (num < minNum) {
      console.log('数量不得低于最小购买量');
    }
    if (num > minNum && num < stock && num < maxNum) {
      quantity = num;
    }
    if (num > stock) {
      if (stock > maxNum) {
        quantity = maxNum;
        console.log('数量不得超过最大购买量');
      } else {
        quantity = stock;
        console.log('数量不得超过最大库存量');
      }
    }
    that.setData({
      quantity: quantity
    });
  },
  goodsToBuy: function(){
    var that = this;
    var data = {};
    if (that.data.alertShow == false) {
      that.setData({
        alertShow: true
      });
    } else if (that.data.alertShow) {
      var chooseItemData = that.data.chooseItemData;
      var goodsDetailData = that.data.goodsDetailData;
      if (goodsDetailData.goodsSpecsList.length == 1) {
        chooseItemData = goodsDetailData.goodsSpecsList[0];
      }
      if (chooseItemData) {
        data[goodsDetailData.type] = {};
        data[goodsDetailData.type][goodsDetailData.supplierId] = {};
        data[goodsDetailData.type][goodsDetailData.supplierId].type = goodsDetailData.type;
        if (goodsDetailData.type == 0){
          data[goodsDetailData.type][goodsDetailData.supplierId].typeName = "跨境";
        } else if (goodsDetailData.type == 2){
          data[goodsDetailData.type][goodsDetailData.supplierId].typeName = "一般贸易";
        }
        data[goodsDetailData.type][goodsDetailData.supplierId].supplierId = goodsDetailData.supplierId;
        data[goodsDetailData.type][goodsDetailData.supplierId].supplierName = goodsDetailData.supplierName;
        data[goodsDetailData.type][goodsDetailData.supplierId].supplierPrice = that.data.quantity * chooseItemData.priceList[0].price;
        data[goodsDetailData.type][goodsDetailData.supplierId].supplierWeight = that.data.quantity * chooseItemData.weight;
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj = {};
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId] = chooseItemData;
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId].freePost = goodsDetailData.freePost;
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId].freeTax = goodsDetailData.freeTax;
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId].incrementTax = 0.16;
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId].quantity = that.data.quantity;
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId].itemImg = goodsDetailData.goodsFileList[0].path;
        data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId].itemName = goodsDetailData.customGoodsName;
        if (chooseItemData.info){
          var info = '';
          var d = JSON.parse(chooseItemData.info);
          for (let k in d){
            info += (d[k] + '、');
          }
          data[goodsDetailData.type][goodsDetailData.supplierId].itemObj[chooseItemData.itemId].infoStr = info;
        }
        data[goodsDetailData.type][goodsDetailData.supplierId].taxFee = 0;
        data[goodsDetailData.type][goodsDetailData.supplierId].postFee = 0;
        data[goodsDetailData.type][goodsDetailData.supplierId].exciseTaxFee = 0;
        data[goodsDetailData.type][goodsDetailData.supplierId].incrementTaxFee = 0;
        wx.setStorageSync('ordersInfo', data);
        wx.navigateTo({
          url: '/web/orderSure/orderSure',
        })
      } else {
        console.log('请选择规格');
        return;
      }
    }
  },
  goodsAddShopCart: function(){
    var that = this;
    var data = {};
    if(that.data.alertShow == false){
      that.setData({
        alertShow: true
      });
    } else if (that.data.alertShow){
      var goodsDetailData = that.data.goodsDetailData;
      var chooseItemData = that.data.chooseItemData;
      if (goodsDetailData.goodsSpecsList.length == 1){
        chooseItemData = goodsDetailData.goodsSpecsList[0];
      }
      if (chooseItemData){
        data.goodsImg = goodsDetailData.goodsFileList[0].path;
        data.goodsName = goodsDetailData.customGoodsName;
        data.itemId = chooseItemData.priceList[0].itemId;
        data.quantity = that.data.quantity;
        data.supplierId = goodsDetailData.supplierId;
        data.supplierName = goodsDetailData.supplierName;
        data.type = goodsDetailData.type;
        app.addShopCart(that, data);
      }else{
        console.log('请选择规格');
        return;
      }
    }
  },
  hideAlertContent: function(){
    var that = this;
    that.setData({
      alertShow: false
    });
  },
  distachAttrValue: function (commodityAttr) {
    var attrValueList = this.data.attrValueList;
    for (var i = 0; i < commodityAttr.length; i++) {
      if (commodityAttr[i].attrValueList){
        for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
          var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
          if (attrIndex >= 0) {
            if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
              attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
            }
          } else {
            attrValueList.push({
              attrKey: commodityAttr[i].attrValueList[j].attrKey,
              attrValues: [commodityAttr[i].attrValueList[j].attrValue]
            });
          }
        }
      }
    }
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].attrValueStatus) {
          attrValueList[i].attrValueStatus[j] = true;
        } else {
          attrValueList[i].attrValueStatus = [];
          attrValueList[i].attrValueStatus[j] = true;
        }
      }
    }
    this.setData({
      attrValueList: attrValueList
    });
  },
  getAttrIndex: function (attrName, attrValueList) {
    for (var i = 0; i < attrValueList.length; i++) {
      if (attrName == attrValueList[i].attrKey) {
        break;
      }
    }
    return i < attrValueList.length ? i : -1;
  },
  isValueExist: function (value, valueArr) {
    for (var i = 0; i < valueArr.length; i++) {
      if (valueArr[i] == value) {
        break;
      }
    }
    return i < valueArr.length;
  },
  selectAttrValue: function (e) {
    var that = this;
    var attrValueList = that.data.attrValueList;
    var index = e.currentTarget.dataset.index;
    var key = e.currentTarget.dataset.key;
    var value = e.currentTarget.dataset.value;
    var goodsDetailData = that.data.goodsDetailData;
    var selectSku = [];
    var selectStr = {};
    if (e.currentTarget.dataset.status || index == that.data.firstIndex) {
      if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
        that.disSelectValue(attrValueList, index, key, value);
      } else {
        that.selectValue(attrValueList, index, key, value);
      }
    }
    for (var i = 0; i < that.data.attrValueList.length; i++) {
      var data = {};
      if (!that.data.attrValueList[i].selectedValue) {
        break;
      }
      data.attrKey = that.data.attrValueList[i].attrKey;
      data.attrValue = that.data.attrValueList[i].selectedValue;
      selectSku.push(data);
    }
    selectSku.forEach(function(v1,i1){
      selectStr[v1.attrKey] = v1.attrValue
    });
    that.setData({
      chooseItemData: ''
    });
    goodsDetailData.goodsSpecsList.forEach(function(v2,i2){
      if(JSON.stringify(selectStr) == v2.info){
        that.setData({
          chooseItemData: v2
        });
      }
    });
  },
  selectValue: function (attrValueList, index, key, value, unselectStatus) {
    var includeGroup = [];
    if (index == this.data.firstIndex && !unselectStatus) {
      var commodityAttr = this.data.commodityAttr;
      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
          attrValueList[i].selectedValue = '';
        }
      }
    } else {
      var commodityAttr = this.data.includeGroup;
    }
    for (var i = 0; i < commodityAttr.length; i++) {
      for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
        if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
          includeGroup.push(commodityAttr[i]);
        }
      }
    }
    attrValueList[index].selectedValue = value;
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = false;
      }
    }
    for (var k = 0; k < attrValueList.length; k++) {
      for (var i = 0; i < includeGroup.length; i++) {
        for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
          if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
            for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
              if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
                attrValueList[k].attrValueStatus[m] = true;
              }
            }
          }
        }
      }
    }
    this.setData({
      attrValueList: attrValueList,
      includeGroup: includeGroup
    });

    var count = 0;
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        if (attrValueList[i].selectedValue) {
          count++;
          break;
        }
      }
    }
    if (count < 2) {
      this.setData({
        firstIndex: index
      });
    } else {
      this.setData({
        firstIndex: -1
      });
    }
  },
  disSelectValue: function (attrValueList, index, key, value) {
    var commodityAttr = this.data.commodityAttr;
    attrValueList[index].selectedValue = '';
    for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
        attrValueList[i].attrValueStatus[j] = true;
      }
    }
    this.setData({
      includeGroup: commodityAttr,
      attrValueList: attrValueList
    });

    for (var i = 0; i < attrValueList.length; i++) {
      if (attrValueList[i].selectedValue) {
        this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && (options.goodsId || options.itemId)) {
      var that = this;
      var data = {
        goodsId: options.goodsId || options.itemId
      };
      app.getGoodsDetailData(that, data);
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
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