navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
URL = window.URL || window.mozURL || window.webkitURL

let App = {}
let tmpl = window.imgTmpl.textContent


App.camara = function (){
  const canvas = window.preview
  const video = window.stream
  const btn = window.tomarFoto
  const imagen = {} 

  navigator.getUserMedia(
    {video: true}, 
    function(stream){
      video.src = URL.createObjectURL(stream)
      btn.addEventListener('click', function(){
        canvas.getContext('2d')
          .drawImage(video, 0, 0, 300, 230)
          imagen.id = 'imagen-' + Date.now()
          imagen.data = canvas.toDataURL('image/png')
          App.insertar(imagen.id, imagen.data)
          App.ws.emit('imagen', imagen)
      })
    },
    function(err){

    }
  )
}

App.ws = io.connect('/')

App.insertar = function(id, data){
  imagenes.innerHTML += tmpl.replace('%id', id)
                            .replace('%src', data)
}

App.ws.on('imagen', function(img){
  App.insertar(img.id, img.data)
})

App.ws.on('ready', function(){
  msgs.textContent = 'Websockets estan listos'
})

App.camara()