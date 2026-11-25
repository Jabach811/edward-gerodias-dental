set -e
mkdir -p dist/assets/fonts dist/assets/optimized
cp index.html styles.css script.js dist/
cp assets/favicon.svg assets/apple-touch-icon.png assets/share.jpg dist/assets/
cp assets/fonts/plus-jakarta-sans-var.woff2 assets/fonts/LICENSE-PLUS-JAKARTA-SANS.txt dist/assets/fonts/
cp assets/optimized/storefront.webp assets/optimized/storefront-900.webp assets/optimized/doctor-portrait-480.webp assets/optimized/doctor-portrait-768.webp dist/assets/optimized/
