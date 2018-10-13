/***
 * header页面js
 * @type {{init: _this.init, cacheElements: _this.cacheElements, bindEvents: _this.bindEvents, initData: _this.initData}}
 * @private
 */
var _this = {
    init: function () {
        //缓存页面元素
        this.cacheElements();
        //绑定事件
        this.bindEvents();
        //初始化页面
        this.initData();
        this.checkLogin();
        $('.business').find('li:eq(5)').find('i').css('margin-left' ,'7px')
    },
    cacheElements: function () {
        $header = $('#header');
        $menu = $('#menu');
        $menuSelect = $('.menu_select');
        $fixedTop = $('.sideNavWrap');
        $docTop = $('#doc-top');
        $footer = $('#footer');
        //导航三级
        $threeMenu = $('.child_item');
    },
    bindEvents: function () {
        $header.on('click','.loginArea',this.goPersonal);
        //菜单导航点击事件
        $menu.on('click','.cur',this.menuClick);
        //导航菜单鼠标移入显示
        $docTop.on('mouseover','.menu_select',this.menuSelectMouseover);
        //导航菜单鼠标移出隐藏
        $docTop.on('mouseout','.menu_select',this.menuSelectMouseout);
        //预约进店
        $header.on('click','.header_l .tab_item:eq(1)',this.goBookStoreEvent);
        //退出登录
        $header.on('click','.loginSelect .outLogin',this.outLogin);
        $header.on('click','.loginSelect .goUrl',this.goLoginSelectUrl);
        //由悬浮框点击跳转页面事件
        $fixedTop.on('mouseover','.secondItem .fitem',this.clickFitemEvent);
        $fixedTop.on('mouseout','.secondItem .fitem',this.outFitemEvent);
        //由悬浮框返回顶部事件
        $fixedTop.on('click','.gotop',this.goTopEvent);
        //关注鼠标移入
        $header.on('mouseover','.tab_attention',this.attentionMouseoverEvent);
        $header.on('mouseout','.tab_attention',this.attentionMouseoutEvent);
        $header.on('mouseover','.attention',this.attentionMouseoverEvent);
        $header.on('mouseout','.attention',this.attentionMouseoutEvent);
        //底部私人定制
        $footer.on('click','.eros_btn input',this.footerErosBtnEvent);
        $docTop.on('click','.menu_select img',this.menuImgClick);
        //三级导航替换图片事件
        $threeMenu.on('mouseover','a',this.threeMenuMouseOverEvent);
        //首页搜索
        $header.on('click','.hr-search .sbtn',this.indexSearchEvent);
    },
    indexSearchEvent:function(){
        var val = $('#header').find('.hr-search input').val();
        if(val){
            window.open('https://www.gia.edu/CN/report-check?_=2&reportno='+val);
        }
    },
    footerErosBtnEvent:function(){
        window.location.href = '/zhubaosirendingzhi.html';
    },
    goBookStoreEvent:function(){
      window.location.href = '/brand/offlinesite.html';
    },
    attentionMouseoverEvent:function(){
        $('.attention').show();
    },
    attentionMouseoutEvent:function(){
        $('.attention').hide();
    },
    goTopEvent:function(){
        $("body,html").animate({"scrollTop":"0"})
    },
    levelClickEvent:function(){
        var text = $(this).attr('durl');
        var url = text+'.html';
        window.location.href = url;
    },
    tailorClickEvent:function(){
        var url = $(this).attr('durl');
        window.location.href = url;
    },
    clickFitemEvent:function(){
        $(this).removeClass('myafter');
        $(this).prev().removeClass('myafter');
    },
    outFitemEvent:function(){
        $(this).addClass('myafter');
        $(this).prev().addClass('myafter');
    },
    goLoginSelectUrl:function(e){
      var url = $(this).data('url');
      window.location.href = url+'.html';
      e.stopPropagation();
    },
    outLogin:function(){
      var token = window.localStorage.getItem('token');
        MY.ajax({
            type:"POST",
            url:"/user/loginOut",
            data:{token:token},
            hideWaitingUI:true
        }).done(function(data) {
            if (data.code == '000000') {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('userName');
                window.localStorage.removeItem('thatUrl');
                window.location.href = '/login.html';
            }
        })
    },
    loginSelectMouseover:function (){
        $header.find('.loginSelect').show();
    },
    loginSelectMouseout:function(){
        $header.find('.loginSelect').hide();
    },
    loginStatusMouseover:function (){
        var $has = $(this).find('.personal').length;
        if($has>0){
            $header.find('.loginSelect').show();
        }
    },
    loginStatusMouseout:function(){
        var $has = $(this).find('.personal').length;
        if($has>0){
            $header.find('.loginSelect').hide();
        }
    },
    menuSelectMouseover:function(){
        $(this).show();
    },
    menuSelectMouseout:function(){
        $(this).hide();
    },
    menuMouseover:function(){
        var id = $(this).data('id');
        $('#a'+id).show();
    },
    tailorMouseout:function(){
        $('#tailor').hide();
    },
    tailorMouseover:function(){
        $('#tailor').show();
    },
    menuMouseout:function(e){
        // var ulTop = parseFloat($('#menu ul').css('top'));
        // var ex = e.pageY;
        // if(ex<=ulTop){
            $('.menu_select').hide();
        //}
    },
    goPersonal:function(){
        var $has = $(this).find('.loginStatus').hasClass('personal');
        if(!($has)){
            window.location.href = '/login.html';
        }
    },
    getUserInfo:function(){
        var token = window.localStorage.getItem('token');
        $.ajax({
            type: 'GET',
            url: '/user/getCustomerInfo',
            data:{token:token},
            dataType : "json",
            success: function(data) {
                if (data.code == '000000') {
                    var nickName = data.data.customerName?data.data.customerName:data.data.phone;
                    window.localStorage.setItem('userName',nickName);
                    var $personalMenuUser = $('#personal_menu .menu_user');
                    $personalMenuUser.find('img').attr('src',data.data.photo?data.data.photo:'http://derier-img.oss-cn-beijing.aliyuncs.com/PC/personal/accountPreview/HeadLogo.png');
                    $personalMenuUser.find('p').text(nickName);
                }else{
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('userName');
                    window.localStorage.removeItem('userId');
                    window.localStorage.removeItem('iconUrl');
                }
            }
        });
    },
    checkLogin:function(){
        var token = window.localStorage.getItem('token');
        var userId = window.localStorage.getItem('userId');
        if(token||userId){
            _this.getUserInfo();
            var userName = window.localStorage.getItem('userName')?window.localStorage.getItem('userName'):'登录';
            $('#header').find('.hr-sec').find('.fleft:eq(0)').addClass('logEvent');
            $('#header').find('.head-right .log').find('span').text(userName);
            $('#header').find('.head-right .log').addClass('personal');
            $('#header').find('.head-right .log').attr('href','/user/accountPreview.html');
            $('#header').find('.head-right .logEvent').append(' <ul class="loginSelect"><li class="goShop goUrl" data-url="/shoppingCart/list">购物车</li><li class="goPersonal goUrl" data-url="/user/accountPreview">个人中心</li>' +
                '<li class="myOrder goUrl" data-url="/order/myOrder">我的订单</li>' +
                '<li class="outLogin">退出登录</li></ul>');
        }else{
            $('#header').find('.head-right .log').find('span').text('登录');
            $('#header').find('.head-right .log').attr('href','/login.html');
            $('#header').find('.head-right .log').removeClass('personal');
            $('#header').find('.head-right .logEvent').removeClass('logEvent');
        }
    },
    menuClick:function(){
         var url = $(this).find('a').attr('href');
        window.location.href = url;
    },
    initData:function(){//初始化导航
       //获取当前页面url并缓存到本地，用于登陆后跳转
        var getThatUrl = window.location.href;
        var pathName = window.location.pathname;
        if(pathName!='/login.html'){//登录页时不获取登录页url
            window.localStorage.setItem('thatUrl',getThatUrl);
        }
        //获取当前物理地址，放到页面左上角处
        //创建百度地图控件
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                //以指定的经度与纬度创建一个坐标点
                var pt = new BMap.Point(r.point.lng,r.point.lat);
                //创建一个地理位置解析器
                var geoc = new BMap.Geocoder();
                geoc.getLocation(pt, function(rs){//解析格式：城市，区县，街道
                    var addComp = rs.addressComponents;
                    $('#header').find('.areaInfo .loca').find('span').text(addComp.city);
                    $('#open').find('.presentCity').text(addComp.city);
                    $('.indexStoreContent').find('.cityText').text(addComp.city);
                });
            }
            else {
                $('#header').find('.areaInfo .loca').find('span').text('定位失败');
            }
        },{enableHighAccuracy: true})//指示浏览器获取高精度的位置，默认false
        //判断菜单url一级选中
        var pathName = window.location.pathname;
        //首页
        if(pathName == '/'){
            $("#menu_index").addClass('active');
        }
        //实体店
        else if(pathName=='/brand/offlinesite.html'){
            $("#menu_store").addClass('active');
        }
        //钻石定制
        else if(pathName=='/high_jewelry.html'){
            $("#menu_high_jewelry").addClass('active');
        }
        //品牌文化
        else if(pathName=='/culture.html'){
            $("#menu_culture").addClass('active');
        }
        //资讯中心
        else if(pathName == '/news.html'){
            $("#menu_news").addClass('active');
        }
    },
    threeMenuMouseOverEvent:function(){
        var pid = $(this).data('parent_id');
        var imgUrl = $(this).data('img_url')?$(this).data('img_url'):$('#open').find('#'+pid).find('.menu_advertising').data('img_url');
        var imgAlt = $(this).data('img_alt');
        var link = $(this).data('img_link');
        $('#open').find('#'+pid).find('.menu_advertising img').attr('src',imgUrl);
        $('#open').find('#'+pid).find('.menu_advertising img').attr('alt',imgAlt);
        $('#open').find('#'+pid).find('.menu_advertising a').attr('href',link);
        $('#openFixed').find('#'+pid).find('.menu_advertising img').attr('src',imgUrl);
        $('#openFixed').find('#'+pid).find('.menu_advertising img').attr('alt',imgAlt);
        $('#openFixed').find('#'+pid).find('.menu_advertising a').attr('href',link);
    }
};
//刷新商品列表数据，从url中获取后台需要的参数
function refreshGoodsList(url) {
    //获取url参数
    var ulist = url.substring(url.indexOf('/'),url.lastIndexOf('.html')).split('-');
    var reqUrl;
    var json;
    if(ulist.length==2){//导航1级列表跳转，不带条件参数，仅带一个参数
        var gurl = $('#'+ulist[1]).attr('data-gurl');
        reqUrl = gurl;
        json =pageParams();
    }else if(ulist.length>2){//导航1级列表跳转，带条件参数，多个参数
        var gurl = $('#'+ulist[5]).attr('data-gurl');
        json =pageParams();
        var text = gurl.split('/');
        var str = text.slice(0,5);
        reqUrl = str[1] + '-' +str[4] + '.html';
    }else if(ulist.length==1){//导航1级列表跳转，不带参
        var gurl = $('#menu').find('.shopItem[data-url="'+ulist[0]+'"]').attr('data-gurl');
        reqUrl = gurl;
        json =pageParams();
    }
    pageData(reqUrl,json);
};

