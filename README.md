# Listing Studio

A local prompt organizer for preparing one eBay hero image and 17 secondary prompts for Gemini's free image-generation experience. It does not call the Gemini API, ask for an API key, or send product photos anywhere. Gemini's free-account limits and access can vary.

## Start

1. Run `Start-Listing-Studio.bat` (Node.js 20 or newer is required).
2. The app opens at `http://127.0.0.1:4173`.
3. Enter the product name and verified details, then choose **Prepare 18 prompts**.
4. Choose **Open free Gemini app**. Attach the real product photos directly in Gemini, then copy each matching prompt from Listing Studio into that same Gemini chat.
5. Download each Gemini result and add it to its matching card. **Download ZIP** bundles the images you've added plus all 18 prompts.

Add up to five photos and choose **Download for Gemini · one ZIP** to bundle `manifest.json`, all 18 prompts, product details, and the selected reference photos. For a multi-item pack, upload one clear photo per included item/color: each uploaded item gets its own model prompt explicitly mapped to that photo and filename. With five item photos, five distinct model prompts are generated. Copy each prompt into Gemini with its matching reference photo, then review every result.

## GitHub Pages

This is a static app and does not need a build step or API key. The included GitHub Actions workflow publishes `index.html`, `app.js`, and `style.css` to GitHub Pages whenever `main` is updated. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once. The app uses relative asset paths so it works from a repository subpath.

After the first successful Pages deployment, open `https://meetrumi.github.io/ebay-listing-studio/` to use the hosted version.

The local photo picker only keeps photos in the browser until you choose **Download for Gemini · one ZIP**. That ZIP includes the photos you selected; upload it to Gemini only when you want to share those references there. Keep one Gemini conversation for the image set so it can refer back to the same item photos. The free Gemini app may limit how many images you can create; the app does not bypass those limits.

## Included image plan

The prepared set contains exactly 18 prompts: one main hero plus 17 secondary images. In bundle mode, one model prompt is created for each uploaded item reference (up to five); the remaining secondary prompts use category-specific product angles and close details. For five products this means five separately mapped model images, one per uploaded photo, plus the full-set hero.

Prompts use a pure white studio background and a coordinated eBay catalog style. Shirts are framed from the model's head to mid-thigh so the face and complete shirt remain visible; hats and caps use a close head-and-shoulders crop with the whole brim in frame; trousers are framed from waist through both hems. Unseen backs and construction details are replaced with reference-supported views rather than invented. In a pack, use one clear uploaded image per included item/color so every model prompt can identify its exact source.

## Review before listing

AI image generation can alter small product details. Compare all results with the real item and remove anything inaccurate before listing. eBay requires images to accurately represent the item and disallows added graphics, text, borders, and watermarks. Use original photos to show condition, damage, labels, and exact contents. See [eBay picture policy](https://www.ebay.com/help/policies/picture-policy/picture-policy?id=4370).

