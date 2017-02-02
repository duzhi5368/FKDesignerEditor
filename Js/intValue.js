/**
 * Created by Frankie.W on 2016/12/31.
 */

function  IntValue(name, key, value) {
    this.name = name;
    this.key = key;
    this.value = value;
    this.label = undefined;
    this.box = undefined;
    this.hidden = false;
}


function CreateIntValueHTML(target) {
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
    this.box.addEventListener('input', CValueFilter.FilterInt);
    target.appendChild(this.box);
}

IntValue.prototype.RequireValue = RequireValue;
IntValue.prototype.ApplyRequireValues = ApplyRequireValues;
IntValue.prototype.SetTooltip = SetTooltip;
IntValue.prototype.CreateHTML = CreateIntValueHTML;

IntValue.prototype.dupe = function () {
    return new IntValue(this.name, this.key, this.value)
        .SetTooltip(this.tooltip);
}

IntValue.prototype.hide = function () {
    if(this.label && this.box && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.box.style.display = 'none';
    }
}

IntValue.prototype.show = function () {
    if(this.label && this.box && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.box.style.display = 'block';
    }
}

IntValue.prototype.update = function () {
    if(this.box){
        this.value = Number(this.box.value);
    }
}

IntValue.prototype.getString = function (spacing) {
    return spacing + this.key + ": " + this.value + "\n";
}

IntValue.prototype.load = function (value) {
    this.value = value;
}