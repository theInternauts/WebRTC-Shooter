WebShooter = {
  Player: {},
  Model: {}
}

WebShooter.Player = function(options) {
  this.tempId = Date.now().toString(),
  this.name = options.name || this.id
}



$(function(){
  direction = { origin: {left: 0, top: 0}, velocity: { DxLeft: 0, DxRight: 0} }

  getDiff = function(a,b){
    diff = {}
    diff.now = b.now - a.now
    diff.time = b.time - a.time
    diff.clientX = b.clientX - a.clientX
    diff.clientY = b.clientY - a.clientY

    return diff
  }

  getReactionTime = function(triggeredEvent, responseEvent){
    return responseEvent.timeStamp - triggeredEvent.timeStamp
  }

  $(document).on('drawGun', function(event, options){
    targetime = event
    $('.weapon').css({ 'background-color': 'red'})
  })

  $('.weapon').on('fireWeapon', function(event, data){
    reactionTime = getReactionTime(targetime, data.event)
    console.log(reactionTime)
  })

  $('.weapon').draggable({
    start: function(event){
      start = event
      startInfo = { now: Date.now(), time: event.timeStamp, clientX: event.clientX, clientY: event.clientY }
      console.log("start", startInfo.now, event.timeStamp)
    },
    stop: function(event){
      stop = event
      stopInfo = { now: Date.now(), time: event.timeStamp, clientX: event.clientX, clientY: event.clientY }
      console.log("stopped", stopInfo.now, event.timeStamp)

      // diff = getDiff(startInfo, stopInfo)
      $(this).trigger('fireWeapon', { event: event, stopInfo: stopInfo })
    }
  })

})