/**
 * Created by Frankie.W on 2016/12/31.
 */

function IndexListValue(name, key, list, index) {
    this.name = name;
    this.key = key;
    this.list = list;
    this.index = index;
    this.label = undefined;
    this.select = undefined;
    this.hidden = false;
}

// 创建一组HTML元素，并挂接到target元素上
function CreateIndexListValueHTML(target) {
    this.label = document.createElement('label');
    this.label.innerHTML = this.name;
    if(this.tooltip){
        this.label.serAttribute('data-tooltip', this.tooltip);
        this.label.className = 'tooltip';
    }
    target.appendChild(this.label);

    this.select = document.createElement('select');
    this.select.id = this.key;
    for(var i = 0; i < this.list.length; i++){
        var option = document.createElement('option');
        option.innerHTML = this.list[i];
        this.select.add(option);
    }
    this.select.selectedIndex = this.index;
    target.appendChild(this.select);
}

// 函数Hook
IndexListValue.prototype.RequireValue = RequireValue;
IndexListValue.prototype.ApplyRequireValues = ApplyRequireValues;
IndexListValue.prototype.SetTooltip = SetTooltip;
IndexListValue.prototype.CreateHTML = CreateIndexListValueHTML;

IndexListValue.prototype.dupe = function () {
    return new IndexListValue(this.name, this.key, this.list, this.index).SetTooltip(this.tooltip);
}

IndexListValue.prototype.hide = function () {
    if(this.label && this.select && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.select.style.display = 'none';
    }
}

IndexListValue.prototype.show = function () {
    if(this.label && this.select && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.select.style.display = 'block';
    }
}

IndexListValue.prototype.update = function () {
    if(this.select)
        this.index = this.select.selectedIndex;
}

IndexListValue.prototype.getString = function (spacing) {
    return spacing + this.key + ": " + this.index + '\n';
}

IndexListValue.prototype.load = function (value) {
    this.index = value;
}