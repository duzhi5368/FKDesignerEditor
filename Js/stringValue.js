/**
 * Created by Frankie.W on 2016/12/31.
 */

function  StringValue(name, key, value) {
    this.name = name;
    this.key = key;
    this.value = value;
    this.label = undefined;
    this.box = undefined;
    this.hidden = false;
}


function CreateStringValueHTML(target) {
    this.label = document.createElement('label');
    this.label.innerHTML = this.name;
    if(this.tooltip){
        this.label.setAttribute('data-tooltip', this.tooltip);
        this.label.className = 'tooltip';
    }
    target.appendChild(this.label);

    this.box = document.createElement('input');
    this.box.id = this.key;
    this.box.value = this.value;
    target.appendChild(this.box);
}

StringValue.prototype.RequireValue = RequireValue;
StringValue.prototype.ApplyRequireValues = ApplyRequireValues;
StringValue.prototype.SetTooltip = SetTooltip;
StringValue.prototype.CreateHTML = CreateStringValueHTML;

StringValue.prototype.dupe = function () {
    return new StringValue(this.name, this.key, this.value)
        .SetTooltip(this.tooltip);
}

StringValue.prototype.hide = function () {
    if(this.label && this.box && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.box.style.display = 'none';
    }
}

StringValue.prototype.show = function () {
    if(this.label && this.box && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.box.style.display = 'block';
    }
}

StringValue.prototype.update = function () {
    if(this.box){
        this.value = this.box.value;
    }
}

StringValue.prototype.getString = function (spacing) {
    var enclosing = "'";
    if(this.value.indexOf("'") >= 0){
        if(this.value.indexOf('"') >= 0)
            this.value = this.value.replace("'", "");
        else
            enclosing = '"';
    }
    return spacing + this.key + ": " + enclosing + this.value + enclosing + "\n";
}

StringValue.prototype.load = function (value) {
    this.value = value;
}