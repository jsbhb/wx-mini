const app = getApp();
Component({
  properties: {
    searchListData: Object
  },
  data:{
    activeTab: 1,
    toHeight: '',
    imgHost: app.globalData.imgHost,
    isEnd: false
  },
  methods: {
    getSearchListData_com: function(){
      var that = this;
      var requestData = that.data.searchListData.requestData;
      delete requestData.sortField;
      delete requestData.sortRule;
      requestData.currentPage = 1;
      app.getSearchListData(that, requestData);
      that.setData({
        activeTab: 1,
        toHeight: 0
      });
      
    },
    getSearchListData_new: function(){
      var that = this;
      var requestData = that.data.searchListData.requestData;
      requestData.sortField = 'create_time';
      requestData.sortRule = 'desc';
      requestData.currentPage = 1;
      app.getSearchListData(that, requestData);
      that.setData({
        activeTab: 2,
        toHeight: 0
      });
    },
    getSearchListData_price: function(){
      var that = this;
      var requestData = that.data.searchListData.requestData;
      requestData.sortField = 'price';
      requestData.currentPage = 1;
      if (that.data.activeTab != 3 && that.data.activeTab != 4){
        requestData.sortRule = 'desc';
        that.setData({
          activeTab: 3,
          toHeight: 0
        });
      }
      if (that.data.activeTab == 3){
        requestData.sortRule = 'asc';
        that.setData({
          activeTab: 4,
          toHeight: 0
        });
      }else if(that.data.activeTab == 4){
        requestData.sortRule = 'desc';
        that.setData({
          activeTab: 3,
          toHeight: 0
        });
      }
      app.getSearchListData(that, requestData);
    },
    getMoreData: function(){
      var that = this;
      var oldRenderData = that.data.searchListData.data;
      var requestData = that.data.searchListData.requestData;
      var totalPages = that.data.searchListData.totalPages;
      if (requestData.currentPage < totalPages){
        requestData.currentPage++; 
        app.getSearchListData(that, requestData, oldRenderData);
      }else{
        that.setData({
          isEnd: true
        })
      }
    },
    addShopCart: function(e){
      var that = this;
      var allData = that.data.searchListData.data;
      var goodsId = e.currentTarget.dataset.goodid;
      var chooseItem = {};
      var data = {};
      allData.forEach(function(v1,i1){
        if (v1.goodsId == goodsId){
          chooseItem = v1;
        }
      });
      if (chooseItem.goodsSpecsList.length == 1){
        data.goodsImg = chooseItem.goodsFileList[0].path;
        data.goodsName = chooseItem.customGoodsName;
        data.itemId = chooseItem.goodsSpecsList[0].priceList[0].itemId;
        data.quantity = chooseItem.goodsSpecsList[0].priceList[0].min || 1;
        data.supplierId = chooseItem.supplierId;
        data.supplierName = chooseItem.supplierName;
        data.type = chooseItem.type;
        app.addShopCart(that, data);
      } else if (chooseItem.goodsSpecsList.length > 1){
        console.log('多规格商品，正在跳往商品详情页');
        wx.navigateTo({
          url: '/web/goodsDetail/goodsDetail?goodsId=' + goodsId,
        })
      }
    }
  }
});