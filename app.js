const $ = (id) => document.getElementById(id);
const input = $('photoInput');
let photos = [];
let jobs = [];
let filter = 'all';
let toastTimer;

const shots = [
  { title: 'Main hero', kind: 'hero', direction: 'Create a clean eBay hero photo: the complete item centered, large and front-facing on a pure white seamless background (#ffffff), evenly lit with a soft natural contact shadow. Product only, no props, badges, text, borders, watermark, collage or added accessories.' },
  { title: 'Front view', kind: 'secondary', direction: 'Show the actual product from a clear front angle as a clean eBay catalog photograph. Use a plain white or very light gray seamless studio background, soft even light, accurate natural color, and a centered close crop that makes the product easy to inspect. No room scene or styling props.' },
  { title: 'Three-quarter view', kind: 'secondary', direction: 'Show the actual product from a front three-quarter angle that reveals its real depth and shape. Keep the whole product in frame, large and centered, on a plain bright studio background with soft even catalog lighting.' },
  { title: 'Side profile', kind: 'secondary', direction: 'Show a true side-profile catalog view of the actual product so its real thickness, silhouette, and construction are clear. Use a plain white or light gray studio background. Do not invent or expose unseen features.' },
  { title: 'Back view', kind: 'secondary', direction: 'Show the back only when that exact back is visible in the reference photos. If it is not shown, use a front three-quarter angle supported by the references instead. Keep the product large, centered, and on a plain bright studio background.' },
  { title: 'Detail close-up', kind: 'secondary', direction: 'Make a sharp, tightly framed catalog close-up of one real material or feature clearly visible in the reference photos. Match its actual color and texture. Do not invent labels, markings, controls, seams, or construction.' },
  { title: 'Craft and finish', kind: 'secondary', direction: 'Create a sharp catalog detail of real stitching, edges, joins, or finishing that can actually be seen in the supplied photos. Use soft neutral studio light and a simple light background. Do not suggest unseen quality claims or add details.' },
  { title: 'In-use context', kind: 'secondary', direction: 'Show the actual product being worn or used in a simple, believable catalog pose suited to its category. Keep the product as the clear focal point against a clean light studio background. Do not add props, accessories, or parts that could be mistaken as included.' },
  { title: 'Alternate catalog view', kind: 'secondary', direction: 'Create a second useful catalog image with a different natural pose or product angle, while keeping the same clean bright studio look. Keep styling minimal and the actual product fully recognizable; no room décor, extra items, text, or unverified functions.' },
  { title: 'Top-down view', kind: 'secondary', direction: 'Show the actual product neatly from above on a plain white or very light gray surface. Keep its full outline visible, centered, and large in the square frame. Include no styling props or accessories.' },
  { title: 'Clean alternate angle', kind: 'secondary', direction: 'Create one more clean eBay catalog photo from a genuinely different, reference-supported angle or natural pose. Keep the product large and clear on the same plain bright studio background, with realistic color and no decorative scene.' }
];
const apparelDirections = [
  'Show one exact shirt from the reference worn by one adult male model in a straightforward front-facing e-commerce catalog portrait. Crop from the top of the head to mid-thigh so the model face and the complete shirt from neckline to hem are both visible; the shirt should occupy most of the frame. Use a pure white seamless studio background, soft even light, a relaxed neutral pose, and plain dark neutral jeans. No jacket, layers, props, logos, text, or full-body distance framing.',
  'Show the same exact shirt on one adult male model in a natural front three-quarter pose. Crop from head to mid-thigh; keep the complete shirt, sleeves, and hem unobstructed and large in frame. Use a plain white seamless e-commerce studio background and soft even light. Keep the fit and shirt shape natural; no jacket, props, or text.',
  'Show one adult male model wearing the exact shirt in a modest side three-quarter pose, not an extreme profile that hides the front. Frame from head to mid-thigh so the entire shirt from collar to hem remains visible. Plain white studio background, soft balanced catalog light, neutral jeans, relaxed arms, no props or text.',
  'Show the rear of the exact shirt on a model only if a rear reference photo was supplied. If no rear reference exists, make a different front three-quarter view instead. Keep the model framed head to mid-thigh, the full shirt visible, and the background pure white; never invent a back print, label, seam, or other unseen detail.',
  'Create a close e-commerce detail photo of the real shirt fabric and collar area using the supplied shirt photos as the only source of truth. Show believable cotton texture and neckline stitching only as supported by the references; do not add a tag, logo, print, buttons, or invented weave. Bright neutral studio light, no text.',
  'Create a close catalog photo of a visible sleeve hem or shirt seam from the supplied references. Keep the real fabric color and stitching faithful, with crisp focus and soft neutral-white studio light. Do not invent construction details, labels, or quality claims.',
  'Show the exact shirt on one adult male model in a natural relaxed catalog pose, with hands resting naturally and not covering the garment. Crop from head to mid-thigh so the full shirt is the main subject. Use the same bright white studio background and soft professional e-commerce lighting; no park, room, props, extra layers, or text.',
  'Create a second model catalog portrait with a subtle pose variation, such as a slight shoulder turn or one hand resting at the hip without covering the shirt. Keep the face and complete shirt visible from head to mid-thigh, with plain neutral jeans and a pure white seamless studio background. The shirt must remain the largest visual focus; no accessories, props, or text.',
  'Show one exact shirt laid flat, front side up, as a clean eBay secondary product photo. Include the entire garment from collar to hem, centered on a pure white surface with soft natural contact shadow. Preserve the actual outline, sleeves, color, and visible stitching; no hanger, mannequin, styling props, text, or extra shirts.',
  'Create a final clean model catalog image of the same exact shirt from a distinct but natural front angle. Use one adult male model, crop from head to mid-thigh, show the complete shirt without folds or arms hiding it, and keep the plain white studio background and neutral jeans consistent with the other model images. No lifestyle scenery, props, layers, logos, or text.'
];
const headwearDirections = [
  'Create a straightforward front-facing e-commerce portrait of one adult model wearing the exact cap or hat from the references. Crop from upper chest to just above the head; the full crown and brim and the model face must be large, unobstructed, and sharply focused. Use a pure white seamless studio background and soft even light. No full body, props, eyewear, extra accessories, text, or cropped brim.',
  'Show the exact cap or hat on one adult model in a natural front three-quarter head-and-shoulders portrait. Keep the complete crown and brim and most of the face visible; the hat should occupy the top third prominently. Pure white studio background, soft even light, no props or extra accessories.',
  'Show a true side-profile head-and-shoulders portrait of one model wearing the exact hat. Keep the whole hat, including the brim tip, inside the frame and make the real crown profile and fit clear. Plain white studio background, clean e-commerce lighting, no props or text.',
  'Show the back or closure of the exact hat on the model only if that area is visible in a supplied reference photo. Otherwise use a front three-quarter portrait. Keep the face and entire hat in a close head-and-shoulders crop on pure white; do not invent a strap, buckle, opening, logo, or unseen construction.',
  'Make a tight product-detail photo of the actual crown fabric, panels, eyelets, or visible logo only where those details can be seen in the references. Preserve exact color and construction; do not add embroidery, labels, or markings. Use bright neutral studio light and no text.',
  'Create a sharp close-up of a real brim edge, seam, stitching, or closure that is visible in the supplied photos. Show only the supported detail, in accurate color, against a simple bright neutral background. Do not invent interior or rear features.',
  'Create a polished model catalog portrait with one adult wearing the exact hat, framed from shoulders upward. Keep the face and full hat prominent and unobstructed; use a plain bright studio background and natural expression. Avoid outdoor scenery, hair or hands covering the hat, props, and extra accessories.',
  'Show the exact hat on one adult model from a slightly lower camera angle so the front brim and crown shape are easy to see. Crop shoulders upward, include the complete hat and face, and use a clean white studio with soft even light. Keep the hat as the focal point; no props or text.',
  'Show the exact hat alone, front side facing up, in a clean eBay product photo on a pure white surface. Keep the complete brim and crown visible, centered, and large; preserve its true shape and color. No mannequin head, props, text, or invented details.',
  'Create one final close model portrait from a distinct natural head turn, still showing the full exact hat and visible face. Crop at the shoulders, keep the hat large and sharply focused, and use the same plain white studio look. Do not crop the brim or add accessories.'
];
const trousersDirections = [
  'Show one adult model wearing the exact trousers in a straight front-facing e-commerce catalog photo. Crop from the natural waist to just below both hems, keeping the waistband and complete legs visible and large in frame. Use a plain white seamless studio background, soft even light, and a simple neutral shirt tucked or ending above the waistband. No props, text, or full-body distance shot.',
  'Show the same exact trousers on one model in a natural front three-quarter stance. Frame from waist to just below the hems so the full waistband, leg shape, and both hems remain in view. Plain white background, soft catalog lighting, simple neutral top, no props or text.',
  'Show a true side-profile view of the model wearing the exact trousers. Crop from waist to just below the hems; keep the full side silhouette and leg shape visible. Preserve only reference-supported pockets, seams, color, and cut. Plain bright studio background, no props or text.',
  'Show the back of the exact trousers on a model only if the rear details are visible in a supplied reference. Otherwise use a front-side three-quarter pose. Crop waist to below hems, and do not invent pockets, yoke seams, labels, or other unseen details. Plain white studio.',
  'Create a tight e-commerce detail photo of the real trouser fabric from the supplied images. Preserve the actual color and visible texture; do not invent a weave, pattern, or material claim. Use crisp focus and bright neutral studio lighting.',
  'Create a close catalog photo of a real waistband, pocket, fly, seam, or hem detail only if that exact detail appears in the references. Keep it sharp and color-accurate against a clean light background. Do not add hardware or stitching that is not shown.',
  'Show the exact trousers on one adult model in a relaxed neutral standing pose. Crop from waist to just below both hems; keep the complete garment unobstructed, with hands away from pockets and seams. Plain white studio and soft even light, no props or text.',
  'Create a second clear model catalog pose with a small natural shift in stance to show how the exact trousers fall at the waist and legs. Frame the waistband through the complete hems, close and centered on a bright white seamless background. Use a plain neutral top; no jacket, props, or text.',
  'Show the exact trousers alone, front side up, laid neatly flat on a pure white surface. Include the whole garment with waistband and both hems fully in frame, keeping the legs straight and natural. No hanger, props, accessories, or text.',
  'Create one final reference-supported three-quarter model view of the exact trousers, cropped waist to below hems. Keep the whole garment large, the legs unobstructed, the fit natural, and the studio background plain white. No scenery, props, extra layers, or text.'
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
    ? `This is image ${shotIndex + 1} in a coordinated set of eBay listing photos. Use polished, realistic marketplace catalog photography: a plain bright white or very light gray studio background, soft even lighting, neutral color balance, and a close product-first composition. Follow the specific camera angle and crop in the shot direction exactly; do not switch to a decorative room, outdoor scene, editorial fashion campaign, product collage, floating cutout, or distant full-body view. ${isBundle ? `For this secondary view of a ${quantity}-piece bundle, show only the specific included piece(s) requested by this shot; never imply that extra pieces are included.` : ''}`
    : '';
  const direction = bundleDirection || headwear || trousers || apparel || shot.direction;
  const selectedBundleColorRule = isBundle && shot.kind === 'secondary'
    ? variant
      ? `When this view focuses on one piece, use only the exact ${variant} colorway from the references; do not blend it with other colors.`
      : 'When this view focuses on one piece, choose one actual colorway exactly as shown in the references; do not blend colors or invent a new shade.'
    : '';
  const selectedBundleColorText = selectedBundleColorRule ? ` ${selectedBundleColorRule}` : '';
  const framingRule = shot.kind === 'hero'
    ? 'Center the item, keep it fully visible, use natural product photography, and make it sharp enough for an eBay listing.'
    : `Keep product identity, silhouette, colors, materials, visible markings, components, and proportions faithful to the correct reference. Do not redesign, embellish, repair, recolor, duplicate, merge, or distort the product. Follow the requested crop: do not crop off a required garment hem, trouser waistband/hem, or hat brim/crown; for a detail shot, fill the frame with only the requested real detail. Use realistic anatomy and natural hands on model photos. No text, typography, claims, measurements, graphic overlays, frames, watermarks, price tags, extra products, or collages. Make the requested product or detail sharp and large enough to inspect in an eBay listing.`;
  return `Create exactly one square 1:1 photorealistic eBay listing photograph. The uploaded photos are real reference photos of the item. Treat them as authoritative. Product: ${name}. ${variantRule}${selectedBundleColorText} ${extra} Image purpose: ${shot.title}. ${secondaryRule} ${direction} ${framingRule}`;
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

