from PIL import Image
img = Image.open('C:\\Users\\Admin\\Downloads\\stark-studio\\stark-studio-main-2zip\\public\\cursors\\custom-cursor.webp')
# Resize to 32x32 for a smaller cursor
img = img.resize((32, 32), Image.LANCZOS)
img.save('C:\\Users\\Admin\\Downloads\\stark-studio\\stark-studio-main-2zip\\public\\cursors\\custom-cursor.webp')
print(f'Resized to: {img.size}')