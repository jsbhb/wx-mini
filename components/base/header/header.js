const app = getApp();
Component({
  properties: {
    headerData: Object
  },
  data:{
    imgHost: app.globalData.imgHost,
    shopCartStatus: 'normal'
  },
  methods: {
    changeStatus: function(){
      var that = this;
      var shopCartStatus = that.data.shopCartStatus;
      var newStatus = 'normal';
      if (shopCartStatus == 'normal'){
        newStatus = 'delete';
      } else if (shopCartStatus == 'delete'){
        newStatus = 'normal';
      }
      that.triggerEvent('changeStatus', {
        shopCartStatus: newStatus
      }, {})
      that.setData({
        shopCartStatus: newStatus
      });
    }
  }
});