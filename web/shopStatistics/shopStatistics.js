import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
var initChart = null;
Page({
  data: {
    ec: {
      onInit: function (canvas, width, height) {
        initChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(initChart);
        return initChart;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(function(){
      initChart.setOption({
        title: {
          text: '本周销售量统计',
          left: 'left',
          textStyle: {
            fontSize: 16
          },
          padding: [0, 0, 0, 30]
        },
        color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
        grid: {
          containLabel: true,
          top: '18%',
          bottom: '0',
          left: '5%',
          right: '6%'
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          // show: false
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
          // show: false
        },
        series: [{
          name: 'A',
          type: 'line',
          smooth: true,
          data: [18, 36, 65, 30, 78, 40, 33]
        }, {
          name: 'B',
          type: 'line',
          smooth: true,
          data: [12, 50, 51, 35, 70, 30, 20]
        }, {
          name: 'C',
          type: 'line',
          smooth: true,
          data: [10, 30, 31, 50, 40, 20, 10]
        }]
      })
    },200)
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

  }
});