//对比分析js

//公共对象
const PubObj = {
  pubInfo: null,
  map: null,
  nowview: null,
};

var chartColor = [
  '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
  '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
  '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
  '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
];

//初始化参数
export function InitAnalysis(mapobj) {
  PubObj.pubInfo = mapobj.pubInfo;
  PubObj.nowview = mapobj.nowview;
  PubObj.map = mapobj.map;
}

//分析-获取输入要素数据
export async function StartAnalysis(obj) {
  var _this = PubObj.nowview;
  _this.AnalysisObj.fxdialogVisible = true; //显示分析进度
  var Request = PubObj.map.Request;
  var url = "http://192.168.202.26:6080/portal/sharing/rest/content/features/generate?token=" + PubObj.pubInfo.mapToken;
  var publishParameters = {
    name: "test",
    targetSR: {
      wkid: 102100
    },
    maxRecordCount: 4000,
    enforceInputFileSizeLimit: true,
    enforceOutputJsonSizeLimit: true,
    locationType: "none",
    generalize: true,
    maxAllowableOffset: 10.583354500041297,
    reducePrecision: true,
    numberOfDigitsAfterDecimal: 0
  };

  //封装参数
  var formData = new FormData();
  formData.append("file", obj.nowfile);
  formData.append("option", "on");
  formData.append("filetype", "shapefile");
  formData.append("publishParameters", JSON.stringify(publishParameters));
  formData.append("f", "json");

  //根据提交shp zip包返回图层数据
  var response = await Request(url, {
    method: "post",
    body: formData
  });
  obj.fxObj.AnalysisObj.ProgressValue += 1
  var inputLayer = JSON.stringify(response.data.featureCollection.layers[0]);
  CreateMapServer(obj, inputLayer);
}

//创建地图服务
async function CreateMapServer(obj, inputLayer) {
  var _this = PubObj.nowview;
  var Request = PubObj.map.Request;
  var url = PubObj.pubInfo.ArcgisPortal + "sharing/rest/content/users/" + PubObj.pubInfo.ArcgisUser + "/createService"
  var OverlayLayersFeatureName = obj.fxObj.label + '_OverlayLayersFeature' + Math.round(Math.random() * 999999); //图层名称
  //请求创建地图服务
  var response = await Request(url, {
    method: "post",
    query: {
      createParameters: '{ "currentVersion":10.2, "serviceDescription":"", "hasVersionedData":false, "supportsDisconnectedEditing":false, "hasStaticData":true, "maxRecordCount":2000, "supportedQueryFormats":"JSON", "capabilities":"Query", "description":"", "copyrightText":"", "allowGeometryUpdates":false, "syncEnabled":false, "editorTrackingInfo": { "enableEditorTracking":false, "enableOwnershipAccessControl":false, "allowOthersToUpdate":true, "allowOthersToDelete":true}, "xssPreventionInfo": { "xssPreventionEnabled":true, "xssPreventionRule":"InputOnly", "xssInputRule":"rejectInvalid"}, "tables": [], "name":' +
        '"' + OverlayLayersFeatureName + '"' +
        ', "options": { "dataSourceType":"spatiotemporal"}}',
      outputType: "featureService",
      f: "json",
      token: PubObj.pubInfo.mapToken,
      responseType: "json"
    }
  });
  obj.fxObj.AnalysisObj.ProgressValue += 1; //进度值
  var ServerId = response.data.itemId;
  if (_this.AnalysisObj.ServerIds.indexOf(ServerId) === -1) {
    _this.AnalysisObj.ServerIds.push(ServerId);
  }
  submitData(obj, inputLayer, OverlayLayersFeatureName, ServerId);
}

