const app= getApp();
Component({
  properties: {
    goodsListData_1: Object
  },
  data: {
    imgHost: app.globalData.imgHost
  },
  methods: {
    statistics: function (e) {
      var data = {
        type: '小程序楼层-' + e.currentTarget.dataset.title,
        userId: wx.getStorageSync('userId') || 0,
        shopId: wx.getStorageSync('shopId') || 2,
        goodsId: e.currentTarget.dataset.goodsid,
        logsName: 'statistics'
      }
      app.setStatistics(data);
    }
  }
});