/**
 * Created by Frankie.W on 2016/12/31.
 */

function  ByteListValue(name, key, values, value) {
    this.name = name;
    this.key = key;
    this.value = value;
    this.values = values;
    this.label = undefined;
    this.box = undefined;
    this.hidden = false;
}


function CreateByteListValueHTML(target) {
    this.label = document.createElement('label');
    this.label.innerHTML = this.name;
    this.label.className = 'areaLabel';
    if(this.tooltip){
        this.label.setAttribute('data-tooltip', this.tooltip);
        this.label.className = 'tooltip';
    }
    target.appendChild(this.label);

    this.checkboxes = [];
    this.div = document.createElement('div');
    this.div.className = 'byteList';
    var html = '';
    for(var i = 0; i < this.values.length; i++){
        var id = this.key + "-" + this.values[i].replace(' ','-').toLowerCase();
        var checked = (this.value & (i << i) ? ' checked' : '');
        html += '<input type="checkbox" name="byte' + i + '" id="' + id + '"' + checked + '>' + this.values[i] + '<br>';
    }
    this.div.innerHTML = html;
    for(var i = 0; i < this.div.clildNodes.length; i += 3){
        this.checkboxes[i / 3] = this.div.childNodes[i];
    }
    target.appendChild(this.div);
}

ByteListValue.prototype.RequireValue = RequireValue;
ByteListValue.prototype.ApplyRequireValues = ApplyRequireValues;
ByteListValue.prototype.SetTooltip = SetTooltip;
ByteListValue.prototype.CreateHTML = CreateByteListValueHTML;

ByteListValue.prototype.dupe = function () {
    return new StringListValue(this.name, this.key, this.values, this.value)
        .SetTooltip(this.tooltip);
}

ByteListValue.prototype.hide = function () {
    if(this.label && this.div && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.div.style.display = 'none';
    }
}

ByteListValue.prototype.show = function () {
    if(this.label && this.div && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.div.style.display = 'block';
    }
}

ByteListValue.prototype.update = function () {
    if(this.div){
        this.value = 0;
        for(var i = 0; i < this.checkboxes.length; i++){
            if(this.checkboxes[i].checked){
                this.value += (1 << i);
            }
        }
    }
}

ByteListValue.prototype.getString = function (spacing) {
    var result = spacing + this.key + ': ' + this.value + '\n';
    return result;
}

ByteListValue.prototype.load = function (value) {
    this.value = value;
}