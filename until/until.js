var ajaxFun = {
  getIndexData: function (that, requestUrl){
    wx.request({
      url: requestUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (response) {
        var data = response.data.module;
        var goodsListData_1 = [];
        var goodsListData_2 = [];
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
      success: function (response) {
        that.setData({
          navTotalData: response.data.obj,
          navRightData: response.data.obj[0].dictList,
          firstActive: response.data.obj[0].id
        });
      }
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
      success: function (response) {
        var rSearchListData = response.data.obj.goodsList || [];
        var searchListData = oldData.concat(rSearchListData);
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
        that.setData({
          'searchListData.data': searchListData
        });
      }
    })
  }
}

module.exports.ajaxFun = ajaxFun;