var mods = [
  'element', 'sidebar', 'mockjs', 'select',
  'tabs', 'menu', 'route', 'utils', 'component', 'kit'
];

layui.define(mods, function(exports) {
  var element = layui.element,
    utils = layui.utils,
    $ = layui.jquery,
    _ = layui.lodash,
    route = layui.route,
    tabs = layui.tabs,
    layer = layui.layer,
    menu = layui.menu,
    component = layui.component,
    kit = layui.kit;


  var Admin = function() {
    this.config = {
      elem: '#app',
      loadType: 'SPA'
    };
    this.version = '1.0.0';
  };

  Admin.prototype.ready = function(callback) {
    var that = this,
      config = that.config;

    // 初始化加载方式
    var getItem = utils.localStorage.getItem;
    var setting = getItem("KITADMIN_SETTING_LOADTYPE");
    if (setting !== null && setting.loadType !== undefined) {
      config.loadType = setting.loadType;
    }

    kit.set({
      type: config.loadType
    }).init();

    // 初始化路由
    _private.routeInit(config);
    // 初始化选项卡
    if (config.loadType === 'TABS') {
      _private.tabsInit();
    }
    // 初始化左侧菜单   -- 请先初始化选项卡再初始化菜单
    _private.menuInit(config);
    // 跳转至首页
    if (location.hash === '') {
      utils.setUrlState('主页', '#/');
    }

    // 处理 sidebar
    layui.sidebar.render({
      elem: '#ccleft',
      //content:'', 
      title: '这是左侧打开的栗子',
      shade: true,
      // shadeClose:false,
      direction: 'left',
      dynamicRender: true,
      url: 'views/table/teble2.html',
      width: '50%', //可以设置百分比和px
    });

    $('#cc').on('click', function() {
      var that = this;
      layui.sidebar.render({
        elem: that,
        //content:'', 
        title: 'FromBox',
        shade: true,
        // shadeClose:false,
        // direction: 'left'
        dynamicRender: true,
        url: 'views/form/index.html',
        width: '50%', //可以设置百分比和px
      });
    });
    // 监听头部右侧 nav
    component.on('nav(header_right)', function(_that) {
      var target = _that.elem.attr('kit-target');
      if (target === 'setting') {
        // 绑定sidebar
        layui.sidebar.render({
          elem: _that.elem,
          //content:'', 
          title: '设置',
          shade: true,
          // shadeClose:false,
          // direction: 'left'
          dynamicRender: true,
          url: 'views/setting.html',
          // width: '50%', //可以设置百分比和px
        });
      }
      if (target === 'help') {
        layer.alert('帮助面板');
      }
    });

    // 注入mock
    layui.mockjs.inject(APIs);

    // 初始化渲染
    if (config.loadType === 'SPA') {
      route.render();
    }

    // 执行回调函数
    typeof callback === 'function' && callback();
  }

  var _private = {
    routeInit: function(config) {
      var that = this;
      // route.set({
      //   beforeRender: function (route) {
      //     if (!utils.oneOf(route.path, ['/user/table', '/user/table2', '/'])) {
      //       return {
      //         id: new Date().getTime(),
      //         name: 'Unauthorized',
      //         path: '/exception/403',
      //         component: 'views/exception/403.html'
      //       };
      //     }
      //     return route;
      //   }
      // });
      // 配置路由
      var routeOpts = {
        routes: [{
          path: '/',
          component: 'views/app.html',
          name: 'Home'
        },  {
          path: '/welcome',
          component: 'views/welcome.html',
          name: '欢迎使用'
        }, {
          path: '/member/all',
          component: 'views/member/all/index.html',
          name: '访问管理'
        }, {
          path: '/member/all/edit',
          component: 'views/member/all/edit.html',
          name: '编辑会员'
        },  {
          path: '/Document/basic',
          component: 'views/Document/index.html',
          name: '基础概况'
        }, {
          path: '/Document/range',
          component: 'views/Document/range.html',
          name: '远程管理'
        }, {
          path: '/Document/infromation',
          component: 'views/Document/infromation.html',
          name: '运行信息'
        },  {
          path: '/Calculation',
          component: 'views/Calculation/index.html',
          name: '超级计算机'
        },  {
          path: '#/Calculation/desktop',
          component: 'views/Calculation/desktop.html',
          name: '远程桌面'
        },  {
          path: '#/Calculation/project',
          component: 'views/Calculation/project.html',
          name: '远程桌面'
        },{
          path: '/Document/Data',
          component: 'views/data.html',
          name: '数据统计'
        },]
      };
      if (config.loadType === 'TABS') {
        routeOpts.onChanged = function() {
          // 如果当前hash不存在选项卡列表中
          if (!tabs.existsByPath(location.hash)) {
            // 新增一个选项卡
            that.addTab(location.hash, new Date().getTime());
          } else {
            // 切换到已存在的选项卡
            tabs.switchByPath(location.hash);
          }
        }
      }
      // 设置路由
      route.setRoutes(routeOpts);
      return this;
    },
    addTab: function(href, layid) {
      var r = route.getRoute(href);
      if (r) {
        tabs.add({
          id: layid,
          title: r.name,
          path: href,
          component: r.component,
          rendered: false,
          icon: '&#xe62e;'
        });
      }
    },
    menuInit: function(config) {
      var that = this;
      // 配置menu
      menu.set({
        dynamicRender: false,
        isJump: config.loadType === 'SPA',
        onClicked: function(obj) {
          if (config.loadType === 'TABS') {
            if (!obj.hasChild) {
              var data = obj.data;
              var href = data.href;
              var layid = data.layid;
              that.addTab(href, layid);
            }
          }
        },
        elem: '#menu-box',
        remote: {
          url: '/api/getmenus',
          method: 'post'
        },
        cached: false
      }).render();
      return that;
    },
    tabsInit: function() {
      tabs.set({
        onChanged: function(layid) {
          // var tab = tabs.get(layid);
          // if (tab !== null) {
          //   utils.setUrlState(tab.title, tab.path);
          // }
        }
      }).render(function(obj) {
        // 如果只有首页的选项卡
        if (obj.isIndex) {
          route.render('#/');
        }
      });
    }
  }

  var admin = new Admin();
  admin.ready(function() {
    console.log('Init successed.');
  });

  //输出admin接口
  exports('admin', {});
});