//提交数据开始分析
async function submitData(obj, inputLayer, OverlayLayersFeatureName, ServerId) {
  try {
    var _this = PubObj.nowview;
    let data = {
      inputLayer: inputLayer,
      overlayLayer: '{"url":' + '"' + obj.fxObj.mapUrl + '"' + ',"name":"' + OverlayLayersFeatureName +
        '"}',
      overlayType: 'intersect',
      OutputName: '{"serviceProperties":{"name":"' + OverlayLayersFeatureName +
        '","serviceUrl":"http://192.168.202.26:6080/arcgis/rest/services/Hosted/' +
        OverlayLayersFeatureName + '/FeatureServer"}}',
      context: '{"extent":{"xmin":11260863.956113165,"ymin":2783709.898374284,"xmax":11712453.919221768,"ymax":3036869.3360546655,"spatialReference":{"wkid":102100,"latestWkid":3857}}}',
      token: PubObj.pubInfo.mapToken,
    };
    var GeoprocessorUrl = PubObj.pubInfo.ArcgisServer +
      "rest/services/System/GeoAnalyticsTools/GPServer/OverlayLayers";
    var submitJobUrl = new PubObj.map.Geoprocessor(GeoprocessorUrl);
    _this.submitJobUrl = submitJobUrl;
    submitJobUrl.submitJob(data).then(
      function (jobinfo) {
        SetMapLayer(jobinfo, obj); //加载图层
      },
      function (jobinfo) {
        var jobinfoId = jobinfo.jobId;
      },
      function (jobinfo) {
        var _this = PubObj.nowview;
        if (_this.AnalysisObj.jobinfoIds.indexOf(jobinfo.jobId) === -1) {
          _this.AnalysisObj.jobinfoIds.push(jobinfo.jobId);
        }
        if (_this.AnalysisObj.fxdialogVisible === false) {
          _this.AnalysisObj.jobinfoIds.forEach(jobid => {
            _this.submitJobUrl.cancelJob(jobid);
          });
        }
        if (obj.fxObj.AnalysisObj.ProgressValue < 96) {
          obj.fxObj.AnalysisObj.ProgressValue += 1
        }
      });
  } catch (e) {
    console.log(e)
  }
}

//分析完成
async function SetMapLayer(jobinfo, obj) {
  var _this = PubObj.nowview;
  if (jobinfo.jobStatus === 'job-succeeded') {
    var jobinfoMes = jobinfo.messages
    var x = jobinfoMes[0].description
    var str1 = x.indexOf("{");
    var str2 = x.indexOf("}}");
    var yy = x.substring(str1, str2 + 2)
    var serviceUrl = JSON.parse(yy).serviceProperties.serviceUrl; //地图服务地址
    obj.fxObj.resultServerUrl = serviceUrl; //创建的分析地图服务地址
    const mapColors = await SetQuery(serviceUrl, obj); // await new Promise(reslove => SetQuery(serviceUrl, obj)); //图层数据查询

    var mapObj = PubObj.map; //地图对象
    var Layer1 = new mapObj.FeatureLayer({
      url: serviceUrl,
      minScale: 300000000000,
      maxScale: 100,
      renderer: {
        type: "unique-value",
        field: obj.fxObj.col.DLMC,
        uniqueValueInfos: mapColors ? mapColors : []
      },
    });
    mapObj.topLayer = Layer1;
    mapObj.NowMap.add(Layer1);
    Layer1.when(function () {
      mapObj.NowMapView.extent = Layer1.fullExtent;
    });

    obj.fxObj.AnalysisObj.ProgressValue = 100; //改变进度值
    _this.AnalysisObj.AllProgressValue = _this.AnalysisObj.AllProgressValue + obj.fxObj.AnalysisObj.ProgressValue; //改变进度总值
    if (_this.AnalysisObj.AllProgressValue >= (100 * _this.AnalysisObj.Tabs.length)) {
      setTimeout(function () {
        _this.AnalysisObj.fxdialogVisible = false;
        _this.nowfile = null;
        _this.fileList = [];
        _this.AnalysisObj.Tabs.forEach(tab => {
          if (tab.AnalysisObj) {
            tab.AnalysisObj.ProgressValue = 0;
          }
        })
        _this.AnalysisObj.AllProgressValue = 0;
      }, 3000);
      _this.rightWrapperShow = true; //显示或隐藏结果弹出框
    }
  }
  if (jobinfo.jobStatus === 'job-failed') {
    _this.$alert('分析失败，分析过程中发生错误！', '提示', {
      confirmButtonText: '确定',
      type: "error"
    });
    if (ServerId != "") {
      var Request = PubObj.map.Request;
      var deleteUrl = PubObj.pubInfo.ArcgisPortal + "sharing/rest/content/users/jsmith/items/" + ServerId +
        "/delete";
      var earthquakes = new Request(deleteUrl); //删除服务请求
    }
  }
}

