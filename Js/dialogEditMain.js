/**
 * Created by Frankie.W on 2017/1/5.
 */
//-------------------------------------------------------------------------
DialogEditMain();
//-------------------------------------------------------------------------
var s_ActiveComponent = undefined;
var s_ActiveNode = new DialogNode("新对话");
//-------------------------------------------------------------------------
function DialogEditMain() {
    // 添加组件
    CResourceLoader.LoadRes('js','Js/configType.js');
    CResourceLoader.LoadRes('js','Js/componment.js');
    // 添加加载完成的回调通知
    CResourceLoader.LoadEnd(LoadComponmentDone, null);
    console.log("Load componment complate...")
}
//-------------------------------------------------------------------------
// 加载组件完成后
function LoadComponmentDone() {
    //CEditorCommon.SetupOptionList
}
//-------------------------------------------------------------------------
function SetupOptionList (div, list) {
    var x;
    // 遍历List列表
    for (x in list)
    {
        var e = document.createElement('h5');
        e.innerHTML = list[x].name;
        e.component = list[x];
        e.addEventListener('click', function(e) {
            if (s_ActiveComponent == s_ActiveNode && s_ActiveNode.usingTrigger(this.component.name))
            {
                // TODO showSkillPage('builder');
            }
            else
            {
                // TODO showSkillPage('skillForm');
                var component = new this.component.construct();
                component.parent = s_ActiveComponent;
                s_ActiveComponent.components.push(component);
                component.createBuilderHTML(s_ActiveComponent.html);
                component.createFormHTML();
            }
        });
        div.appendChild(e);
    }
}