const $ = (id) => document.getElementById(id);
const input = $('photoInput');
let photos = [];
let jobs = [];
let filter = 'all';
let toastTimer;

const heroShot = { title: 'Main hero', kind: 'hero', direction: 'Create a clean eBay hero photo: the complete item centered, large and front-facing on a pure white seamless background (#ffffff), evenly lit with a soft natural contact shadow. Product only, no props, badges, text, borders, watermark, collage or added accessories.' };
const modelPoses = [
  { title: 'Model view · Front', pose: 'straight front-facing pose, relaxed arms kept away from the garment' },
  { title: 'Model view · Three-quarter', pose: 'natural front three-quarter pose, shoulders gently turned toward camera' },
  { title: 'Model view · Fit', pose: 'upright neutral pose with a subtle natural stance, showing how the item fits' },
  { title: 'Model view · Alternate pose', pose: 'slight shoulder or body turn with both arms relaxed and the product unobstructed' },
  { title: 'Model view · Catalog alternate', pose: 'a distinct but restrained catalog pose, still facing mostly toward camera' }
];
const secondaryTemplates = {
  clothing: [
    ['Flat lay · Full front', 'Lay one exact shirt front-side up on a pure white surface. Show its complete outline from collar to hem, centered and without hanger, mannequin, props, or text.'],
    ['Front product angle', 'Show one exact shirt alone from a slight front angle on seamless white. Keep collar, sleeves, body, and hem fully visible; no hanger or props.'],
    ['Side silhouette', 'Show the actual shirt alone from a modest side angle on white, preserving its real sleeve and body proportions.'],
    ['Back · Reference only', 'Show the back only if a supplied reference shows it. Otherwise use another front-supported angle. Do not invent a back print, label, or seam.'],
    ['Fabric detail', 'Make a close, sharp photo of actual shirt fabric texture visible in the references. Preserve the true color; invent no weave or print.'],
    ['Collar detail', 'Show a close crop of the real collar and neckline stitching only as supported by the references. No added tag or logo.'],
    ['Sleeve and hem detail', 'Show one visible sleeve hem or bottom hem close-up. Match the actual stitching and fabric color; do not invent construction.'],
    ['Seam detail', 'Create a crisp close catalog view of a real visible seam or stitch line on the shirt, on clean white.'],
    ['Shirt drape', 'Show the shirt laid naturally to reveal its real fabric drape and shape, while keeping the whole garment visible on a white background.'],
    ['Folded product', 'Show one exact shirt neatly folded on a pure white background, with the visible fabric color and neckline accurate. No packaging or props.'],
    ['Sleeve shape', 'Create a product-only view that clearly shows both sleeve shapes and shoulder seams, using a white studio background.'],
    ['Full outline', 'Show the complete shirt front-on, flat and undistorted, with generous white space and no added objects.'],
    ['Bundle color lineup', 'For a bundle, arrange the supplied shirts in one clean side-by-side lineup, every included color distinct and visible exactly once. For a single item, show one full shirt alone. White background, no overlap, text, or collage.'],
    ['Fabric close angle', 'Make a natural close-up of a second visible fabric area, not a fabricated label or graphic. Keep color faithful and background white.'],
    ['Shoulder construction', 'Show the shoulder and sleeve join only where visible in the source photos; keep the real seams and proportions.'],
    ['Alternate flat lay', 'Create a second neat white-background flat lay of the exact shirt, slightly rotated but with the full shirt visible and no styling props.'],
    ['Clean product view', 'Show one exact shirt large and centered against white, with realistic fabric, clean edges, and no extra garment or text.']
  ],
  headwear: [
    ['Front product view', 'Show the exact hat or cap alone facing front on white. Keep the entire brim and crown in frame and preserve its real shape.'],
    ['Side product view', 'Show a true side profile of the exact hat on white, including the full brim tip and crown silhouette.'],
    ['Top crown view', 'Show the actual crown from above on pure white, preserving visible panels and seams only.'],
    ['Back · Reference only', 'Show the rear or closure only if it appears in a supplied photo; otherwise use a front-side view. Do not invent straps or labels.'],
    ['Brim detail', 'Create a crisp close view of the real brim edge and stitching if visible. Keep color and curvature accurate.'],
    ['Crown fabric detail', 'Show a close crop of actual crown fabric and visible panels. Do not add eyelets, logos, or embroidery absent from references.'],
    ['Seam detail', 'Show real visible hat stitching or panel joins on a clean white background; invent no construction.'],
    ['Closure detail', 'Show the closure only if it is visible in a supplied reference. Do not create a buckle, snap, or strap.'],
    ['Interior · Reference only', 'Show the inside label or lining only if clearly present in the references; otherwise use a clean outside detail.'],
    ['Underside · Reference only', 'Show the underside only when the supplied photos support it. Do not invent a brim color or interior pattern.'],
    ['Material close-up', 'Create a sharp close-up of actual hat material with its exact color and texture, no invented pattern.'],
    ['Upright product view', 'Show the hat upright with the crown and full brim visible on seamless white, without a mannequin or accessories.'],
    ['Top-down product view', 'Show the entire hat from above on white, keeping its full outline and brim inside frame.'],
    ['Front three-quarter product', 'Show a front three-quarter product-only view with the real crown depth and brim shape clear.'],
    ['Bundle color lineup', 'For a bundle, arrange the supplied hats side by side with each included piece visible exactly once. For a single item, show one hat alone. Plain white, no overlap or text.'],
    ['Panel detail', 'Show a close catalog view of one real crown panel or seam that is visible in the reference photos.'],
    ['Clean alternate angle', 'Show the exact hat from a different reference-supported angle on white, with full brim and crown visible.']
  ],
  trousers: [
    ['Flat lay · Full front', 'Lay the exact trousers front-side up on pure white. Include the full waistband and both hems, straight and undistorted.'],
    ['Front product view', 'Show the exact trousers alone from the front on white, with the waistband through both hems fully visible.'],
    ['Side silhouette', 'Show a clean side profile of the trousers laid naturally on white. Preserve only source-supported shape and details.'],
    ['Back · Reference only', 'Show the back only if a supplied reference shows it; otherwise use a front-side angle. Invent no rear pockets or seams.'],
    ['Fabric detail', 'Make a close catalog crop of real trouser fabric, matching the visible color and texture without adding a pattern.'],
    ['Waistband detail', 'Show the actual waistband and closure only as visible in the references. Do not add a button, drawstring, or belt loop not shown.'],
    ['Pocket detail', 'Show a real visible pocket close-up only if supported by the supplied photos; add no pocket or stitching.'],
    ['Fly and closure', 'Show the fly or closure only if it is visible in a reference image. Preserve its exact construction.'],
    ['Hem detail', 'Create a close photo of one actual trouser hem and stitching on a white background.'],
    ['Stitching detail', 'Show a visible seam or stitch line in crisp focus; do not invent construction or quality claims.'],
    ['Leg shape', 'Show both trouser legs laid straight and naturally, with their full outline and hems visible.'],
    ['Top-down view', 'Photograph the full pair from directly above on pure white, waistband and hems both in frame.'],
    ['Bundle color lineup', 'For a bundle, show the supplied pairs side by side with each included color distinct and visible exactly once. For a single item, show one pair alone. No overlap or text.'],
    ['Drape and fit detail', 'Show the real fabric drape of one leg without cropping the waistband or hem; keep the background white.'],
    ['Waist and leg proportion', 'Show the whole pair flat and centered so the actual rise, leg width, and length are easy to inspect.'],
    ['Folded product', 'Show the exact trousers neatly folded on white, with one real color and no packaging or props.'],
    ['Clean alternate angle', 'Show one reference-supported angle of the exact pair on white with full garment visible.']
  ],
  general: [
    ['Front product view', 'Show the exact product from the front, large and centered on seamless white.'],
    ['Three-quarter product view', 'Show a front three-quarter product-only view that reveals real depth and shape, on white.'],
    ['Side profile', 'Show a true side profile of the actual item on white; do not invent unseen features.'],
    ['Back · Reference only', 'Show the back only if visible in a supplied reference; otherwise use another supported angle.'],
    ['Material close-up', 'Show one real material or surface detail from the references, sharp and color-accurate.'],
    ['Construction detail', 'Show one visible join, edge, seam, or control only if it appears in the source photos.'],
    ['Scale and shape', 'Show the complete product centered on white with proportions faithful to the references; no scale claims or rulers.'],
    ['Top-down view', 'Photograph the exact product from above on white, full outline visible.'],
    ['Three-quarter close view', 'Create a closer front angle that keeps the complete product recognizable and does not crop important parts.'],
    ['Finish detail', 'Show a real finish or texture detail without adding text or unverified claims.'],
    ['Included contents', 'For a bundle, show only supplied contents, each included piece once. For a single item, show that item alone. White background, no extras.'],
    ['Bundle lineup', 'For a bundle, arrange the actual included pieces neatly side by side. For a single item, make a clean alternate full-product view. No overlap or text.'],
    ['Edge detail', 'Show a real visible edge or contour in close focus, without inventing unseen features.'],
    ['Alternate front view', 'Show a slightly different clean front angle on white, keeping the full actual item visible.'],
    ['Alternate side view', 'Show another useful reference-supported angle with accurate shape and color.'],
    ['Clean studio view', 'Create a sharp, centered, product-only catalog photo on pure white with no styling props.'],
    ['Final alternate angle', 'Create one last honest eBay product angle supported by the source photos, on white.']
  ]
};
let shots = [];
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

