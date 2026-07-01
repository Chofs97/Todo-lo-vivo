const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealElements.forEach((element) => revealObserver.observe(element));

const soundToggle = document.getElementById('soundToggle');
const ambientAudio = document.getElementById('ambientAudio');

soundToggle?.addEventListener('click', async () => {
  if (!ambientAudio) return;

  try {
    if (ambientAudio.paused) {
      await ambientAudio.play();
      soundToggle.textContent = 'Pausar sonido';
      soundToggle.classList.add('active');
    } else {
      ambientAudio.pause();
      soundToggle.textContent = 'Activar sonido';
      soundToggle.classList.remove('active');
    }
  } catch (error) {
    soundToggle.textContent = 'Audio no disponible';
  }
});

const galleries = {
  'soyaltepec-territorio': {
    eyebrow: 'Documentos · 01',
    title: 'San Miguel Soyaltepec: territorio',
    text: 'Fotografías de la aproximación al territorio: paisaje, recorridos y espacios vinculados con la memoria familiar.',
    images: [
      ['assets/imagenes/territorio-01.webp', 'Paisaje de San Miguel Soyaltepec'],
      ['assets/imagenes/territorio-02.webp', 'Detalle del territorio'],
      ['assets/imagenes/territorio-03.webp', 'Recorrido por el territorio'],
      ['assets/imagenes/territorio-04.webp', 'Registro visual del paisaje']
    ]
  },
  'soyaltepec-encuentros': {
    eyebrow: 'Documentos · 02',
    title: 'San Miguel Soyaltepec: encuentros',
    text: 'Registros de las sesiones de bordado, conversaciones, manos y materiales del espacio compartido.',
    images: [
      ['assets/imagenes/encuentro-01.webp', 'Sesión de bordado'],
      ['assets/imagenes/encuentro-02.webp', 'Manos y materiales'],
      ['assets/imagenes/encuentro-03.webp', 'Detalle del encuentro'],
      ['assets/imagenes/encuentro-04.webp', 'Registro de conversación']
    ]
  },
  palenque: {
    eyebrow: 'Documentos · 03',
    title: 'Palenque: paisaje',
    text: 'Fotografías y audios ambientales que amplían la reflexión sobre la raíz, la humedad, el crecimiento y la persistencia de lo vivo.',
    images: [
      ['assets/imagenes/palenque-01.webp', 'Paisaje de Palenque'],
      ['assets/imagenes/palenque-02.webp', 'Raíces y vegetación'],
      ['assets/imagenes/palenque-03.webp', 'Detalle del paisaje'],
      ['assets/imagenes/palenque-04.webp', 'Fauna de la región'],
      ['assets/imagenes/palenque-05.webp', 'Fauna de la región'],
      ['assets/imagenes/palenque-06.webp', 'Fauna de la región']
    ],
    audio: [
      
    ]
  }
};

const modal = document.getElementById('galleryModal');
const modalEyebrow = document.getElementById('modalEyebrow');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalGallery = document.getElementById('modalGallery');
const modalAudio = document.getElementById('modalAudio');

function createImageFigure(src, alt) {
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  const caption = document.createElement('figcaption');

  image.src = src;
  image.alt = alt;
  image.onerror = () => {
    image.remove();
    figure.classList.add('image-placeholder');
  };
  caption.textContent = alt;

  figure.append(image, caption);
  return figure;
}

function createAudioItem(src, label) {
  const wrapper = document.createElement('div');
  const title = document.createElement('p');
  const audio = document.createElement('audio');
  const source = document.createElement('source');

  wrapper.className = 'audio-item';
  title.textContent = label;
  audio.controls = true;
  audio.preload = 'metadata';
  source.src = src;
  source.type = 'audio/mpeg';
  audio.append(source);

  wrapper.append(title, audio);
  return wrapper;
}

function openGallery(galleryKey) {
  const data = galleries[galleryKey];
  if (!data || !modal) return;

  modalEyebrow.textContent = data.eyebrow;
  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modalGallery.innerHTML = '';
  modalAudio.innerHTML = '';

  data.images.forEach(([src, alt]) => modalGallery.appendChild(createImageFigure(src, alt)));
  data.audio.forEach(([src, label]) => modalAudio.appendChild(createAudioItem(src, label)));

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalAudio.querySelectorAll('audio').forEach((audio) => audio.pause());
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-gallery]').forEach((card) => {
  card.addEventListener('click', () => openGallery(card.dataset.gallery));
});

document.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', closeGallery);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeGallery();
});
