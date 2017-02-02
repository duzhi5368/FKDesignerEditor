/**
 * Created by Frankie.W on 2017/1/5.
 */

function DialogNode(name) {
    this.components = [];
    this.html = document.getElementsById('BuilderContent');
    this.dataKey = 'attributes';
    this.componentKey = 'components';

    // 基本配置
    this.data = [
        new StringValue('对话名', 'name', name).SetTooltip('This is the name of the Dialog. It should be unique to this config file and the category it is assigned to.'),
        new ListValue('对话版本', 'version', [ '1.0.1' ], '1.0.1').SetTooltip('This is the Dialog version. It is used by SRPG to quickly determine what version of the Web Editor was used to save the file.'),
        new ListValue('对话类别', 'category', s_CategoryList, '样例对话').SetTooltip('This is the category for this dialog.'),
        new ListValue('是否允许Esc关闭对话？', 'escDisabled', ['允许', '不允许' ], '不允许').SetTooltip('Controls if the player can cancel the dialog by pressing ESC.'),
        new ListValue('是否关闭Npc小头像？', 'hideNPC', ['关闭', '保留' ], '保留').SetTooltip('Controls if small model of the NPc the player is talking to is hidden for this dialog.'),
        new StringListValue('对话文字', 'text', []).SetTooltip('Sets the dialog text for this NPC. It supports color codes. Each new line in this field consists of a new line in the in-game dialog.'),
        new StringValue('背景音乐', 'sound', '无').SetTooltip('This is the sound that is played when the NPC says this dialog.'),
        new ListValue('是否显示对话滚动？', 'showWheel', ['显示', '隐藏' ], '显示').SetTooltip('Controls if the classic or wheel style dialog is displayed.')
    ];
}

DialogNode.prototype.apply = function () {
    var BuilderContent = document.getElementsById('BuilderContent');
    BuilderContent.innerHTML = '';
    // 构造BuilderContext显示
    for(var i = 0; i < this.components.length; i++){
        this.components[i].CreateBuilderHtml(BuilderContent);
    }
}

DialogNode.prototype.CreateFormHTML = function () {
    var form = document.createElement('form');
    var done = document.createElement('h5');
    done.className = 'doneButton';
    done.innerHTML = '返回主菜单';
    done.node = this;
    done.form = form;
    done.addEventListener('click', function (e) {
        this.node.update();
        var list = document.getElementsById('NodeList');
        list[list.selectedIndex].text = this.node.data[0].value;
        this.form.parentNode.removeChild(this.form);
        ShowNodePage('Builder');
    });
    form.appendChild(done);

    var header = document.createElement('h4');
    header.innerHTML = '对话设置';
    form.appendChild(header);

    var target = document.getElementsById('NodeForm');
    target.innerHTML = '';
    target.appendChild(form);

    var hr1 = document.createElement('hr');
    form.appendChild(hr1);

    for(var i = 0; i < this.data.length; i++){
        this.data[i].CreateHTML(form);
    }

    var hr2 = document.createElement('hr');
    form.appendChild(hr2);
}

DialogNode.prototype.update = function () {
    var index;
    var list = document.getElementsById('NodeList');
    for(var i = 0; i < )
        //TODO
}