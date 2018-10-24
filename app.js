App({
  globalData: {
    host: 'https://testapi.cncoopbuy.com',
    imgHost: 'https://teststatic.cncoopbuy.com:8080/wechat',
    gradeId: 2,
    centerId: 2,
    loginType: 1,
    platUserType: 5,
    authentication: wx.getStorageSync('authId') || null
  },
  onLaunch: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');
    if(userId){
      that.globalData.isLogin = true;
    }else{
      that.globalData.isLogin = false;
    }
  },
  onShow: function(){
    
  },
  userLogin: function (obj, data) {
    var that = this;
    var host = that.globalData.host; 
    var loginType = that.globalData.loginType;
    var platUserType = that.globalData.platUserType;
    wx.request({
      url: host + '/authcenter/auth/login',
      method: 'POST',
      data: {
        platUserType: platUserType,
        loginType: loginType,
        phone: data.account,
        password: data.password
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data && res.data.success) {
          wx.setStorageSync('authId', '"Bearer "' + res.data.obj.token);
          wx.setStorageSync('userId', res.data.obj.userCenterId);
          wx.switchTab({
            url: '/web/index/index',
          })
          that.globalData.authentication = '"Bearer "' + res.data.obj.token;
          that.globalData.isLogin = true;
        } else if (res.data && !res.data.success) {
          console.log(res.data.errorMsg);
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  userCheck: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    var loginType = that.globalData.loginType;
    var platUserType = that.globalData.platUserType;
    wx.request({
      url: host + '/authcenter/auth/check',
      method: 'POST',
      data: {
        platUserType: platUserType,
        loginType: loginType,
        userName: data.account,
        phone: data.account
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data && res.data.obj == false) {
          obj.setData({
            register: false
          });
          console.log('手机号未注册');
        } else {
          obj.setData({
            register: true
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  userDetailQuery: function (obj, data){
    var that = this;
    var host = that.globalData.host;
    wx.request({
      url: host + '/usercenter/1.0/user/' + data.centerId + '/' + data.userId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success) {
          obj.setData({
            personalData: res.data.obj
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  shopDetailQuery: function (obj, data){
    var that = this;
    var host = that.globalData.host;
    wx.request({
      url: host + '/usercenter/auth/1.0/grade/config/' + data.centerId + '?shopId=' + data.shopId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        if(res.data && res.data.success){
          obj.setData({
            shopInfoData: res.data.obj
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getIndexData: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    wx.request({
      url: host + '/goodscenter/auth/1.0/applet/index/4',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var data = res.data.module || [];
        var goodsListData_1 = [];
        var goodsListData_2 = [];
        if (data == []) {
          console.log('获取数据失败');
        } else {
          for (var i = 0; i < data.length; i++) {
            if (data[i].code == "banner-1") {
              obj.setData({
                ['bannerData.imgs']: data[i].cont
              });
            }
            if (data[i].code == "goodsList-2") {
              goodsListData_1.push(data[i]);
            }
            if (data[i].code == "goodsList-3") {
              goodsListData_2.push(data[i]);
            }
          }
          for (var i = 0; i < goodsListData_2.length; i++) {
            for (var j = 0; j < goodsListData_2[i].cont.length; j++) {
              if (goodsListData_2[i].cont[j].tagPath) {
                goodsListData_2[i].cont[j].tagPath = goodsListData_2[i].cont[j].tagPath.split(',');
              }
            }
          }
          obj.setData({
            goodsListData_1: goodsListData_1,
            goodsListData_2: goodsListData_2,
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getNavData: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    wx.request({
      url: host + '/goodscenter/auth/1.0/goods/navigation?centerId=' + centerId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.obj) {
          obj.setData({
            navTotalData: res.data.obj,
            navRightData: res.data.obj[0].dictList,
            firstActive: res.data.obj[0].id
          });
        } else {
          console.log('获取数据失败')
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getSearchListData: function (obj, data, oldData) {
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var oldData = oldData || [];
    var requestUrl = host + '/goodscenter/auth/1.0/goods/base' + '?centerId=' + centerId + '&numPerPage=' + data.numPerPage + '&currentPage=' + data.currentPage;
    if (data.firstCategory) { requestUrl += '&firstCategory=' + data.firstCategory; }
    if (data.secondCategory) { requestUrl += '&secondCategory=' + data.secondCategory; }
    if (data.thirdCategory) { requestUrl += '&thirdCategory=' + data.thirdCategory; }
    if (data.upShelves) { requestUrl += '&upShelves=' + data.upShelves; }
    if (data.type) { requestUrl += '&type=' + data.type; }
    if (data.sortField && data.sortRule) { requestUrl += ('&sortList[0].sortField=' + data.sortField + '&sortList[0].sortRule=' + data.sortRule)};
    wx.request({
      url: requestUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data && res.data.obj) {
          var rSearchListData = res.data.obj.goodsList || [];
          var tagListArr = [];
          if (rSearchListData && rSearchListData.length > 0) {
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
          var searchListData = oldData.concat(rSearchListData);
          obj.setData({
            'searchListData.data': searchListData,
            'searchListData.totalPages': res.data.obj.pagination.totalPages
          });
        } else {
          console.log('获取数据失败');
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getGoodsDetailData: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    wx: wx.request({
      url: host + '/goodscenter/auth/1.0/' + centerId + '/goods?goodsId=' + data.goodsId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.obj) {
          var data = res.data.obj[0];
          var imgsArr = [];
          var tagListArr = [];
          for (var i = 0; i < data.goodsFileList.length; i++) {
            imgsArr.push({
              picPath: data.goodsFileList[i].path,
              href: ''
            });
          }
          if (data.goodsSpecsList && data.goodsSpecsList.length > 0) {
            for (var j = 0; j < data.goodsSpecsList.length; j++) {
              if (data.goodsSpecsList[j].tagList && data.goodsSpecsList[j].tagList.length > 0) {
                for (var k = 0; k < data.goodsSpecsList[j].tagList.length; k++) {
                  if (tagListArr.indexOf(data.goodsSpecsList[j].tagList[k].tagName) == -1) {
                    tagListArr.push(data.goodsSpecsList[j].tagList[k].tagName);
                  }
                }
              }
            }
            data.tagListArr = tagListArr;
          }
          obj.setData({
            'bannerData.imgs': imgsArr,
            'goodsDetailData': data
          });
          console.log(obj.data.goodsDetailData);
        } else {
          console.log('获取数据失败');
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getShoppingCartData: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId');
    var shopId = wx.getStorageSync('shopId') || centerId;
    var allCrossPrice = 0;
    var allNormalPrice = 0;
    wx.request({
      url: host + '/ordercenter/1.0/order/shoping-cart/' + shopId + '/' + userId + '?centerId=' + centerId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success && res.data.obj){
          var data = res.data.obj;
          var tagListStr = '';
          for(var i = 0;i<data.length;i++){
            if (data[i].goodsSpecs.tagList && data[i].goodsSpecs.tagList.length > 0) {
              for (var j = 0; j<data[i].goodsSpecs.tagList.length; j++) {
                tagListStr += (data[i].goodsSpecs.tagList[j] + '、');
              }
            }
            data[i].goodsSpecs.tagListStr = tagListStr;
            if(data[i].type == 0){
              allCrossPrice += data[i].goodsSpecs.priceList[0].price * data[i].quantity;
            } else if (data[i].type == 2) {
              allNormalPrice += data[i].goodsSpecs.priceList[0].price * data[i].quantity;
            }
            data[i].goodsSpecs.priceList[0].price = data[i].goodsSpecs.priceList[0].price.toFixed(2);
            data[i].status = 'selected';
            data[i].isTouchMove = false;
          }
          obj.setData({
            shopCartData: res.data.obj,
            selectedNum: data.length,
            allCrossPrice: allCrossPrice.toFixed(2),
            allNormalPrice: allNormalPrice.toFixed(2)
          });
          console.log(res.data.obj);
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  delShoppingCartData: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    var gradeId = that.globalData.gradeId || that.globalData.centerId;
    var shopCartId = data.ids.join(',');
    var allData = obj.data.shopCartData;
    wx.request({
      url: host + '/ordercenter/1.0/order/shoping-cart/' + gradeId + '/' + data.userId + '/' + shopCartId,
      method: 'DELETE',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          var indexs = []
          data.ids.forEach(function(v1,i1){
            allData.forEach(function(v2,i2){
              if (v1 == v2.id){
                indexs.push(i2);
              }
            })
          });
          var newIndexs = indexs.map(function (val, idx) { return val - idx; })
          newIndexs.forEach(function (index) {
            allData.splice(index, 1);
          })
          obj.setData({
            shopCartData: allData,
            selectedNum: 0
          });
          obj.getAllPrice(allData);
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  }
})