function pageParams(){
    var $list = $('.search_conditions').find('.conditions_content');
    var $sort = $('.sequencing_type').find('.sort_red').data('stype'),
        $sortName = $('.sequencing_type').find('.sort_red').data('name');
    var sortName = $sortName?$sortName:'1',
        sort = $sort?$sort:'2';
    var json = {
        page: 1,
        limit: 16,
        sort: sortName,
        order:sort
    }
    $list.each(function(i,e){
        //判断是否为价格或重量条件，是的话有区间值:1.$hasPrice价格;2.$hasWeight重量
        var $hasPrice = $(e).hasClass('price-area');
        var $hasWeight = $(e).hasClass('weight-area');
        var $hasAll = $(e).find('.active').hasClass('all');
        var $paramsName = $(e).data('pname');
        if($hasPrice){
            var $start = $(e).find('.active').data('start');
            var $end = $(e).find('.active').data('end');
            var start = $hasAll?'':$start;
            var end = $hasAll?'':$end;
            var sname = $paramsName+'Start';
            var ename = $paramsName+'End';
            json[sname] = start;
            json[ename] = end;
        }else if($hasWeight){
            var $start = $(e).find('.active').data('start');
            var $end = $(e).find('.active').data('end');
            var $type = $(e).find('.active').data('type');
            var start = $hasAll?'':$start;
            var end = $hasAll?'':$end;
            var sname = $paramsName+'Start';
            var ename = $paramsName+'End';
            var tname = $paramsName+'Type';
            json[sname] = start;
            json[ename] = end;
            json[tname] = $type;
        }else{
            if(!($hasAll)){
                json[$paramsName] = _this.setParams($(e),$paramsName);
            }
        }
    });
    return json;
}

function pageData(url,params){
    var target = '';
    var tempform = document.createElement("form");
    tempform.action = url;
    tempform.method = "post";
    tempform.style.display="none"
    if(target) {
        tempform.target = target;
    }

    for (var x in params) {
        var opt = document.createElement("input");
        opt.name = x;
        opt.value = params[x];
        tempform.appendChild(opt);
    }

    var opt = document.createElement("input");
    opt.type = "submit";
    tempform.appendChild(opt);
    document.body.appendChild(tempform);
    tempform.submit();
    document.body.removeChild(tempform);
}
_this.init();