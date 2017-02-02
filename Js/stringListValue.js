/**
 * Created by Frankie.W on 2016/12/31.
 */

function  StringListValue(name, key, value) {
    this.name = name;
    this.key = key;
    this.value = value;
    this.label = undefined;
    this.box = undefined;
    this.hidden = false;
}


function CreateStringListValueHTML(target) {
    this.label = document.createElement('label');
    this.label.innerHTML = this.name;
    this.label.className = 'areaLabel';
    if(this.tooltip){
        this.label.setAttribute('data-tooltip', this.tooltip);
        this.label.className = 'tooltip';
    }
    target.appendChild(this.label);

    //  补尾结束符
    var content = '';
    for(var i = 0; i < this.value.length; i++){
        content += this.value[i];
        if(i != this.value.length - 1)
            content += '\n';
    }
    this.box = document.createElement('textarea');
    this.box.id = this.key;
    this.box.value = content;
    target.appendChild(this.box);
}

StringListValue.prototype.RequireValue = RequireValue;
StringListValue.prototype.ApplyRequireValues = ApplyRequireValues;
StringListValue.prototype.SetTooltip = SetTooltip;
StringListValue.prototype.CreateHTML = CreateStringListValueHTML;

StringListValue.prototype.dupe = function () {
    return new StringListValue(this.name, this.key, this.value)
        .SetTooltip(this.tooltip);
}

StringListValue.prototype.hide = function () {
    if(this.label && this.box && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.box.style.display = 'none';
    }
}

StringListValue.prototype.show = function () {
    if(this.label && this.box && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.box.style.display = 'block';
    }
}

StringListValue.prototype.update = function () {
    if(this.box){
        this.value = this.box.value.split('\n');
    }
}

StringListValue.prototype.getString = function (spacing) {
    var result = spacing + this.key + ':\n';
    for(var i = 0; i < this.value.length; i++){
        var enclosing = "'";
        if(this.value[i].indexOf("'") >= 0){
            if(this.value[i].indexOf('"') >= 0)
                this.value[i] = this.value[i].replace("'", "");
            else
                enclosing = '"';
        }
        result += spacing + "- " + enclosing + this.value[i] + enclosing + "\n";
    }
    return result;
}

StringListValue.prototype.load = function (value) {
    this.value = value;
}