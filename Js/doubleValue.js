/**
 * Created by Frankie.W on 2016/12/31.
 */

function DoubleValue(name, key, value){
    this.name = name;
    this.key = key;
    this.value = value;
    this.label = undefined;
    this.box = undefined;
    this.hidden = false;
}

function CreateDoubleValueHTML(target) {
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
    this.box.addEventListener('input', CValueFilter.FilterDouble);
    target.appendChild(this.box);
}

DoubleValue.prototype.RequireValue = RequireValue;
DoubleValue.prototype.ApplyRequireValues = ApplyRequireValues;
DoubleValue.prototype.SetTooltip = SetTooltip;
DoubleValue.prototype.CreateHTML = CreateDoubleValueHTML;

DoubleValue.prototype.dupe = function () {
    return new DoubleValue(this.name, this.key, this.value)
        .SetTooltip(this.tooltip);
}

DoubleValue.prototype.hide = function () {
    if(this.label && this.box && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.box.style.display = 'none';
    }
}

DoubleValue.prototype.show = function () {
    if(this.label && this.box && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.box.style.display = 'block';
    }
}

DoubleValue.prototype.update = function () {
    if(this.box){
        this.value = Number(this.box.value);
    }
}

DoubleValue.prototype.getString = function (spacing) {
    return spacing + this.key + ": " + this.value + "\n";
}

DoubleValue.prototype.load = function (value) {
    this.value = value;
}