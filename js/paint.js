(function () {
  var ctx = paintField.getContext('2d');
  // ctx.linCap = 'square, round, butt';
  var paint = false;
})();

function init() {
  var ctx = paintField.getContext('2d');
  ctx.lineCap = 'round';
  var paint = false;

  paintField.addEventListener("mousedown", Down);
  paintField.addEventListener("mouseup", Up);
  paintField.addEventListener("mousemove", Move);

  function Down(e) {
    paint = true;
    ctx.beginPath();
    ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  }

  function Up(e) {
    paint = false;
    ctx.closePath();
  }

  function Move(e) {
    if (!paint) return;

    ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    ctx.stroke();
  }

  function setStyle() {
    ctx.strokeStyle = this.strokeStyle.value;
    ctx.lineWidth = this.lineWidth.value;
  }
  document.querySelector('.canvas__settings').addEventListener('change', setStyle);
}
init();