//渲染地图
async function SetQuery(url, obj) {
  var _this = PubObj.nowview;
  var mapObj = PubObj.map;
  var qTask = new mapObj.QueryTask({
    url: url + "/0"
  });
  var params = new mapObj.Query({
    returnGeometry: true,
    outFields: ["*"],
    where: "1 > 0"
  });
  var list = [];
  var res = await qTask.execute(params);
  //封装表格数据
  obj.fxObj.tableData.data = []; //表数据
  obj.fxObj.tableData.cols = []; //列集合
  var colslables = {
    DLMC: "地类名称",
    TBDLMJ: "面积"
  };
  //生成列集合
  res.fields.forEach(col => {
    if (col.name === obj.fxObj.col.DLMC || col.name === obj.fxObj.col.MJ) {
      var nowcol = {
        name: col.name,
        label: colslables[col.name]
      }
      obj.fxObj.tableData.cols.push(nowcol);
    }
  });
  //生成数据
  res.features.forEach(row => {
    var nowObj = row.attributes;
    nowObj["geometry"] = row.geometry;
    obj.fxObj.tableData.data.push(nowObj);
  });

  var chartData = await groupByOfList(obj.fxObj.tableData.data, obj.fxObj.tableData.cols[0].name, obj.fxObj.tableData
    .cols[
      1].name); //封装统计图数据
  var mapColors = await Setchart(chartData, obj); //生成统计饼图

  return mapColors;
}

//数组分组统计-数据，分组字段，统计值字段
function groupByOfList(listData, colname, countCol) {
  var result = []; // 存最终数据结果
  // 数据按照名称进行归类
  var nameContainer = {}; // 针对键name进行归类的容器
  listData.forEach(item => {
    nameContainer[item[colname]] = nameContainer[item[colname]] || [];
    nameContainer[item[colname]].push(item);
  });
  // console.log(nameContainer); // 按照名称归类完成：{ apple: Array(2), banana: Array(2) }
  // 统计不同种类的数量
  var fruitName = Object.keys(nameContainer); // 获取种类：["apple", "banana"]
  fruitName.forEach(nameItem => {
    let count = 0;
    nameContainer[nameItem].forEach(item => {
      count += item[countCol]; // 遍历每种中包含的条目计算总数
    });
    result.push({
      'name': nameItem,
      'mj': count
    });
  });
  return result;
}

//统计饼图
function Setchart(data, obj) {
  try {
    var _this = PubObj.nowview;
    var seriesData = [];
    var legends = [];
    var mapColors = [];

    if (obj.fxObj.myechart != null) {
      obj.fxObj.myechart.clear(); // 图表清空-------------------
      obj.fxObj.myechart.dispose(); // 图表释放-------------------
    };
    var chartdiv = document.getElementById(obj.fxObj.DrawChartId); // 图表实例化------------------
    var grid_y = data.length / 5 * 30 + 100;
    chartdiv.style.height = 280 + grid_y + "px";
    obj.fxObj.myechart = _this.$echarts.init(chartdiv);
    // 过渡---------------------
    obj.fxObj.myechart.showLoading({
      text: '正在努力的读取数据中...', //loading话术
    });


    data.forEach(function (item, index) {
      legends.push(item.name);
      var color = {
        value: item.name,
        symbol: {
          type: "simple-fill",
          color: chartColor[index]
        }
      };
      mapColors.push(color);
      var mj = item.mj.toFixed(2);
      var row = {
        value: mj,
        name: item.name
      }
      seriesData.push(row);
    });

    // 图表使用-------------------
    var option = {
      color: chartColor,
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        padding: [15, 5, 15, 5],
        data: legends
      },
      calculable: true,
      series: [{
        name: '地类面积(占比)',
        type: 'pie',
        radius: '40%',
        center: ['50%', '60%'],
        data: seriesData
      }]
    };
    obj.fxObj.myechart.setOption(option);
    obj.fxObj.myechart.hideLoading();
    obj["mapColors "] = mapColors;
  } catch (e) {
    console.log(e)
  }
  return mapColors;
}

export default {
  InitAnalysis,
  StartAnalysis,
}
