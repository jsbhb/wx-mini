const ajaxFun = require('../../../until/until.js').ajaxFun;
const app = getApp();
Component({
  properties: {
    searchListData: Object
  },
  data:{
    activeTab: 1,
    imgHost: app.globalData.imgHost
  },
  methods: {
    getSearchListData_com: function(){
      var that = this;
      ajaxFun.getSearchListData(that, [], that.data.searchListData.requestUrl_comprehensive); 
      that.setData({
        activeTab: 1
      });
    },
    getSearchListData_new: function(){
      var that = this;
      ajaxFun.getSearchListData(that, [], that.data.searchListData.requestUrl_new);
      that.setData({
        activeTab: 2
      });
    },
    getSearchListData_price: function(){
      var that = this;
      if (that.data.activeTab != 3 && that.data.activeTab != 4){
        ajaxFun.getSearchListData(that, [], that.data.searchListData.requestUrl_price_minus);
        that.setData({
          activeTab: 3
        });
      }
      if (that.data.activeTab == 3){
        ajaxFun.getSearchListData(that, [], that.data.searchListData.requestUrl_price_plus);
        that.setData({
          activeTab: 4
        });
      }else if(that.data.activeTab == 4){
        ajaxFun.getSearchListData(that, [], that.data.searchListData.requestUrl_price_minus);
        that.setData({
          activeTab: 3
        });
      }
    }
  }
});