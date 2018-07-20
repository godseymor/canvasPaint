'use strict';

(function () {

  var Sizes = {
    INIT_X : 0,
    INIT_Y : 0,
    END_X : 300,
    END_Y : 150
  };

  var canvasBody = document.querySelector('.canvas');
  var paintField = document.querySelector('#paintField');
  var canvasSettings = document.querySelector('.canvas__settings');

  var canvasClear = document.querySelector('.canvas__clear');
  var canvasSave = document.querySelector('.canvas__save');

  document.querySelector('.destroy').addEventListener('click', function () {
    localStorage.clear();
  })

  var ctx = paintField.getContext('2d');
  ctx.lineCap = 'round';
  var isDraw;

  function setBrushStyle() {
    ctx.strokeStyle = canvasSettings.colorStyle.value;
    ctx.lineWidth = canvasSettings.brushStyle.value;

    document.body.style.borderColor = canvasSettings.colorStyle.value;
  }

  function onMouseDown(evt) {
    isDraw = true;
    ctx.beginPath();
    ctx.moveTo(evt.pageX - paintField.offsetLeft, evt.pageY - paintField.offsetTop);
  }

  function onMouseMove(evt) {
    if (isDraw) {
      ctx.lineTo(evt.pageX - paintField.offsetLeft, evt.pageY - paintField.offsetTop);
      ctx.stroke();
    }
  }

  function onMouseUp() {
    isDraw = false;
    ctx.closePath();
  }

  function onCanvasClearButtonClick() {
    ctx.clearRect(Sizes.INIT_X, Sizes.INIT_Y, Sizes.END_X, Sizes.END_Y);
  }

  function onCanvasSaveButtonClick() {
    var dataUrl = paintField.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, "");
    localStorage.setItem('img', dataUrl);
  }

  function renderImage (source) {
    var img = new Image();
    img.src = "data:image/png;base64," + source;
    img.onload = function () {
      ctx.drawImage(img, Sizes.INIT_X, Sizes.INIT_Y);
    }
  }

  paintField.addEventListener('mousedown', onMouseDown);
  paintField.addEventListener('mousemove', onMouseMove);
  canvasBody.addEventListener('mouseup', onMouseUp);

  canvasSettings.addEventListener('change', setBrushStyle);

  canvasClear.addEventListener('click', onCanvasClearButtonClick);
  canvasSave.addEventListener('click', onCanvasSaveButtonClick);

  document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.length > 0) {
      renderImage(localStorage.getItem('img'));
    }
  });

  window.addEventListener('storage', function(evt) {
    renderImage(evt.newValue);
  });

})();
