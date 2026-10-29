const $ = (id) => document.getElementById(id);
const input = $('photoInput');
let photos = [];
let jobs = [];
let filter = 'all';
let toastTimer;

const shots = [
  { title: 'Main hero', kind: 'hero', direction: 'Create a clean eBay hero photo: the complete item centered, large and front-facing on a pure white seamless background (#ffffff), evenly lit with a soft natural contact shadow. Product only, no props, badges, text, borders, watermark, collage or added accessories.' },
  { title: 'Front view', kind: 'secondary', direction: 'Show the complete exact item from the front in a tasteful warm-beige room with a visible textured wall and natural soft shadows. Keep every real feature and the true color.' },
  { title: 'Three-quarter view', kind: 'secondary', direction: 'Show the exact item at a three-quarter angle on a natural wood or stone surface in a softly styled room. Reveal its real depth without inventing features.' },
  { title: 'Side profile', kind: 'secondary', direction: 'Show a crisp side-profile view of the exact item in a softly lit room with a muted charcoal or taupe textured backdrop. Match its proportions and real construction.' },
  { title: 'Back view', kind: 'secondary', direction: 'Show the rear only if it is visible in the reference photos, using a muted textured room or surface. If unseen, use an honest alternate angle instead of inventing details.' },
  { title: 'Detail close-up', kind: 'secondary', direction: 'Create a tasteful close-up of a real material, texture or control visible in the references, with a softly styled non-white background. Do not add lettering or details.' },
  { title: 'Craft and finish', kind: 'secondary', direction: 'Create a premium close-up emphasizing the actual finish, seams, edges or craftsmanship visible in the references. Use natural soft light and a textured warm-gray surface.' },
  { title: 'In-use context', kind: 'secondary', direction: 'Show the exact item in a believable, uncluttered everyday setting that suits its product type. The item remains the clear focal point. Add no accessories or parts that could be mistaken as included.' },
  { title: 'Styled setting', kind: 'secondary', direction: 'Create a second, visually distinct but realistic setting suited to this item. Keep styling minimal, with the item prominent and fully recognizable; do not imply extra contents or unverified functions.' },
  { title: 'Top-down view', kind: 'secondary', direction: 'Create a neat top-down photograph on a visible textured linen, wood or slate surface suited to the item. Show only real shapes, parts and details; maintain faithful color and proportions.' },
  { title: 'Clean alternate angle', kind: 'secondary', direction: 'Create a final useful marketplace image from a different honest angle in a tasteful, softly lit real-life setting with a visibly non-white background. Show the complete exact product.' }
];
const apparelDirections = [
  'Show the exact selected T-shirt color worn naturally by an adult model, facing forward. Frame the whole shirt clearly from shoulders to hem. Use a clean light-gray or warm-neutral studio wall, natural soft light, and a relaxed neutral pose. Keep the garment as the focal point; do not use a floating cutout.',
  'Show the exact shirt on an adult model in a three-quarter pose in a tasteful, uncluttered studio with a soft taupe background. Keep the shirt fully visible and faithful to its real fit and shape.',
  'Show a clear side-profile view of an adult model wearing the exact shirt, against a simple muted-gray studio wall. Keep the garment visible from shoulder to hem and preserve its actual sleeve and body proportions.',
  'Show the back of the shirt on a model only if that back view is supported by an uploaded reference. Otherwise use a different front three-quarter view. Keep the background uncluttered and neutral.',
  'Create a close-up of the actual T-shirt fabric and visible collar construction. Preserve the true selected color and texture; do not invent a print, label, buttons, or brand mark.',
  'Create a close-up of real stitching, sleeve hem, neckline, or finishing visible in the references. Use natural light and faithful fabric detail; do not invent construction features.',
  'Show an adult model naturally wearing the exact selected-color T-shirt in a believable casual activewear setting, such as a clean urban walkway or park path. Use a softly blurred background; keep the shirt prominent and accurate.',
  'Create a polished lifestyle outfit image with an adult model wearing the exact shirt and simple neutral trousers. Use a tasteful real indoor or outdoor setting. Keep the shirt unobstructed, with no extra layers, added logos, or text.',
  'Create a top-down flat-lay of the exact shirt on a clean, softly textured neutral surface. Keep the whole garment in frame and show only the actual product, with no accessories that could be mistaken as included.',
  'Show the exact shirt on an adult model in a natural seated or standing pose in a tasteful everyday setting. Keep the shirt clearly visible and use the same selected color; no graphic overlays or sales claims.'
];
const headwearDirections = [
  'Create a clean front-facing e-commerce portrait of an adult model wearing the exact hat or cap from the reference. Crop tightly from upper chest to just above the head; the hat, crown, brim, and face should fill most of the square frame. Keep the entire hat unobstructed and sharply focused against a seamless white studio background with soft even light. No full body, props, text, or accessories.',
  'Show the exact hat on an adult model in a flattering three-quarter head-and-shoulders portrait. Keep the face and hat large in frame, with the complete crown and brim visible. Use a bright white or very light gray seamless studio background and natural soft light; no full-body framing or props.',
  'Show a close side-profile portrait of an adult model wearing the exact hat. Frame only the head and shoulders so the brim shape, crown profile, and fit are easy to see. Use a clean white studio background, even light, and a natural pose; do not crop off any part of the hat.',
  'Show the rear fit of the exact hat on an adult model only when the uploaded references show its back or closure. Use a close head-and-shoulders crop with the hat filling the frame, against a clean white studio background. If the rear is not shown in the references, use a front three-quarter portrait instead.',
  'Create a sharp close-up of the actual hat fabric, crown panels, eyelets, seams, or logo that are clearly visible in the references. Keep the real color and construction exact; do not invent embroidery, labels, or markings.',
  'Show a close detail of the real brim edge, stitching, closure, or interior finish only if it is visible in the uploaded photos. Use soft studio light and a clean neutral-white background; do not invent unseen details.',
  'Create a natural lifestyle head-and-shoulders portrait of an adult model wearing the exact hat. Keep the head and hat prominent and sharply recognizable, with only a softly blurred, bright neutral outdoor background. No full-body shot, props, or extra accessories.',
  'Create a polished e-commerce model portrait, framed from upper chest upward, wearing the exact hat in a relaxed natural pose. Make the hat the first thing the viewer notices; keep the face visible, the full hat in frame, and the background plain white or very light gray.',
  'Show the exact hat alone in a neat top-down product view on a clean white surface, preserving its actual shape, color, brim, and visible construction. No styling props, text, or invented details.',
  'Create one final close model portrait from a slightly different head angle, with the exact hat large and fully visible. Use a bright seamless studio background, soft natural light, and a crop from shoulders upward; no full body or graphic overlays.'
];
const trousersDirections = [
  'Show the exact trousers worn by an adult model in a clean front-facing e-commerce studio photo. Crop from the waist to the ankles so the full trousers are the focus; use a plain white background and soft even light. Do not crop the waistband or hems, and add no props or text.',
  'Show the exact trousers on a model in a slight three-quarter pose, framed from waist to ankles. Make the fit, leg shape, and hem easy to see against a bright white seamless studio background.',
  'Create a clear side-profile view of the exact trousers worn by a model, cropped from waist to ankles. Preserve the true cut, color, pockets, seams, and proportions; use a plain light studio background.',
  'Show the back of the trousers on a model only if the reference photos support the rear details. Crop from waist to ankles; otherwise use an alternate front-side view. Keep the background clean white.',
  'Create a close-up of the real trouser fabric and texture, preserving the exact color and weave visible in the references. Do not invent a pattern or material claim.',
  'Show a sharp close-up of real stitching, waistband, pocket, fly, or hem details only where visible in the references. Use soft light and a plain neutral-white background.',
  'Show the exact trousers worn naturally by an adult model in a simple bright studio. Frame from waist to ankles so the garment remains the focal point; no full-body distance shot, extra clothing layers, props, or text.',
  'Create a polished front model image of the exact trousers, cropped from the waist to just below the hems. Keep the complete garment large and clear against a white or very light gray seamless background.',
  'Show the exact trousers neatly laid flat on a clean white surface, front side visible, with waistband and both hems fully in frame. Add no accessories or text.',
  'Create a final useful alternate model angle of the exact trousers, framed from waist to ankles on a plain bright studio background. Preserve every visible product detail and keep the entire garment in frame.'
];
const categoryPattern = {
  headwear: /\b(hats?|caps?|beanies?|headwear|visors?)\b|baseball cap|bucket hat/i,
  trousers: /\b(trousers?|pants?|jeans?|leggings?|shorts?)\b/i,
  clothing: /(shirt|t[ -]?shirt|tee|hoodie|sweatshirt|blouse|polo|dress|jacket|coat|sweater|top|apparel)/i,
  shoes: /\b(shoe|shoes|sneaker|sneakers|boot|boots|heel|sandals?)\b/i,
  bags: /\b(bag|handbag|backpack|purse|tote|wallet)\b/i,
  jewelry: /\b(jewel|jewelry|necklace|ring|bracelet|earring|pendant|watch)\b/i,
  home: /\b(home|decor|lamp|chair|table|vase|rug|cushion|blanket|furniture)\b/i,
  electronics: /\b(phone|camera|laptop|tablet|headphone|speaker|keyboard|mouse|electronic)\b/i
};
function detectedCategory() {
  const selected = $('productCategory').value;
  if (selected !== 'auto') return selected;
  const text = `${$('productName').value} ${$('productDetails').value}`;
  return Object.entries(categoryPattern).find(([, pattern]) => pattern.test(text))?.[0] || 'general';
}

