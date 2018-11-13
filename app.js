const watch = require("/utils/watch.js");
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
  setWatcher(page) {
    watch.setWatcher(page);
  },
  wxLogin: function(){
    var that = this;
    var platUserType = that.globalData.platUserType;
    var centerId = that.globalData.centerId;
    var host = that.globalData.host;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: host + '/3rdcenter/auth/1.0/user/3rdLogin/wxApplet?userType=' + platUserType + '&code=' + res.code + '&centerId=' + centerId,
            method: 'GET',
            data: {},
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res);
              if (res.data && res.data.success) {
                
              } else if (res.data && !res.data.success) {
                wx.showToast({
                  title: res.data.errorMsg,
                  icon: 'none',
                  duration: 1500
                })
              } else{
                wx.showToast({
                  title: '获取openId失败',
                  icon: 'none',
                  duration: 1500
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '请求失败，请检查网络是否畅通',
                icon: 'none',
                duration: 1500
              })
            },
            complete: function (res) { }
          })
        } else {
          wx.showToast({
            title: '获取用户登录态失败！' + res.errMsg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    });
  },
  userLogin: function (obj, data) {
    var that = this;
    var host = that.globalData.host; 
    var loginType = that.globalData.loginType;
    var platUserType = that.globalData.platUserType;
    that.wxLogin();
    // wx.request({
    //   url: host + '/authcenter/auth/login',
    //   method: 'POST',
    //   data: {
    //     platUserType: platUserType,
    //     loginType: loginType,
    //     phone: data.account,
    //     password: data.password
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     if (res.data && res.data.success) {
    //       wx.setStorageSync('authId', '"Bearer "' + res.data.obj.token);
    //       wx.setStorageSync('userId', res.data.obj.userCenterId);
    //       that.globalData.authentication = '"Bearer "' + res.data.obj.token;
    //       that.globalData.isLogin = true;
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     } else if (res.data && !res.data.success) {
    //       wx.showToast({
    //         title: res.data.errorMsg,
    //         icon: 'none',
    //         duration: 1500
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     wx.showToast({
    //       title: '请求失败，请检查网络是否畅通',
    //       icon: 'none',
    //       duration: 1500
    //     })
    //   },
    //   complete: function (res) { }
    // })
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
          if(data.status == 0){
            wx.showToast({
              title: '该手机号未注册',
              icon: 'none',
              duration: 1000
            })
            obj.setData({
              'account.status': 2
            });
          }
        } else {
          obj.setData({
            register: true
          });
          if (data.status == 1) {
            wx.showToast({
              title: '该手机号已注册',
              icon: 'none',
              duration: 1000
            })
            obj.setData({
              'account.status': 2
            });
          }
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
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
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
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
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
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
          wx.showToast({
            title: '获取数据失败',
            icon: 'none',
            duration: 1500
          })
        } else {
          for (var i = 0; i < data.length; i++) {
            if (data[i].code == "banner-1") {
              data[i].cont.forEach(function(v,k){
                if (v.href){
                  v.href = '/web/searchProduct/searchProduct?' + v.href.split('?')[1];
                }
              });
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
          goodsListData_1.forEach(function(v,i){
            if (v.own.href){
              v.own._href = v.own.href.split('?')[1];
            }
          });
          obj.setData({
            goodsListData_1: goodsListData_1,
            goodsListData_2: goodsListData_2,
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
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
          console.log('请求失败')
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
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
    if (data.goodsName) { requestUrl += '&goodsName=' + data.goodsName; }
    if (data.type) { requestUrl += '&type=' + data.type; }
    if (data.tag) { requestUrl += '&tag=' + data.tag; }
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
          console.log('请求失败');
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  getGoodsDetailData: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    wx.request({
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
          var priceArr = [];
          var commodityAttr = [];
          if (data && data.goodsFileList){
            for (var i = 0; i < data.goodsFileList.length; i++) {
              imgsArr.push({
                picPath: data.goodsFileList[i].path,
                href: ''
              });
            }
          }
          if (data.goodsSpecsList && data.goodsSpecsList.length > 0) {
            for (var j = 0; j < data.goodsSpecsList.length; j++) {
              var commodityAttrItem = {};
              commodityAttrItem.obj = data.goodsSpecsList[j];
              if (data.goodsSpecsList[j].tagList && data.goodsSpecsList[j].tagList.length > 0) {
                for (var k = 0; k < data.goodsSpecsList[j].tagList.length; k++) {
                  if (tagListArr.indexOf(data.goodsSpecsList[j].tagList[k].tagName) == -1) {
                    tagListArr.push(data.goodsSpecsList[j].tagList[k].tagName);
                  }
                }
              }
              if (data.goodsSpecsList[j].priceList && data.goodsSpecsList[j].priceList.length > 0){
                data.goodsSpecsList[j].priceList.forEach(function(v,i){
                  v.price = v.price.toFixed(2);
                });
              }
              priceArr.push(data.goodsSpecsList[j].priceList[0].price);
              priceArr.sort(function (a, b) {return a - b;});
              if (data.goodsSpecsList[j].info){
                var info = JSON.parse(data.goodsSpecsList[j].info);
                var infoArr = [];
                for (var key in info){
                  var d = {
                    attrKey: key,
                    attrValue: info[key]
                  };
                  infoArr.push(d);
                }
                commodityAttrItem.attrValueList = infoArr;
              }
              commodityAttr.push(commodityAttrItem);
            }
            data.tagListArr = tagListArr;
            if (priceArr.length > 1) {
              data.priceRegion = priceArr[0] + '~' + priceArr[priceArr.length - 1];
            }
          }
          obj.setData({
            'bannerData.imgs': imgsArr,
            'goodsDetailData': data,
            'commodityAttr': commodityAttr,
            'includeGroup': commodityAttr
          });
          obj.distachAttrValue(commodityAttr);
          if (obj.data.commodityAttr.length == 1) {
            if (obj.data.commodityAttr[0].attrValueList){
              for (var i = 0; i < obj.data.commodityAttr[0].attrValueList.length; i++) {
                obj.data.attrValueList[i].selectedValue = obj.data.commodityAttr[0].attrValueList[i].attrValue;
              }
              obj.setData({
                attrValueList: obj.data.attrValueList
              });
            }
          }
        } else {
          wx.showToast({
            title: '该商品已下架',
            icon: 'none',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          },1500);
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
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
    var allCrossCount = 0;
    var allNormalCount = 0;
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
          var infoStr = '';
          var statusNum = 0;
          for(var i = 0;i<data.length;i++){
            if (data[i].goodsSpecs.tagList && data[i].goodsSpecs.tagList.length > 0) {
              for (var j = 0; j<data[i].goodsSpecs.tagList.length; j++) {
                tagListStr += (data[i].goodsSpecs.tagList[j] + '、');
              }
            }
            if (data[i].goodsSpecs.info){
              var info = JSON.parse(data[i].goodsSpecs.info);
              for (var index in info){
                infoStr += (info[index] + '、');
              }
            }
            data[i].goodsSpecs.tagListStr = tagListStr;
            data[i].goodsSpecs.infoStr = infoStr;
            infoStr = '';
            if(data[i].type == 0){
              allCrossPrice += data[i].goodsSpecs.priceList[0].price * data[i].quantity;
              allCrossCount += data[i].quantity*1;
            } else if (data[i].type == 2) {
              allNormalPrice += data[i].goodsSpecs.priceList[0].price * data[i].quantity;
              allNormalCount += data[i].quantity*1;
            }
            data[i].goodsSpecs.priceList[0].price = data[i].goodsSpecs.priceList[0].price.toFixed(2);
            if (data[i].goodsSpecs.status == 1){
              data[i].status = 'selected';
              statusNum ++;
            } else if (data[i].goodsSpecs.status == 0){
              data[i].status = 'lose';
            }
            data[i].isTouchMove = false;
          }
          obj.setData({
            shopCartData: res.data.obj,
            selectedNum: statusNum,
            allCrossPrice: allCrossPrice.toFixed(2),
            allNormalPrice: allNormalPrice.toFixed(2),
            allCrossCount: allCrossCount,
            allNormalCount: allNormalCount
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  delShoppingCartData: function (obj, data) {
    var that = this;
    var host = that.globalData.host;
    var gradeId = that.globalData.gradeId;
    var shopCartId = data.ids.join(',');
    var allData = obj.data.shopCartData;
    var selectedNum = 0;
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
          for (var i = 0; i < allData.length; i++) {
            if (allData[i].status == 'selected') {
              selectedNum ++;
            }
          }
          obj.setData({
            shopCartData: allData,
            selectedNum: selectedNum
          });
          obj.getAllPrice(allData);
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  addShopCart: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var gradeId = that.globalData.gradeId;
    var centerId = that.globalData.centerId;
    wx.request({
      url: host + '/ordercenter/1.0/order/shoping-cart',
      method: 'POST',
      data: {
        centerId: centerId,
        goodsImg: data.goodsImg,
        goodsName: data.goodsName,
        gradeId: gradeId,
        itemId: data.itemId,
        quantity: data.quantity,
        supplierId: data.supplierId,
        supplierName: data.supplierName,
        type: data.type,
        userId: wx.getStorageSync('userId')
      },
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          wx.showToast({
            title: '加入购物车成功',
            icon: 'none',
            duration: 1000
          })  
        } else {
          wx.showToast({
            title: '加入购物车失败',
            icon: 'none',
            duration: 1000
          })  
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  getAddressData: function(obj, data){
    var that = this;
    var userId = wx.getStorageSync('userId');
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    wx.request({
      url: host + '/usercenter/1.0/user/address/' + userId + '?centerId=' + centerId + '&numPerPage=10&currentPage=1',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          obj.setData({
            addressListData: res.data.obj
          })
          res.data.obj.forEach(function(v,i){
            if(v.setDefault == 1){
              obj.setData({
                addressId: v.id
              });
            }
          });
        }else{
          console.log('获取收货地址列表失败');
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  createAddressMsg: function(obj, data){
    var that = this;
    var userId = wx.getStorageSync('userId');
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    wx.request({
      url: host + '/usercenter/1.0/user/address',
      method: 'POST',
      data: {
        userId: userId,
        city: data.city,
        area: data.area,
        centerId: centerId,
        address: data.address,
        province: data.province,
        setDefault: data.setDefault,
        receiveName: data.receiveName,
        receivePhone: data.receivePhone
      },
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          wx.navigateBack({
            delta: 1
          })
        }else{
          console.log('创建收货地址失败');
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  updateAddressMsg: function(obj, data){
    var that = this;
    var userId = wx.getStorageSync('userId');
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    wx.request({
      url: host + '/usercenter/1.0/user/address',
      method: 'PUT',
      data: {
        id: data.id,
        userId: userId,
        city: data.city,
        centerId: centerId,
        address: data.address,
        province: data.province,
        setDefault: data.setDefault,
        receiveName: data.receiveName,
        receivePhone: data.receivePhone
      },
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          that.getAddressData(obj,{});
        }else{
          console.log('设置默认地址失败');
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  deteleAddressMsg: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId');
    wx.request({
      url: host + '/usercenter/1.0/user/address/'+ userId +'/' + data.id,
      method: 'DELETE',
      data: {
        centerId: centerId
      },
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success) {
          that.getAddressData(obj, {});
        } else {
          console.log('删除收货地址失败');
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  getPostFee: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    data.forEach(function(v,i){
      v.centerId = centerId;
    })
    wx.request({
      url: host + '/ordercenter/1.0/order/postfee?data=' + encodeURI(JSON.stringify(data)),
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success){
          obj.setData({
            postFeeArr: res.data.obj
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    });
  },
  getUserDetail: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId') || '';
    wx.request({
      url: host + '/usercenter/1.0/user/' + centerId + '/' + userId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          var isNew = true;
          if (res.data.obj.userDetail){
            isNew = false;
          }
          obj.setData({
            infoData: res.data.obj,
            isNew: isNew
          });
        }else{
          console.log('获取个人信息失败');
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  createUserDetail: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId') || '';
    var d = data;
    d.centerId = centerId;
    d.userId = userId;
    wx.request({
      url: host + '/usercenter/1.0/user/userDetail',
      method: 'POST',
      data: d,
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  saveUserDetail: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId') || '';
    var d = data;
    d.centerId = centerId;
    d.userId = userId;
    wx.request({
      url: host + '/usercenter/1.0/user/userDetail',
      method: 'PUT',
      data: d,
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success) {
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  getValidation: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    wx.request({
      url: host + '/3rdcenter/auth/1.0/third-part/phone?phone=' + data.phone,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data && res.data.success){
          wx.showToast({
            title: '验证码发送成功',
            icon: 'none',
            duration: 1500
          })
        } else if (res.data && !res.data.success){
          wx.showToast({
            title: '验证码发送频繁，请稍后重试',
            icon: 'none',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '验证码发送失败，请稍后重试',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  userRegister: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var loginType = that.globalData.loginType;
    var platUserType = that.globalData.platUserType;
    var d = {
      phone: data.phone,
      centerId: centerId,
      pwd: data.password,
      userCenterId: centerId,
      loginType: loginType,
      userType: platUserType
    }
    if(data.shopId){
      d.shopId = data.shopId;
    }
    wx.request({
      url: host + '/usercenter/auth/1.0/user/register/' + data.invitationCode,
      method: 'POST',
      data: d,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data && res.data.success){
          var userCenterId = res.data.obj;
          wx.request({
            url: host + '/authcenter/auth/register',
            method: 'POST',
            data: {
              phone: data.phone,
              password: data.password,
              userCenterId: userCenterId,
              loginType: loginType,
              platUserType: platUserType,
              invitationCode: data.invitationCode
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if(res.data && res.data.success){
                wx.setStorageSync('authId', '"Bearer "' + res.data.obj.token);
                wx.setStorageSync('userId', res.data.obj.userCenterId);
                that.globalData.authentication = '"Bearer "' + res.data.obj.token;
                that.globalData.isLogin = true;
                wx.navigateBack({
                  delta: 2
                })
              } else if (res.data && !res.data.success) {
                wx.showToast({
                  title: res.data.errorMsg,
                  icon: 'none',
                  duration: 1500
                })
              } else {
                wx.showToast({
                  title: '帐号注册失败，请稍后重试',
                  icon: 'none',
                  duration: 1500
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '请求失败，请检查网络是否畅通',
                icon: 'none',
                duration: 1500
              })
            },
            complete: function (res) { }
          })
        } else if (res.data && !res.data.success){
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '帐号注册失败，请稍后重试',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  userPwdChange: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var platUserType = that.globalData.platUserType;
    wx.request({
      url: host + '/authcenter/auth/modifyPwd?code=' + data.code,
      method: 'POST',
      data: {
        userName: data.userName,
        password: data.password,
        platUserType: platUserType
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data && res.data.success){
          wx.showToast({
            title: '密码修改成功',
            icon: 'none',
            duration: 1500
          })
          wx.navigateBack({
            delta: 1
          })
        } else if (res.data && !res.data.success){
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '修改密码失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  getOrderListData: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId');
    var shopId = wx.getStorageSync('shopId') || centerId;
    var url = host + '/ordercenter/1.0/order?centerId=' + centerId + '&shopId=' + shopId + '&userId=' + userId + '&numPerPage=' + data.numPerPage + '&currentPage=' + data.currentPage;
    if (data.status != null && data.status != 'null'){
      if (data.status.toString().indexOf(',') != -1){
        url += '&statusArr=' + data.status;
      } else {
        url += '&status=' + data.status;
      }
    }
    if (data.orderId){
      url += '&orderId=' + data.orderId;
    }
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success) {
          var d = res.data.obj.orderList;
          var oldData = obj.data.orderListData || [];
          var waitToPayNum = 0;
          var waitSendNum = 0;
          var waitReceiveNum = 0;
          d.forEach(function (v1, i1) {
            v1.orderDetail.taxFee = (v1.orderDetail.taxFee).toFixed(2);
            v1.orderDetail.payment = (v1.orderDetail.payment).toFixed(2);
            v1.orderDetail.postFee = (v1.orderDetail.postFee).toFixed(2);
            v1.orderGoodsList.forEach(function (v2, i2) {
              v2.itemPrice = (v2.itemPrice).toFixed(2);
              if (v2.itemInfo){
                var infoStr = '';
                var itemInfo = JSON.parse(v2.itemInfo);
                for (let k in itemInfo){
                  infoStr += (itemInfo[k] + '、');
                }
                v2.infoStr = infoStr;
              }
            });
          });
          if(data.type == 'getNumber'){
            if(!data.status || data.status == null){
              d.forEach(function(v,i){
                if(v.status == 0){
                  waitToPayNum ++;
                }
                if (v.status == 1 || v.status == 2 || v.status == 3 || v.status == 4 || v.status == 5 || v.status == 11 || v.status == 12){
                  waitSendNum ++;
                }
                if(v.status == 6){
                  waitReceiveNum ++;
                }
              });
              obj.setData({
                waitToPayNum: waitToPayNum,
                waitSendNum: waitSendNum,
                waitReceiveNum: waitReceiveNum
              })
            }
            if (data.status == 0) {
              obj.setData({
                waitToPayNum: res.data.obj.pagination.totalRows
              })
            } else if (data.status == '1,2,3,4,5,11,12') {
              obj.setData({
                waitSendNum: res.data.obj.pagination.totalRows
              })
            } else if (data.status == 6) {
              obj.setData({
                waitReceiveNum: res.data.obj.pagination.totalRows
              })
            }
          }
          if(data.type == 'getData'){
            obj.setData({
              orderListData: oldData.concat(res.data.obj.orderList),
              totalPages: res.data.obj.pagination.totalPages
            });
          }
        } else if (res.data && !res.data.success) {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '修改密码失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  getLogisticsData: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var oldData = obj.data.logisticsData || [];
    wx.request({
      url: host + '/3rdcenter/1.0/express/getRoute?carrierName=' + data.expressName + '&expressId=' + data.expressId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if(res.data && res.data.success){
          res.data.obj.expressName = data.expressName;
          res.data.obj.Traces = res.data.obj.Traces.reverse();
          obj.setData({
            logisticsData: oldData.concat(res.data.obj)
          });
        }else if(res.data && !res.data.success){
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: '请求失败，请检查网络是否畅通',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  deleteOrder: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId');
    wx.request({
      url: host + '/ordercenter/1.0/order/' + userId + '/' + data.orderId,
      method: 'DELETE',
      data: {
        centerId: centerId
      },
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success) {
          obj.setData({
            status: obj.data.status
          });
          obj.getAllNum();
        } else {
          wx.showToast({
            title: '订单删除失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  closeOrder: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId');
    wx.request({
      url: host + '/ordercenter/1.0/order/close/' + userId + '/' + data.orderId,
      method: 'POST',
      data: {
        centerId: centerId
      },
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success) {
          obj.setData({
            status: obj.data.status
          });
          obj.getAllNum();
        } else {
          wx.showToast({
            title: '订单关闭失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  },
  sureOrder: function(obj, data){
    var that = this;
    var host = that.globalData.host;
    var centerId = that.globalData.centerId;
    var userId = wx.getStorageSync('userId');
    wx.request({
      url: host + '/ordercenter/1.0/order/confirm/' + userId + '/' + data.orderId,
      method: 'PUT',
      data: {
        centerId: centerId
      },
      header: {
        'content-type': 'application/json', // 默认值
        'authentication': that.globalData.authentication
      },
      success: function (res) {
        if (res.data && res.data.success) {
          obj.setData({
            status: 7
          });
          obj.getAllNum();
        } else {
          wx.showToast({
            title: '确认收货失败',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求失败，请检查网络是否畅通',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function (res) { }
    })
  }
})
