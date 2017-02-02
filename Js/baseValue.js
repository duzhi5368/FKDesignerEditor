/**
 * Created by Frankie.W on 2016/12/31.
 */

function RequireValue(key, values){
    this.requirements = this.requirements || [];
    this.requirements.push({key: key, values: values});
    return this;
}

// 将可选值应用到控件中
function ApplyRequireValues() {
    for(var i = 0; this.requirements && i < this.requirements.length; i++){
        var key = this.requirements[i].key;
        var values = this.requirements[i].values;

        var element = document.getElementById(key);
        if( element != null ){
            element.requireLists = element.requireLists || [];
            element.requireLists.push({element: this, values: values});
            element.addEventListener('change', CheckRequireValue);
            CheckRequireValue.bind(element)();
        }
    }
}

// 对元素的值进行检查
function CheckRequireValue(e){
    for(var i = 0; i < this.requireLists.length; i++) {
        var requireData = this.requireLists[i];
        var visible = false;

        for(var j = 0; j < requireData.values.length; j++){
            if(requireData.values[j] == (this.value || this.selectedIndex)){
                visible = true;
            }
        }

        if(visible)
            requireData.element.show();
        else
            requireData.element.hide();
    }
}

// 设置Tips
function  SetTooltip(text) {
    this.tooltip = text;
    return this;
}