function notify(message) {
  const el = $('toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 3800);
}
function safeName(value) {
  return (value || 'ebay-listing').normalize('NFKD').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 50) || 'ebay-listing';
}
function updateReady() {
  $('generateBtn').disabled = ! $('productName').value.trim();
  $('exportGeminiPackage').disabled = ! $('productName').value.trim() || photos.length === 0;
}
function readData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Photo read nahi ho saki.'));
    reader.onload = () => resolve({ mimeType: file.type || 'image/jpeg', data: String(reader.result).split(',')[1], preview: reader.result, name: file.name });
    reader.readAsDataURL(file);
  });
}
async function compactPhoto(file) {
  if (file.size > 12 * 1024 * 1024) throw new Error(`${file.name}: har photo 12 MB se chhoti honi chahiye.`);
  if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error(`${file.name}: JPG, PNG ya WEBP photo chahiye.`);
  const original = await readData(file);
  const image = new Image(); image.src = original.preview; await image.decode();
  const scale = Math.min(1, 1900 / Math.max(image.naturalWidth, image.naturalHeight));
  if (scale === 1 && file.type === 'image/jpeg' && file.size < 5 * 1024 * 1024) return original;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return new Promise(resolve => canvas.toBlob(blob => {
    const reader = new FileReader();
    reader.onload = () => resolve({ mimeType: 'image/jpeg', data: String(reader.result).split(',')[1], preview: reader.result, name: file.name });
    reader.readAsDataURL(blob || file);
  }, 'image/jpeg', .9));
}
function renderPhotos() {
  $('photoList').innerHTML = '';
  photos.forEach((photo, index) => {
    const chip = document.createElement('div'); chip.className = 'photo-chip';
    const img = document.createElement('img'); img.src = photo.preview; img.alt = photo.name;
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.title = 'Remove photo';
    remove.onclick = () => { photos.splice(index, 1); renderPhotos(); };
    chip.append(img, remove); $('photoList').append(chip);
  });
  updateReady();
}
async function addFiles(files) {
  const incoming = [...files].slice(0, Math.max(0, 5 - photos.length));
  if (!incoming.length) return notify('Zyada se zyada 5 photos add ho sakti hain.');
  try { for (const file of incoming) photos.push(await compactPhoto(file)); renderPhotos(); }
  catch (error) { notify(error.message); }
}
input.addEventListener('change', async event => { await addFiles(event.target.files); input.value = ''; });
['dragenter', 'dragover'].forEach(name => $('dropzone').addEventListener(name, event => { event.preventDefault(); $('dropzone').classList.add('dragover'); }));
['dragleave', 'drop'].forEach(name => $('dropzone').addEventListener(name, event => { event.preventDefault(); $('dropzone').classList.remove('dragover'); }));
$('dropzone').addEventListener('drop', event => addFiles(event.dataTransfer.files));
$('productName').addEventListener('input', updateReady);
$('helpBtn').addEventListener('click', () => $('helpDialog').showModal());
$('closeHelp').addEventListener('click', () => $('helpDialog').close());

