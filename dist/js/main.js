const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Filtros y efectos

document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    //console.log("Test");

    if (e.target.classList.contains("brightness-add")) {
      //Brillo
      Caman("#canvas", img, function() {
        this.brightness(5).render();
      });
    } else if (e.target.classList.contains("brightness-remove")) {
      Caman("#canvas", img, function() {
        this.brightness(-5).render();
      });
    } else if (e.target.classList.contains("contrast-add")) {
      //Contraste
      Caman("#canvas", img, function() {
        this.contrast(5).render();
      });
    } else if (e.target.classList.contains("contrast-remove")) {
      Caman("#canvas", img, function() {
        this.contrast(-5).render();
      });
    } else if (e.target.classList.contains("saturation-add")) {
      // Saturacion
      Caman("#canvas", img, function() {
        this.saturation(14).render();
      });
    } else if (e.target.classList.contains("saturation-remove")) {
      Caman("#canvas", img, function() {
        this.saturation(-14).render();
      });
    } else if (e.target.classList.contains("vibrance-add")) {
      // Intensidad
      Caman("#canvas", img, function() {
        this.vibrance(25).render();
      });
    } else if (e.target.classList.contains("vibrance-remove")) {
      Caman("#canvas", img, function() {
        this.vibrance(-25).render();
      });
    } else if (e.target.classList.contains("vintage-add")) {
      // Vintage
      Caman("#canvas", img, function() {
        this.vintage().render();
      });
    } else if (e.target.classList.contains("lomo-add")) {
      // Lomo
      Caman("#canvas", img, function() {
        this.lomo().render();
      });
    } else if (e.target.classList.contains("clarity-add")) {
      // Clarity
      Caman("#canvas", img, function() {
        this.clarity().render();
      });
    } else if (e.target.classList.contains("sincity-add")) {
      // Sin city
      Caman("#canvas", img, function() {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains("crossprocess-add")) {
      // Cross Process
      Caman("#canvas", img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains("pinhole-add")) {
      // Pinhole
      Caman("#canvas", img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains("nostalgia-add")) {
      // Nostalgia
      Caman("#canvas", img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains("hermajesty-add")) {
      // Her Majesty
      Caman("#canvas", img, function() {
        this.herMajesty().render();
      });
    }
  }
});

//Revertir filtros
revertBtn.addEventListener("click", e => {
  Caman("#canvas", img, function() {
    this.revert();
  });
});

// Subir imagen

uploadFile.addEventListener("change", e => {
  // Capturar archivo
  const file = document.getElementById("upload-file").files[0];
  //Inicializar FireReader
  const reader = new FileReader();

  if (file) {
    //Darle nombre al archivo
    fileName = file.name;
    //Leer la informacion como url
    reader.readAsDataURL(file);
  }

  //Añadir imagen al canvas

  reader.addEventListener(
    "load",
    () => {
      //Crear imagen
      img = new Image();
      //Set source
      img.src = reader.result;
      //Cuando la imagen cargue, añadir al canvas
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute("data-caman-id");
      };
    },
    false
  );
});

//Bajar Imagen

downloadBtn.addEventListener("click", e => {
  //Cambiar la extension de la imagen
  const fileExtension = fileName.slice(-4);

  //Inicializar nuevo nombre de archivo
  let newFileName;

  //Verificar que es una imagen
  if (fileExtension === ".jpg" || fileExtension === ".png") {
    newFileName = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  }

  //llamamos a Download
  download(canvas, newFileName);
});

//Download function

function download(canvas, filename) {
  //Inicializar el evento
  let e;
  //Crear link
  const link = document.createElement("a");

  //Establacer propiedades

  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.89);

  //Nuevo evento de mouse

  e = new MouseEvent("click");
  //Enviar el evento

  link.dispatchEvent(e);
}
