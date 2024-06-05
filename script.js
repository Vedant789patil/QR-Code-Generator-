const inputValue = document.querySelector('#URL');
const generate = document.querySelector('#submit');
const form = document.getElementById('form');
const mode = document.getElementById('modes');
const qrContainer = document.querySelector('#qrCodeContainer');
let download = document.querySelectorAll('.download li');

let properties = {
  height: 250,
  width: 250,
  type: "svg",
  margin: 10,
  data: '',
  image: '',
  backgroundOptions: {
    color: "white",
  },
  dotsOptions: {
    color: "#505ADC",
    type: "extra-rounded",
  },
  cornersSquareOptions:{
    type: "extra-rounded",
  },
  cornersDotOptions:{
    type: "dot",
  },
  imageOptions: {
    margin: 0,
    imageSize: 0.9
  }
}

function adjustQrCodeSize() {
  const width = window.innerWidth;

  if (width <= 480) {
    // Mobile size
    properties.width = 250;
    properties.height = 250;
  } else {
    // Desktop size
    properties.width = 400;
    properties.height = 400;
  }
}

generate.onclick = () => {
  adjustQrCodeSize();
  generateQr();
};

let selectedValue;

mode.addEventListener('change', (event) => {
  selectedValue = event.target.value;
  console.log(selectedValue);
  
  switch (selectedValue) {
    case '1':
      properties.dotsOptions.color = "black";
      properties.dotsOptions.type = 'square';
      properties.cornersSquareOptions.type = 'square';
      properties.cornersDotOptions.type = 'square';
      break;
    case '2':
      properties.dotsOptions.color = '#505ADC';
      properties.dotsOptions.type = 'extra-rounded';
      properties.cornersSquareOptions.type = 'extra-rounded';
      properties.cornersDotOptions.type = 'dot';
      break;
    case '3':
      properties.dotsOptions.color = '#505ADC';
      properties.dotsOptions.type = 'dots';
      properties.cornersSquareOptions.type = 'dot';
      properties.cornersDotOptions.type = 'dot';
      break;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateQr();
});

function generateQr() {
  qrContainer.style.padding = '20px';
  qrContainer.style.margin = '10px';
  // qrContainer.style.display = 'inline-block'; 
  
  qrContainer.innerHTML = '';
  properties.data = inputValue.value;
  const qr = new QRCodeStyling(properties);
  qr.append(qrContainer);
  
  // download
  download[0].onclick = () => qr.download({ name: "qr-code", extension: "png" });
  download[1].onclick = () => qr.download({ name: "qr-code", extension: "jpg" });
}