function makePrompt(shot) {
  const name = $('productName').value.trim();
  const details = $('productDetails').value.trim().replace(/[.\s]+$/, '');
  const variant = $('targetVariant').value.trim();
  const isBundle = $('listingMode').value === 'bundle';
  const quantity = Math.max(2, Number.parseInt($('packQuantity').value, 10) || 5);
  const shotIndex = shots.indexOf(shot);
  const category = detectedCategory();
  const extra = details ? `Verified item details to preserve: ${details}.` : 'Use only features, materials, colors and details clearly visible in my attached reference photos; do not invent product claims.';
  const variantRule = isBundle
    ? shot.kind === 'hero'
      ? `This listing sells one bundle containing exactly ${quantity} separate pieces. The main hero must show the complete set together, with each included piece visible exactly once and every real color preserved.`
      : `This listing sells one bundle containing exactly ${quantity} separate pieces. This is a secondary photo for that same bundle; the scene may focus on one included piece when the image direction asks for it, but must not imply that the full listing contains only one piece. Use only real items and colors from the uploaded references.`
    : variant
      ? `The selected listing variation is ${variant}. Other uploaded photos may show alternate color options; use only ${variant} in this image. Do not mix colors, make a color collage, or imply that multiple variants are included.`
      : 'If uploaded references show color options, use only one colorway per image. Do not combine variants or imply that multiple colors are included in a single item.';
  let apparel = category === 'clothing' && shot.kind === 'secondary' ? apparelDirections[shotIndex - 1] : '';
  let headwear = category === 'headwear' && shot.kind === 'secondary' ? headwearDirections[shotIndex - 1] : '';
  let trousers = category === 'trousers' && shot.kind === 'secondary' ? trousersDirections[shotIndex - 1] : '';
  let bundleDirection = '';
  if (isBundle && shotIndex === 0) {
    bundleDirection = `Show all ${quantity} included pieces together as one professional eBay bundle hero on a pure white seamless background (#ffffff). Arrange them in a clean diagonal cascade, each item offset enough that its full shape and color remain easy to see. Keep overlaps minimal: never hide a major part of any item. Fill the square frame with the complete set and modest white margins. Include each actual reference item exactly once; no props, text, labels, or extras.`;
  } else if (isBundle && category === 'clothing' && shotIndex === 1) {
    bundleDirection = `Show one included T-shirt from this ${quantity}-shirt pack on an adult model in a clean catalog portrait. Frame from the head down to the hips so the complete shirt is visible, matching a simple e-commerce studio model photo. Use a plain bright white background; no full-body scene, props, or text.`;
  } else if (isBundle && category === 'clothing' && shotIndex === 7) {
    bundleDirection = `Show one included T-shirt from this ${quantity}-shirt pack worn by an adult model in a polished catalog portrait. Frame from the head down to the hips so the complete shirt is visible. Use a clean bright white studio background, no props, extra garments, or text.`;
  } else if (isBundle && category === 'headwear' && shotIndex === 1) {
    bundleDirection = `Show one included hat from this ${quantity}-piece pack worn by an adult model in a clean front-facing catalog portrait. Crop tightly to the head and shoulders so the face and complete hat dominate the square frame. Use a bright white studio background; no full-body framing, props, or text.`;
  } else if (isBundle && category === 'headwear' && shotIndex === 7) {
    bundleDirection = `Show one included hat from this ${quantity}-piece pack worn by an adult model in a polished three-quarter head-and-shoulders portrait. Keep the full hat and face large and clear against a bright white studio background; no full-body framing, props, or text.`;
  } else if (isBundle && category === 'trousers' && shotIndex === 1) {
    bundleDirection = `Show one included pair of trousers from this ${quantity}-piece pack worn by an adult model. Crop from waist to ankles so the full pair is prominent, with a clean white studio background and no props or text.`;
  } else if (isBundle && category === 'trousers' && shotIndex === 7) {
    bundleDirection = `Show one included pair of trousers from this ${quantity}-piece pack in a clean e-commerce model photo, framed from waist to ankles. Keep the full pair visible against a bright white studio background; no full-body distance shot, props, or text.`;
  }
  const secondaryRule = shot.kind === 'secondary'
    ? 'This is a useful secondary eBay product photo, not the main hero frame. Keep it clear, truthful, uncluttered, and focused on the actual item. Use a lifestyle background only when the image purpose calls for it; never add text, badges, graphics, or watermarks.'
    : '';
  const direction = bundleDirection || headwear || trousers || apparel || shot.direction;
  return `Create exactly one square 1:1 photorealistic eBay listing photograph. The uploaded photos are real reference photos of the item. Treat them as authoritative. Product: ${name}. ${variantRule} ${extra} Image purpose: ${shot.title}. ${secondaryRule} ${direction} Keep the item's identity, silhouette, colors, materials, markings, components and proportions faithful to the correct reference. Do not redesign, embellish, repair, recolor, duplicate, or distort it. No text, typography, claims, measurements, graphic overlays, frames, watermarks, price tags, or collages. Center the item, keep it fully visible, use natural product photography, and make it sharp enough for an eBay listing.`;
}
function renderGallery() {
  const gallery = $('gallery'); gallery.innerHTML = '';
  const filtered = jobs.filter(job => filter === 'all' || job.kind === filter);
  filtered.forEach((job, visibleIndex) => {
    const card = document.createElement('article'); card.className = 'image-card'; card.style.animationDelay = `${Math.min(visibleIndex, 10) * 22}ms`;
    const preview = document.createElement('div'); preview.className = 'image-preview';
    if (job.dataUrl) { const img = document.createElement('img'); img.src = job.dataUrl; img.alt = job.title; preview.append(img); }
    else { const mark = document.createElement('span'); mark.className = 'placeholder-icon'; mark.textContent = '◈'; preview.append(mark); }
    const info = document.createElement('div'); info.className = 'card-info';
    const title = document.createElement('div'); title.className = 'card-title'; title.textContent = `${String(job.index + 1).padStart(2, '0')} · ${job.title}`;
    const sub = document.createElement('div'); sub.className = 'card-subtitle'; sub.textContent = job.kind === 'hero' ? 'Main image · white background' : 'Secondary listing image';
    const status = document.createElement('div'); status.className = `card-status${job.dataUrl ? ' done' : ''}`; status.textContent = job.dataUrl ? 'Result added' : 'Prompt ready';
    const actions = document.createElement('div'); actions.className = 'card-actions';
    const copy = document.createElement('button'); copy.type = 'button'; copy.textContent = 'Copy prompt'; copy.onclick = () => copyText(makePrompt(shots[job.index]));
    const file = document.createElement('input'); file.type = 'file'; file.accept = 'image/png,image/jpeg,image/webp'; file.hidden = true;
    const add = document.createElement('button'); add.type = 'button'; add.textContent = job.dataUrl ? 'Replace image' : 'Add result'; add.onclick = () => file.click();
    file.onchange = async () => {
      const chosen = file.files?.[0]; if (!chosen) return;
      if (!/^image\/(png|jpeg|webp)$/.test(chosen.type)) return notify('JPG, PNG ya WEBP image chahiye.');
      if (chosen.size > 20 * 1024 * 1024) return notify('Result image 20 MB se chhoti honi chahiye.');
      try { const image = await readData(chosen); job.dataUrl = image.preview; job.mimeType = image.mimeType; job.fileName = chosen.name; renderGallery(); updateProgress(); }
      catch { notify('Image add nahi ho saki. Dobara try karein.'); }
    };
    actions.append(copy, add);
    if (job.dataUrl) { const download = document.createElement('button'); download.type = 'button'; download.textContent = 'Download'; download.onclick = () => downloadOne(job); actions.append(download); }
    info.append(title, sub, status, actions); card.append(preview, info); gallery.append(card);
  });
  $('emptyState').style.display = jobs.length ? 'none' : 'flex';
  $('downloadAll').disabled = !jobs.length;
}
function updateProgress() {
  const count = jobs.filter(job => job.dataUrl).length;
  $('progressText').textContent = jobs.length ? `${count} of 11 results added` : 'Waiting for product name';
  $('progressBar').style.width = jobs.length ? `${Math.round(count / 11 * 100)}%` : '0%';
}
function preparePrompts() {
  const name = $('productName').value.trim();
  if (!name) return notify('Pehle product ka naam likhein.');
  jobs = shots.map((shot, index) => ({ ...shot, index, dataUrl: '', mimeType: '', fileName: '' }));
  filter = 'all'; document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.filter === 'all'));
  renderGallery(); updateProgress(); notify('11 prompts tayyar hain. Copy karke Gemini app mein use karein.');
}
$('generateBtn').addEventListener('click', preparePrompts);
$('exportGeminiPackage').addEventListener('click', async () => {
  const productName = $('productName').value.trim();
  if (!productName) return notify('Pehle product ka naam likhein.');
  if (!photos.length) return notify('Package mein shamil karne ke liye kam az kam 1 product photo add karein.');

  // Rebuild prompts from the current form values so the ZIP never contains stale prompt text.
  preparePrompts();
  try {
    const photoEntries = photos.map((photo, index) => {
      const path = `photos/${String(index + 1).padStart(2, '0')}-${safeName(photo.name)}.${extFor(photo.mimeType)}`;
      const binary = atob(photo.data);
      const bytes = new Uint8Array(binary.length);
      for (let offset = 0; offset < binary.length; offset++) bytes[offset] = binary.charCodeAt(offset);
      return { path, bytes, manifest: { fileName: photo.name, path, mimeType: photo.mimeType } };
    });
    const manifest = {
      format: 'ebay-listing-studio-gemini-package',
      version: 1,
      productName,
      variation: $('targetVariant').value.trim(),
      verifiedDetails: $('productDetails').value.trim(),
      category: detectedCategory(),
      isBundle: $('listingMode').value === 'bundle',
      bundleQuantity: $('listingMode').value === 'bundle' ? Math.max(2, Number.parseInt($('packQuantity').value, 10) || 5) : 1,
      photos: photoEntries.map(entry => entry.manifest),
      prompts: shots.map(shot => makePrompt(shot))
    };
    const files = [{ name: 'manifest.json', data: new TextEncoder().encode(JSON.stringify(manifest, null, 2)) }];
    photoEntries.forEach(entry => files.push({ name: entry.path, data: entry.bytes }));
    saveBlob(zipStore(files), `${safeName(productName)}-gemini-package.zip`);
    notify('Gemini package download ho gaya: photos, details aur 11 prompts shamil hain.');
  } catch (error) {
    notify(`Package nahi bana: ${error.message || 'dobara koshish karein.'}`);
  }
});
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => { filter = tab.dataset.filter; document.querySelectorAll('.tab').forEach(item => item.classList.toggle('active', item === tab)); renderGallery(); }));

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2500);
}
function imageBlob(job) { const [head, b64] = job.dataUrl.split(','); const mime = head.match(/data:([^;]+)/)[1]; const bytes = atob(b64); const array = new Uint8Array(bytes.length); for (let i = 0; i < bytes.length; i++) array[i] = bytes.charCodeAt(i); return new Blob([array], { type: mime }); }
function extFor(mime = '') { return mime.includes('jpeg') ? 'jpg' : mime.includes('webp') ? 'webp' : 'png'; }
function downloadOne(job) { saveBlob(imageBlob(job), `${safeName($('productName').value)}-${String(job.index + 1).padStart(2, '0')}-${safeName(job.title)}.${extFor(job.mimeType)}`); }
function copyText(text) {
  if (!navigator.clipboard) return notify('Clipboard available nahi. Prompt select karke copy karein.');
  navigator.clipboard.writeText(text).then(() => notify('Prompt copy ho gaya. Gemini mein paste karein.')).catch(() => notify('Prompt copy nahi hua; dobara try karein.'));
}

