'use strict';

(function () {
  var paintField = document.querySelector('#paintField');
  var canvasSettings = document.querySelector('.canvas__settings');

  function setBrushStyle() {
    ctx.strokeStyle = canvasSettings.colorStyle.value;
    ctx.lineWidth = canvasSettings.brushStyle.value;
  }
  canvasSettings.addEventListener('change', setBrushStyle);

  var ctx = paintField.getContext('2d');
  var isPainting = false;

  function onMouseDown(evt) {
    isPainting = true;
    ctx.beginPath();
    ctx.moveTo(evt.pageX - paintField.offsetLeft, evt.pageY - paintField.offsetTop);
  }

  function onMouseMove(evt) {
    if (isPainting) {
      ctx.lineTo(evt.pageX - paintField.offsetLeft, evt.pageY - paintField.offsetTop);
      ctx.stroke();
    }
  }

  function onMouseUp() {
    isPainting = false;
    ctx.closePath();
  }

  paintField.addEventListener('mousedown', onMouseDown);
  paintField.addEventListener('mousemove', onMouseMove);
  paintField.addEventListener('mouseup', onMouseUp);

})();