function buildShots() {
  const isBundle = $('listingMode').value === 'bundle';
  const quantity = Math.max(2, Number.parseInt($('packQuantity').value, 10) || 5);
  const modelCount = isBundle ? Math.max(1, Math.min(5, quantity, photos.length || 1)) : 1;
  const models = Array.from({ length: modelCount }, (_, index) => ({
    title: isBundle && photos.length > 1 ? `Model view · Item ${index + 1}` : modelPoses[index].title,
    kind: 'secondary', modelIndex: index,
    referenceIndex: isBundle && photos.length > 1 ? index : null,
    pose: modelPoses[index].pose
  }));
  const templates = secondaryTemplates[detectedCategory()] || secondaryTemplates.general;
  const support = templates.slice(0, 17 - modelCount).map(([title, direction]) => ({ title, kind: 'secondary', direction }));
  shots = [heroShot, ...models, ...support];
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
    ? `This listing is one ${quantity}-piece bundle. The hero shows the full set; an item-specific model view shows only its mapped item while remaining truthful to the bundle listing.`
    : variant
      ? `The selected listing variation is ${variant}. Use only that exact variation; do not mix or collage colors.`
      : 'Use only one item/colorway per photo. Never combine color variants.';
  let direction = shot.direction || '';
  if (shot.kind === 'hero' && isBundle) direction = `Show all ${quantity} included pieces together exactly once as a professional eBay bundle hero on a pure white seamless background. Arrange in a neat, slightly staggered catalog lineup; keep every item and true color fully visible with minimal overlap. No props, text, labels, or extra products.`;
  if (shot.modelIndex != null) {
    const ref = shot.referenceIndex == null ? null : photos[shot.referenceIndex];
    const source = ref
      ? `Use uploaded reference photo #${shot.referenceIndex + 1} (${ref.name}) as the sole source for the product worn in this image. This is bundle item #${shot.referenceIndex + 1}; show this exact item and color only. Do not substitute, recolor, combine, duplicate, or borrow details from another uploaded item.`
      : `Use the selected product reference as the sole source for the item worn. Show one item/color only; do not combine variants.`;
    const crop = category === 'headwear'
      ? 'Adult model wearing the exact hat/cap. Tight head-and-shoulders catalog portrait; face, crown, and entire brim are large, clear, and fully inside frame.'
      : category === 'trousers'
        ? 'Adult model wearing the exact trousers. Crop from natural waist through both complete hems/ankles; keep upper body mostly out of frame.'
        : category === 'clothing'
          ? 'Adult model wearing the exact garment. Crop from head to mid-thigh; face and complete garment from collar through bottom hem must be visible.'
          : 'Adult model wearing or naturally holding the exact product in a close catalog portrait; item large and fully visible.';
    direction = `${source} ${crop} Pose: ${shot.pose}.`;
  }
  const background = 'Pure white seamless studio background (#ffffff), soft even light, neutral white balance, crisp realistic e-commerce catalog photography. No lifestyle setting, props, text, watermark, graphics, collage, or extra product.';
  const selectedRule = isBundle && shot.kind === 'secondary' && variant ? ` Focus on exact ${variant} color only.` : '';
  const accuracy = 'Treat uploaded photos as authoritative. Preserve exact product identity, silhouette, colors, materials, visible markings, components, and proportions. Never redesign, embellish, recolor, duplicate, merge, or distort. Follow the requested crop precisely; keep all required parts inside frame. For detail shots, crop only to the specified real detail. Use natural anatomy and hands in model photos. No text, claims, measurements, borders, price tags, or invented construction.';
  return `Create exactly one square 1:1 photorealistic eBay listing photograph. Product: ${name}. ${variantRule} ${extra} Image purpose: ${shot.title}. Image ${shotIndex + 1} of 18. ${background} ${direction} ${selectedRule} ${accuracy}`;
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
  $('progressText').textContent = jobs.length ? `${count} of 18 results added` : 'Waiting for product name';
  $('progressBar').style.width = jobs.length ? `${Math.round(count / 18 * 100)}%` : '0%';
}
function preparePrompts() {
  const name = $('productName').value.trim();
  if (!name) return notify('Pehle product ka naam likhein.');
  buildShots();
  jobs = shots.map((shot, index) => ({ ...shot, index, dataUrl: '', mimeType: '', fileName: '' }));
  filter = 'all'; document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.filter === 'all'));
  renderGallery(); updateProgress(); notify('18 prompts tayyar hain: hero, item-specific model views aur white-background product photos.');
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
    notify('Gemini package download ho gaya: photos, details aur 18 prompts shamil hain.');
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
  const promptBytes = new TextEncoder().encode(`eBay Listing Image Studio — ${$('productName').value}\nImages added: ${jobs.filter(job => job.dataUrl).length} of 18\n\n${prompts}`);
  const files = [{ name: 'prompts.txt', data: promptBytes }];
  for (const job of jobs.filter(item => item.dataUrl)) {
    files.push({ name: `${String(job.index + 1).padStart(2, '0')}-${safeName(job.title)}.${extFor(job.mimeType)}`, data: new Uint8Array(await imageBlob(job).arrayBuffer()) });
  }
  saveBlob(zipStore(files), `${base}-listing-set.zip`);
});
updateReady();

