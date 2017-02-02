/**
 * Created by Frankie.W on 2016/12/31.
 */

function AttributeValue(name, key, base, scale) {
    this.name = name;
    this.key = key;
    this.base = base;
    this.scale = scale;

    this.label = undefined;
    this.left = undefined;
    this.right = undefined;
    this.baseBox = undefined;
    this.scaleBox = undefined;
    this.hidden = false;
}

function CreateAttributeValueHTML(target) {
    this.label = document.createElement('label');
    this.label.innerHTML = this.name;
    if(this.tooltip){
        this.label.setAttribute('data-tooltip', this.tooltip);
        this.label.className = 'tooltip';
    }
    target.appendChild(this.label);

    this.baseBox = document.createElement('input');
    this.baseBox.id = this.key + '-base';
    this.baseBox.value = this.base;
    this.baseBox.className = 'base';
    target.appendChild(this.baseBox);

    this.left = document.createElement('label');
    this.left.innerHTML = '+ (';
    this.left.className = 'attrLabel';
    target.appendChild(this.left);

    this.scaleBox = document.createElement('input');
    this.scaleBox.id = this.key + '-scale';
    this.scaleBox.value = this.scale;
    this.scaleBox.className = 'scale';
    target.appendChild(this.scaleBox);

    this.right = document.createElement('label');
    this.right.innerHTML = ')';
    this.right.className = 'attrLabel';
    target.appendChild(this.right);
}

AttributeValue.prototype.RequireValue = RequireValue;
AttributeValue.prototype.ApplyRequireValues = ApplyRequireValues;
AttributeValue.prototype.SetTooltip = SetTooltip;
AttributeValue.prototype.CreateHTML = CreateAttributeValueHTML;

AttributeValue.prototype.dupe = function() {
    return new AttributeValue(this.name, this.key, this.base, this.scale)
        .SetTooltip(this.tooltip);
}

AttributeValue.prototype.hide = function () {
    if(this.label && this.baseBox && this.scaleBox && this.left && this.right && !this.hidden){
        this.hidden = true;
        this.label.style.display = 'none';
        this.baseBox.style.display = 'none';
        this.left.style.display = 'none';
        this.scaleBox.style.display = 'none';
        this.right.style.display = 'none';
    }
}

AttributeValue.prototype.show = function () {
    if(this.label && this.baseBox && this.scaleBox && this.left && this.right && this.hidden){
        this.hidden = false;
        this.label.style.display = 'block';
        this.baseBox.style.display = 'block';
        this.left.style.display = 'block';
        this.scaleBox.style.display = 'block';
        this.right.style.display = 'block';
    }
}

AttributeValue.prototype.update = function () {
    if(this.baseBox && this.scaleBox){
        this.base = this.baseBox.value;
        this.scale = this.scaleBox.value;
    }
}

AttributeValue.prototype.getString = function (spacing) {
    return spacing + this.key + "-base: " + this.base + "\n"
        + spacing + this.key + "-scale: " + this.scale + "\n";
}

AttributeValue.prototype.loadBase = function (value) {
    this.base = value;
}

AttributeValue.prototype.loadScale = function (value) {
    this.scale = value;
}