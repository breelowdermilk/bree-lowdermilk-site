#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont
import os

# Show data
shows = [
    ("The Mad Ones", "#8B5CF6", "20180914-7369844b589297f71ea7a3d5f939f3c2_36ffbcf7-4a3c-4ef9-915d-1fddf9639b6f_1024x1024.jpg"),
    ("Henry and Mudge", "#06B6D4", "20130904-Henry-And-Mudge.jpg"),
    ("As You Were", "#84CC16", "20151031-nakedradiologo-small.jpg"),
    ("Republic", "#DC2626", "20130904-Republic.jpg"),
    ("Ada Twist Scientist & Friends", "#F59E0B", "../images/shows/ada-twist-scientist.jpg"),
    ("Justice", "#7C3AED", "../images/shows/justice.jpg"),
    ("Earthrise", "#059669", "../images/shows/earthrise.jpg"),
    ("Dr. Wonderful", "#EC4899", "../images/shows/dr-wonderful.jpg"),
    ("ERNXST, or the Importance of Being", "#EF4444", "../images/shows/ernxst.jpg"),
    ("Tales from the Bad Years", "#6366F1", None),
    ("A Party Worth Crashing", "#10B981", None),
    ("The Freshman Experiment", "#F97316", None),
    ("The Woman Upstairs", "#8B5A2B", None),
]

# Create images
def create_placeholder(title, color, size=(800, 600)):
    # Create image
    img = Image.new('RGB', size, color=color)
    draw = ImageDraw.Draw(img)
    
    # Try to load a font, fall back to default if not available
    try:
        font_size = min(size) // 12
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()
    
    # Get text dimensions
    bbox = draw.textbbox((0, 0), title, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center text
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Draw text with outline for better visibility
    outline_color = "#000000" if color != "#000000" else "#FFFFFF"
    for adj in range(-2, 3):
        for adj2 in range(-2, 3):
            draw.text((x + adj, y + adj2), title, font=font, fill=outline_color)
    
    draw.text((x, y), title, font=font, fill="#FFFFFF")
    
    return img

# Create directories
site_dir = "/Users/breelowdermilk/Development/bree-lowdermilk-site/site"
upload_dir = f"{site_dir}/public/upload/images/albums"
shows_dir = f"{site_dir}/public/images/shows"

os.makedirs(upload_dir, exist_ok=True)
os.makedirs(shows_dir, exist_ok=True)

# Generate images
for title, color, filename in shows:
    if filename:
        if filename.startswith("../"):
            # New shows in images/shows/
            filepath = f"{shows_dir}/{filename.split('/')[-1]}"
        else:
            # Existing shows in upload/images/albums/
            filepath = f"{upload_dir}/{filename}"
        
        if not os.path.exists(filepath):
            print(f"Creating placeholder for: {title}")
            img = create_placeholder(title, color)
            img.save(filepath)
            print(f"Saved: {filepath}")
        else:
            print(f"Image exists: {filepath}")

print("Placeholder image generation complete!")