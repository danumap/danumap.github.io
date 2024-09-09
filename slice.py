from PIL import Image
import os

def resize_and_slice_image(image_path, output_folder, tile_size=512, min_size=1024, max_size=8192):
    # Ensure output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open the original image
    img = Image.open(image_path)

    current_size = min_size
    zoom_level = 0

    while current_size <= max_size:
        resized_img = img.resize((current_size, current_size), Image.LANCZOS)

        num_tiles = current_size // tile_size
        
        for y in range(num_tiles):
            for x in range(num_tiles):
                left = x * tile_size
                top = y * tile_size
                right = left + tile_size
                bottom = top + tile_size

                if right > current_size:
                    right = current_size
                if bottom > current_size:
                    bottom = current_size

                tile = resized_img.crop((left, top, right, bottom))
                tile_filename = f"{x}_{y}.png"  # Incorrect format for Leaflet, will fix

                # Create the correct folder structure: z/x
                zoom_folder = os.path.join(output_folder, str(zoom_level))
                x_folder = os.path.join(zoom_folder, str(x))
                
                if not os.path.exists(x_folder):
                    os.makedirs(x_folder)

                # Save the tile in the x folder with the correct name
                tile_path = os.path.join(x_folder, f"{y}.png")  # Correct name format: y.png

                try:
                    tile.save(tile_path, format="PNG", optimize=True)
                except Exception as e:
                    print(f"Error saving tile {tile_path}: {e}")

        # Prepare for the next zoom level
        current_size *= 2
        zoom_level += 1

# Usage
resize_and_slice_image('public/ancien.png', 'public/ancien/')
