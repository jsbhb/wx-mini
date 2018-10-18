var ajaxFun = {
  getIndexData: function (that, requestUrl){
    wx.request({
      url: requestUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var data = res.data.module || [];
        var goodsListData_1 = [];
        var goodsListData_2 = [];
        if (data == []){
          console.log('获取数据失败');
        }else{
          for (var i = 0; i < data.length; i++) {
            if (data[i].code == "banner-1") {
              that.setData({
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
          that.setData({
            goodsListData_1: goodsListData_1,
            goodsListData_2: goodsListData_2,
          });
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getNavData: function (that, requestUrl){
    wx.request({
      url: requestUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.obj){
          that.setData({
            navTotalData: res.data.obj,
            navRightData: res.data.obj[0].dictList,
            firstActive: res.data.obj[0].id
          });
        }else{
          console.log('获取数据失败')
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getSearchListData: function (that, oldData, requestUrl){
    wx.request({
      url: requestUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.obj){
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
          that.setData({
            'searchListData.data': searchListData
          });
        }else{
          console.log('获取数据失败');
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getGoodsDetailData: function (that, requestUrl){
    wx:wx.request({
      url: requestUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data.obj){
          var data = res.data.obj[0];
          var imgsArr = [];
          var tagListArr = [];
          for (var i = 0; i < data.goodsFileList.length; i++){
            imgsArr.push({
              picPath : data.goodsFileList[i].path,
              href : ''
            });
          }
          if (data.goodsSpecsList && data.goodsSpecsList.length > 0){
            for (var j = 0; j < data.goodsSpecsList.length; j++) {
              if (data.goodsSpecsList[j].tagList && data.goodsSpecsList[j].tagList.length > 0){
                for (var k = 0; k < data.goodsSpecsList[j].tagList.length; k++){
                  if (tagListArr.indexOf(data.goodsSpecsList[j].tagList[k].tagName) == -1) {
                    tagListArr.push(data.goodsSpecsList[j].tagList[k].tagName);
                  }
                }
              }
            }
            data.tagListArr = tagListArr;
          }
          that.setData({
            'bannerData.imgs': imgsArr,
            'goodsDetailData': data
          });
          console.log(that.data.goodsDetailData);
        }else{
          console.log('获取数据失败');
        }
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  }
}

module.exports.ajaxFun = ajaxFun;