const app = getApp();
Component({
  properties: {
    footerData: Object
  },
  data: {
    imgHost: app.globalData.imgHost
  },
  methods: {
    toShoppingCart: function(e){
      var that = this;
      var url = e.currentTarget.dataset.url;
      var userId = wx.getStorageSync('userId');
      if (userId){
        wx.switchTab({
          url: url,
        })
      }else{
        wx.navigateTo({
          url: '/web/loginChoose/loginChoose',
        })
      }
    },
    locationTo: function(){
      var that = this;
      var reId = that.data.reId;
      var shopId = app.globalData.shopId;
      var shopStatus = that.data.shopStatus;
      if (shopStatus == 3){
        if (shopId == reId) {
          wx.navigateTo({
            url: '/web/shopSetting/shopSetting',
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您所在的微店为他人微店，是否切换到自己微店？',
            showCancel: true,
            success(res) {
              if (res.confirm) {
                wx.setStorageSync('shopId', reId);
                app.globalData.shopId = reId;
                wx.navigateTo({
                  url: '/web/shopSetting/shopSetting',
                })
              }
            }
          })
        }
      }else{
        wx.navigateTo({
          url: '/separate/joinUs/joinUs',
        })
      }
    }
  },
  attached: function(){
    var that = this;
    app.userDetailQuery(that, {});
  }
});