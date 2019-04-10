// web/myStore/myStore.js
const app = getApp(); 
const FileSystemManager = wx.getFileSystemManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanImg: 'https://test2.cncoopay.com/images/platform/qr_mini_shop.png'
  },
  save: function(){
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.saveImg(that.data.scanImg);
            },
            fail() {
              wx.showToast({
                title: '获取用户授权失败，请重新授权',
                icon: 'none',
                duration: 1500
              })
            }
          })
        } else {
          that.saveImg(that.data.prurl);
        }
      }
    })
  },
  saveImg: function (url) {
    var that = this;
    FileSystemManager.writeFile({
      filePath: `${wx.env.USER_DATA_PATH}/qrcode_myStore.png`,
      data: url,
      encoding: 'binary',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: `${wx.env.USER_DATA_PATH}/qrcode_myStore.png`,
          success(res) {
            wx.showToast({
              title: '保存图片成功，请到相册查看分享',
              icon: 'none',
              duration: 1500
            })
          },
          fail(res) {
            wx.showToast({
              title: '保存图片失败',
              icon: 'none',
              duration: 1500
            })
          }
        })
      },
      fail: res => {
        wx.showToast({
          title: '保存图片失败',
          icon: 'none',
          duration: 1500
        })
        that.setData({
          hidden: true,
          alertShare: false
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    var shopId = app.globalData.shopId || 2;
    var imageUrl = that.data.scanImg;
    return {
      title: '微店推广',
      path: 'web/myStore/myStore?scene=shopId%3D' + shopId,
      imageUrl: imageUrl
    }
  }
})