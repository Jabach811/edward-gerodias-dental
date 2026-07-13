from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "generated"
DEST = ROOT / "assets" / "optimized"
DEST.mkdir(parents=True, exist_ok=True)

for source in sorted(SOURCE.glob("*.png")):
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.width > 2200:
            height = round(image.height * 2200 / image.width)
            image = image.resize((2200, height), Image.Resampling.LANCZOS)
        destination = DEST / f"{source.stem}.webp"
        image.save(destination, "WEBP", quality=84, method=6)
        if destination.stat().st_size < 20_000:
            raise RuntimeError(f"Optimized image is unexpectedly small: {destination}")
        print(f"{source.name} -> {destination.name} ({image.width}x{image.height})")
