from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "generated"
DEST = ROOT / "assets" / "optimized"
DEST.mkdir(parents=True, exist_ok=True)

# Images placed with <img srcset> also get smaller widths; CSS background
# images only need the full-size rendition.
RESPONSIVE_WIDTHS = {
    "hero-welcome": (640, 1024),
    "care-chair-detail": (640, 1024),
    "doctor-portrait": (480, 768),
}


def save_webp(image, destination):
    image.save(destination, "WEBP", quality=84, method=6)
    if destination.stat().st_size < 8_000:
        raise RuntimeError(f"Optimized image is unexpectedly small: {destination}")
    print(f"-> {destination.name} ({image.width}x{image.height})")


for source in sorted(SOURCE.glob("*.png")):
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.width > 2200:
            height = round(image.height * 2200 / image.width)
            image = image.resize((2200, height), Image.Resampling.LANCZOS)
        print(source.name)
        save_webp(image, DEST / f"{source.stem}.webp")
        for width in RESPONSIVE_WIDTHS.get(source.stem, ()):
            if width >= image.width:
                continue
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            save_webp(resized, DEST / f"{source.stem}-{width}.webp")
