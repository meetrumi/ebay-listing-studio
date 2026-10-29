# Listing Studio

A local prompt organizer for creating one eBay hero image and ten secondary images with the Gemini app's free image-generation experience. It does not call the Gemini API, ask for an API key, or send product photos anywhere. Gemini's free-account limits and access can vary.

## Start

1. Run `Start-Listing-Studio.bat` (Node.js 20 or newer is required).
2. The app opens at `http://127.0.0.1:4173`.
3. Enter the product name and verified details, then choose **Prepare 11 prompts**.
4. Choose **Open free Gemini app**. Attach the real product photos directly in Gemini, then copy each matching prompt from Listing Studio into that same Gemini chat.
5. Download each Gemini result and add it to its matching card. **Download ZIP** bundles the images you've added plus all 11 prompts.

To move everything into the companion app at once, add up to five photos and choose **Download for Gemini · one ZIP**. The ZIP contains `manifest.json`, all 11 prompts, product details, and the selected reference photos. Import that single ZIP in the companion app, then review the 11 prompts before generating.

## GitHub Pages

This is a static app and does not need a build step or API key. The included GitHub Actions workflow publishes `index.html`, `app.js`, and `style.css` to GitHub Pages whenever `main` is updated. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once. The app uses relative asset paths so it works from a repository subpath.

After the first successful Pages deployment, open `https://meetrumi.github.io/ebay-listing-studio/` to use the hosted version.

The local photo picker only keeps photos in the browser until you choose **Download for Gemini · one ZIP**. That ZIP includes the photos you selected; upload it to Gemini only when you want to share those references there. Keep one Gemini conversation for the image set so it can refer back to the same item photos. The free Gemini app may limit how many images you can create; the app does not bypass those limits.

## Included image plan

1. Main hero on a plain white background
2. Front view
3. Three-quarter view
4. Side profile
5. Back view only when supported by the references, otherwise a safe alternate angle
6. Detail close-up
7. Craft and finish close-up
8. In-use context
9. A second styled context
10. Top-down view
11. Clean alternate angle

## Review before listing

AI image generation can alter small product details. Compare all results with the real item and remove anything inaccurate before listing. eBay requires images to accurately represent the item and disallows added graphics, text, borders, and watermarks. Use original photos to show condition, damage, labels, and exact contents. See [eBay picture policy](https://www.ebay.com/help/policies/picture-policy/picture-policy?id=4370).
