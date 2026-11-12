import { url, icon } from '../lib/site.mjs';
const photos = [
  { id:'equipe', file:'equipe-evento.jpg', width:1024, height:768, label:'Em equipe', alt:'Registro de equipe com seis participantes reunidos em um evento.', caption:'Trocas que fazem parte da trajetória.', expand:'Ampliar foto da equipe' },
  { id:'participacao', file:'participacao-evento.jpg', width:1024, height:682, label:'Participação', alt:'Registro espontâneo entre participantes sentados durante um evento.', caption:'Presença, escuta e novas perspectivas.', expand:'Ampliar foto de participação', rotated:true },
];
function image(photo, enlarged=false) {
  return `<span class="personal-photo-image${photo.rotated?' photo-rotated':''}"><img src="${url('assets/photos/'+photo.file)}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"${enlarged?'':' class="photo-zoom"'}></span>`;
}
export function portrait() {
  return `<figure class="hero-portrait intro-enter"><div class="portrait-window"><img src="${url('assets/photos/caio-retrato.jpg')}" alt="Retrato de Caio Teixeira, de camisa preta e braços cruzados." width="1121" height="1403" fetchpriority="high" decoding="async"></div><figcaption><span>Caio Teixeira</span><span>Lavras · MG</span></figcaption></figure>`;
}
export function photoStory() {
  return `<div class="personal-records"><div class="personal-records-heading reveal"><span class="eyebrow">ALÉM DAS ENTREGAS</span><p>Entre pessoas e ideias.</p></div><div class="personal-photo-grid">${photos.map(photo=>`<figure class="personal-photo personal-photo-${photo.id} reveal"><button type="button" class="personal-photo-open" data-open-dialog="foto-${photo.id}" aria-haspopup="dialog" aria-controls="foto-${photo.id}" aria-label="${photo.expand}">${image(photo)}<span class="photo-expand" aria-hidden="true">${icon('plus',18)}</span></button><figcaption><span>${photo.label}</span><p>${photo.caption}</p></figcaption></figure>`).join('')}</div></div>`;
}
export function photoDialogs() {
  return photos.map(photo=>`<dialog class="site-dialog personal-photo-dialog${photo.rotated?' personal-photo-dialog-portrait':''}" id="foto-${photo.id}" aria-labelledby="foto-${photo.id}-title"><button type="button" class="dialog-close" data-close-dialog aria-label="Fechar foto">${icon('close',20)}</button><figure>${image(photo,true)}<figcaption id="foto-${photo.id}-title">${photo.caption}</figcaption></figure></dialog>`).join('');
}
