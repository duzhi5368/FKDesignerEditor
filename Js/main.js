/**
 * Created by Frankie.W on 2016/12/30.
 */
//-------------------------------------------------------------------------
// Step 1:
LoadResource();
//-------------------------------------------------------------------------
function LoadResource() {
    console.log("Begin to load resource...")
    // 加载常用函数
    CResourceLoader.LoadRes('js','Js/utility.js');
    // 加载声音脚本
    CResourceLoader.LoadRes('js','Js/soundsData.js');
    CResourceLoader.LoadRes('js','Js/sounds.js');
    // 加载选项对象列表脚本
    CResourceLoader.LoadRes('js','Js/valueFilter.js');
    CResourceLoader.LoadRes('js','Js/baseValue.js');
    CResourceLoader.LoadRes('js','Js/indexListValue.js');
    CResourceLoader.LoadRes('js','Js/listValue.js');
    CResourceLoader.LoadRes('js',"Js/attributeValue.js");
    CResourceLoader.LoadRes('js','Js/doubleValue.js');
    CResourceLoader.LoadRes('js','Js/intValue.js');
    CResourceLoader.LoadRes('js','Js/stringValue.js');
    CResourceLoader.LoadRes('js','Js/stringListValue.js');
    CResourceLoader.LoadRes('js','Js/byteListValue.js');
    // 加载Edit类型表
    CResourceLoader.LoadRes('js','Js/editList.js');
    // 加载Yaml解析
    CResourceLoader.LoadRes('js','Js/yaml.js');
    console.log("Load script complate...")

    // 添加加载完成的回调通知
    CResourceLoader.LoadEnd(LoadCommonScriptDone, UpdateLoaderProcess);
    console.log("Load resource complate...")
}
//-------------------------------------------------------------------------
// 资源加载更新显示
function UpdateLoaderProcess(value) {
    $('[id=LoadedBlock]').css('width',(Math.round(value)+"%"));
}
// 资源加载完毕通知
function LoadCommonScriptDone() {
    $('[id=LoadedBlock]').css('width',"100%");
    // 进入下一步
    InitEditListMenu();
}
//-------------------------------------------------------------------------
// Step 2:
function InitEditListMenu() {
    console.log("Begin to init...")

    // 检查是否是不支持的
    if(FKUtility.IsSupportWebbrowser())
    {
        console.log("Unsupport webbrowser type...");
        return;
    }
    // 闲置一秒
    FKUtility.Sleep(1000);
    // 更新面板显示
    ShowEditorSelectDiv();
    // 创建面板
    for (var editID = 1; editID <= editList.length; editID++){
        $('[id=editItemContainer]').append("<div id='editItem'>" +
            "<input type='radio' value='"+editID+"' name='editIDSelect'>"+
            (editList[editID-1].label?(editList[editID-1].label):("编辑器 "+editID))
            +"</input>" + "</div>");
    }
    $('input[name="editIDSelect"]').click(function(){
        OpenEditor(parseInt(this.value));
    });
}
//-------------------------------------------------------------------------
// 仅显示编辑器选择界面
function ShowEditorSelectDiv() {
    document.getElementById('editSelectionBG').style.display = 'block';
    document.getElementById('LoadingBG').style.display = 'none';
}
// 仅显示Loading界面
function ShowLoadingDiv() {
    document.getElementById('LoadingBG').style.display = 'block';
    document.getElementById('editSelectionBG').style.display = 'none';
}
//-------------------------------------------------------------------------
// 打开编辑器
function OpenEditor(index) {
    console.log("User choose edit, ID = " + index);
    for (var editID = 1; editID <= editList.length; editID++){
        if((editList[editID-1].id == index)
            && (editList[editID-1].script != undefined)
            && (editList[editID-1].script != null))
        {
            UpdateLoaderProcess(0);
            ShowLoadingDiv();

            CResourceLoader.LoadRes('js',editList[editID-1].script);
        }
    }
}