#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont
import os

# Additional shows that need images
additional_shows = [
    ("Tales from the Bad Years", "#6366F1", "bad-years.jpg"),
    ("A Party Worth Crashing", "#10B981", "party-worth-crashing.jpg"),
    ("The Freshman Experiment", "#F97316", "freshman-experiment.jpg"),
    ("The Woman Upstairs", "#8B5A2B", "woman-upstairs.jpg"),
]

def create_placeholder(title, color, size=(800, 600)):
    img = Image.new('RGB', size, color=color)
    draw = ImageDraw.Draw(img)
    
    try:
        font_size = min(size) // 12
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()
    
    bbox = draw.textbbox((0, 0), title, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    outline_color = "#000000" if color != "#000000" else "#FFFFFF"
    for adj in range(-2, 3):
        for adj2 in range(-2, 3):
            draw.text((x + adj, y + adj2), title, font=font, fill=outline_color)
    
    draw.text((x, y), title, font=font, fill="#FFFFFF")
    
    return img

site_dir = "/Users/breelowdermilk/Development/bree-lowdermilk-site/site"
shows_dir = f"{site_dir}/public/images/shows"

os.makedirs(shows_dir, exist_ok=True)

for title, color, filename in additional_shows:
    filepath = f"{shows_dir}/{filename}"
    
    if not os.path.exists(filepath):
        print(f"Creating placeholder for: {title}")
        img = create_placeholder(title, color)
        img.save(filepath)
        print(f"Saved: {filepath}")
    else:
        print(f"Image exists: {filepath}")

print("Additional placeholder images complete!")