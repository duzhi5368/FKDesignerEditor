/**
 * Created by Frankie.W on 2017/1/5.
 */

//-------------------------------------------------------------------------
// 继承关键字
function FK_EXEND(subClass, baseClass){
    if(!s_Extensions[subClass])
        s_Extensions[subClass] = [];
    s_Extensions[subClass].push(baseClass);
}
//-------------------------------------------------------------------------
// 继承类列表
var s_Extensions = {};
//-------------------------------------------------------------------------
var CResourceLoader = {
    //-------------------------------------------------------------------------
    // 外部接口函数

    LoadRes:function (type, src) {
        CResourceLoader._LoadRes(type, src, FKFastMD5(src));
    },

    LoadEnd: function (LoadFinishCallback, LoadProcessCallback) {
        CResourceLoader._HandleExtensionJs();
        CResourceLoader._UpdateLoadingProcess(LoadFinishCallback, LoadProcessCallback);
    },
    //-------------------------------------------------------------------------
    m_arrSources: {},
    m_nSourceNum: 0,
    m_nLoadedNum: 0,
    m_bIsAllLoaded: true,

    // 加载资源函数
    _LoadRes:function (type, src, id) {
        CResourceLoader.m_nSourceNum++;
        CResourceLoader.m_bIsAllLoaded = false;

        if(type == 'img'){
            CResourceLoader._LoadImage(type, src, id);
        }
        else if(type == 'audio'){
            CResourceLoader._LoadAudio(type, src, id);
        }
        else if(type == 'js'){
            CResourceLoader._LoadJs(type, src, id);
        }
        else{
            console.log("CResourceLoader unsupport format: " + type);
        }
    },

    // 加载单一资源完成事件
    _AfterOneResourceLoad: function () {
        CResourceLoader.m_nLoadedNum++;
        if(CResourceLoader.m_nLoadedNum >= CResourceLoader.m_nSourceNum){
            CResourceLoader.m_bIsAllLoaded = true;
        }
    },

    // 加载图片文件
    _LoadImage: function (type, src, id) {
        if(CResourceLoader._IsResourceAlreadyLoaded[id]){
            CResourceLoader._AfterOneResourceLoad();
            return;
        }
        var tmpSource;
        tmpSource = new Image();
        tmpSource.type = 'img';
        tmpSource.src = src;
        tmpSource.onload = CResourceLoader._AfterOneResourceLoad;
        tmpSource.loaded = true;
        CResourceLoader.m_arrSources[id] = tmpSource;
    },

    // 加载音频文件
    _LoadAudio: function (type, src, id) {
        if(CResourceLoader._IsResourceAlreadyLoaded[id]){
            CResourceLoader._AfterOneResourceLoad();
            return;
        }
        var tmpSource;
        tmpSource = new Audio();
        tmpSource.type = 'audio';
        tmpSource.src = src;
        tmpSource.addEventListener('canplaythrough', CResourceLoader._AfterOneResourceLoad, false);
        tmpSource.loaded = true;
        CResourceLoader.m_arrSources[id] = tmpSource;
    },

    // 加载js脚本文件
    _LoadJs: function (type, src, id) {
        if(CResourceLoader._IsResourceAlreadyLoaded[id]){
            CResourceLoader._AfterOneResourceLoad();
            return;
        }

        // 检查该js文件是否被外部静态HTML加载过
        var scriptObjs = document.querySelectorAll('script');
        for(var i = 0; i < scriptObjs.length; i++){
            if(scriptObjs[i].src == src){
                // 确实被外部加载过
                var tmpSource = scriptObjs[i];
                tmpSource.src = src;
                tmpSource.loaded = true;
                CResourceLoader.m_arrSources[id] = tmpSource;
                CResourceLoader._AfterOneResourceLoad();
                return;
            }
        }

        // 这次要真正开始加载了
        var tmpSource = document.createElement('script');
        tmpSource.id = id;
        tmpSource.type = 'text/javascript';
        tmpSource.src = src;
        tmpSource.loaded = true;
        tmpSource.addEventListener('load', CResourceLoader._AfterOneResourceLoad);
        CResourceLoader.m_arrSources[id] = tmpSource;
        document.querySelector('head').appendChild(tmpSource);
    },

    // 加载资源进度更新函数
    _UpdateLoadingProcess: function (LoadFinishCallback, LoadProcessCallback) {
        if(CResourceLoader.m_bIsAllLoaded){
            // 全部加载完成
            if(LoadFinishCallback)
                LoadFinishCallback();
            // 系统级处理
            if(window['onLoaderDone']){
                window['onLoaderDone']();
            }
            console.log("Current load process 100 %");
        }
        else{
            // 当前进度值
            var process = 100 * CResourceLoader.m_nLoadedNum / CResourceLoader.m_nSourceNum;
            console.log("Current load process " + process + " %");
            if(LoadProcessCallback)
                LoadProcessCallback(process);
            // 定时显示进度
            window.setTimeout(function(){
                CResourceLoader._UpdateLoadingProcess(LoadFinishCallback, LoadProcessCallback);
            },100);
        }
    },

    // 一个资源ID是否已经加载过
    _IsResourceAlreadyLoaded: function(id){
        if(CResourceLoader.m_arrSources[id])
        {
            if(CResourceLoader.m_arrSources[id].loaded){
                return true;
            }
            return false;
        }
        return false;
    },
    
    // 处理继承类
    _HandleExtensionJs: function () {
        for(var subName in s_Extensions){
            CResourceLoader._ApplyExtensions(subName);
        }
    },

    // 继承类构造
    m_bIsSuperConstructorEnabled: true,
    _SuperConstructor : function () {
        if(!m_bIsSuperConstructorEnabled)
            return;
        m_bIsSuperConstructorEnabled = false;   // 上锁
        for (var i = 0; i < this.childConstructors.length; i++) {
            this.childConstructors[i].apply(this, arguments);
        }
        m_bIsSuperConstructorEnabled = true;
    },

    // 实现继承
    _ApplyExtensions: function(key){
        var sub = window[key];
        var list = s_Extensions[key];
        for(var i = 0; i < list.length; i++){
            var baseName = list[i];
            if(s_Extensions[baseName]){
                CResourceLoader._ApplyExtensions[key];
            }

            var base = window[baseName];
            if(base && sub){
                sub.prototype.super = CResourceLoader._SuperConstructor;
                sub.prototype.childConstructors = sub.prototype.childConstructors || [];
                for (var j = 0;
                     base.prototype.childConstructors && j < base.prototype.childConstructors.length;
                     j++) {
                    sub.prototype.childConstructors.push(base.prototype.childConstructors[j]);
                }
                sub.prototype.childConstructors.push(base);
                for (x in base.prototype) {
                    if (!sub.prototype[x]) {
                        sub.prototype[x] = base.prototype[x];
                    }
                }
            }
        }
    },
}