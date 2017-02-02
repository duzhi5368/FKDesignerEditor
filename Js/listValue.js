/**
 * Created by Frankie.W on 2016/12/31.
 */

function ListValue(name, key, list, value) {
    this.name = name;
    this.key = key;
    this.list = list;
    this.value = value;
    this.label = undefined;
    this.select = undefined;
    this.hidden = false;
}

// 创建一组HTML元素，并挂接到target元素上
function CreateListValueHTML(target) {
    this.label = document.createElement('label');
    this.label.innerHTML = this.name;
    if(this.tooltip){
        this.label.serAttribute('data-tooltip', this.tooltip);
        this.label.className = 'tooltip';
    }
    target.appendChild(this.label);

    this.select = document.createElement('select');
    this.select.id = this.key;

    var selected = -1;
    var vLower = this.value.toLowerCase().replace('_', ' ');

    for(var i = 0; i < this.list.length; i++){
        var option = document.createElement('option');
        option.innerHTML = this.list[i];
        this.select.add(option);

        var lower = this.list[i].toLowerCase();
        if(lower === vLower || (selected == -1 && this.list[i] == 'none'))
            selected = i;
    }
    this.select.selectedIndex = Math.max(0, selected);
    target.appendChild(this.select);
}

ListValue.prototype.RequireValue = RequireValue;
ListValue.prototype.ApplyRequireValues = ApplyRequireValues;
ListValue.prototype.SetTooltip = SetTooltip;
ListValue.prototype.CreateHTML = CreateListValueHTML;

ListValue.prototype.dupe = function () {
    return new ListValue(this.name, this.key, this.list, this.value)
        .SetTooltip(this.tooltip);
}

ListValue.prototype.hide = function () {
    if(this.label && this.select && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.select.style.display = 'none';
    }
}

ListValue.prototype.show = function () {
    if(this.label && this.select && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.select.style.display = 'block';
    }
}

ListValue.prototype.update = function () {
    if(this.select){
        this.value = this.select[this.select.selectedIndex].innerHTML;
        if(this.value == 'none'){
            this.value = '';
        }
    }
}

ListValue.prototype.getString = function (spacing) {
    return spacing + this.key + ": '" + this.index + "'\n";
}

ListValue.prototype.load = function (value) {
    this.index = value;
}