function crc32(bytes) {
  let crc = -1;
  for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320); }
  return (crc ^ -1) >>> 0;
}
function zipStore(files) {
  const encoder = new TextEncoder(); const local = []; const central = []; let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name); const data = file.data; const crc = crc32(data);
    const lh = new Uint8Array(30 + name.length); const ld = new DataView(lh.buffer); ld.setUint32(0, 0x04034b50, true); ld.setUint16(4, 20, true); ld.setUint32(14, crc, true); ld.setUint32(18, data.length, true); ld.setUint32(22, data.length, true); ld.setUint16(26, name.length, true); lh.set(name, 30);
    local.push(lh, data);
    const ch = new Uint8Array(46 + name.length); const cd = new DataView(ch.buffer); cd.setUint32(0, 0x02014b50, true); cd.setUint16(4, 20, true); cd.setUint16(6, 20, true); cd.setUint32(16, crc, true); cd.setUint32(20, data.length, true); cd.setUint32(24, data.length, true); cd.setUint16(28, name.length, true); cd.setUint32(42, offset, true); ch.set(name, 46); central.push(ch); offset += lh.length + data.length;
  }
  const centralSize = central.reduce((sum, entry) => sum + entry.length, 0); const end = new Uint8Array(22); const ed = new DataView(end.buffer); ed.setUint32(0, 0x06054b50, true); ed.setUint16(8, files.length, true); ed.setUint16(10, files.length, true); ed.setUint32(12, centralSize, true); ed.setUint32(16, offset, true);
  return new Blob([...local, ...central, end], { type: 'application/zip' });
}
$('downloadAll').addEventListener('click', async () => {
  if (!jobs.length) return;
  const base = safeName($('productName').value);
  const prompts = jobs.map(job => `${String(job.index + 1).padStart(2, '0')} — ${job.title}\n${makePrompt(shots[job.index])}`).join('\n\n');
  const promptBytes = new TextEncoder().encode(`eBay Listing Image Studio — ${$('productName').value}\nImages added: ${jobs.filter(job => job.dataUrl).length} of 11\n\n${prompts}`);
  const files = [{ name: 'prompts.txt', data: promptBytes }];
  for (const job of jobs.filter(item => item.dataUrl)) {
    files.push({ name: `${String(job.index + 1).padStart(2, '0')}-${safeName(job.title)}.${extFor(job.mimeType)}`, data: new Uint8Array(await imageBlob(job).arrayBuffer()) });
  }
  saveBlob(zipStore(files), `${base}-listing-set.zip`);
});
updateReady();
