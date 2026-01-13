<!-- SwimHub - Image Placeholder Guide
This file documents how to add images to SwimHub.
Delete this file after reading. -->

# Image Setup Instructions

## Recommended Image Sizes & Formats

### Hero Section Image
- **Size**: 1200x800px minimum
- **Format**: WebP (with JPG fallback)
- **File size**: < 150KB
- **Description**: Swimmer in action, dynamic pose
- **File**: images/hero-swimmer.jpg

### Gallery Images (6 required)
- **Size**: 600x400px each
- **Format**: WebP or JPG
- **File size**: < 80KB each
- **Descriptions**:
  1. Freestyle swimmer in pool
  2. Morning swim training
  3. Olympic pool training
  4. Team swimming activity
  5. Open water/beach swimming
  6. Competitive diving

### Technique Section Images
- **Size**: 400x300px
- **Format**: JPG or PNG
- **File size**: < 60KB each
- **Purpose**: Illustrate swimming strokes

### Basic Cards Images
- **Size**: 300x200px
- **Format**: JPG
- **File size**: < 40KB each
- **Topics**:
  1. Water Safety
  2. Breathing Techniques
  3. Body Position
  4. Floating

## Free Image Resources

### Swimming-Themed Stock Photos
- **Unsplash**: https://unsplash.com/search/swimming
- **Pexels**: https://www.pexels.com/search/swimming/
- **Pixabay**: https://pixabay.com/search/swimming/
- **Pixelsquid**: https://www.pixelsquid.com/search?term=swimming

### Popular Search Terms
- "Swimmer in pool"
- "Freestyle swimming"
- "Swimming lessons"
- "Water sports"
- "Aquatic training"
- "Olympic swimming"

## Image Optimization Tips

### Using TinyPNG/TinyJPG
1. Go to https://tinypng.com
2. Drag and drop image
3. Download optimized version
4. Use for web (< 100KB per image)

### Using ImageOptim (Mac)
1. Download ImageOptim
2. Drag images into app
3. Automatically optimized

### Using FileMinimizer (Windows)
1. Download FileMinimizer
2. Select images
3. Compress for web

## Image Formats Guide

### JPEG (.jpg)
- **Best for**: Photographs, complex images
- **Compression**: Lossy (smaller file size)
- **Quality**: 80-85 quality recommended
- **Support**: Universal browser support

### PNG (.png)
- **Best for**: Icons, transparent backgrounds
- **Compression**: Lossless (larger file size)
- **Quality**: Maintains perfect quality
- **Support**: Universal browser support

### WebP (.webp)
- **Best for**: Modern browsers, smaller file size
- **Compression**: Better than JPEG/PNG
- **Quality**: Comparable to JPEG
- **Support**: Chrome, Firefox, Edge (fallback to JPG for Safari)

## Adding Images to SwimHub

### Step 1: Save Image
Place image in `images/` folder with descriptive name:
```
images/hero-swimmer.jpg
images/swim-1.jpg
images/swim-2.jpg
```

### Step 2: Update HTML
Edit `index.html` and replace placeholder paths:

```html
<!-- Hero Section -->
<img src="images/hero-swimmer.jpg" alt="Swimmer in pool" loading="lazy">

<!-- Gallery Items -->
<div class="gallery-item">
    <img src="images/swim-1.jpg" alt="Freestyle swimming" loading="lazy">
    <p>Freestyle Mastery</p>
</div>
```

### Step 3: Add Alt Text
Always include descriptive alt text:
```html
<!-- Good -->
<img src="images/swimmer.jpg" alt="Freestyle swimmer doing front crawl" loading="lazy">

<!-- Bad -->
<img src="images/swimmer.jpg" alt="image" loading="lazy">
```

## Image Naming Convention

Use descriptive, lowercase filenames:

**Good:**
- `hero-swimmer.jpg`
- `freestyle-technique.jpg`
- `pool-training.jpg`
- `breathing-technique.jpg`

**Avoid:**
- `image1.jpg`
- `pic.jpg`
- `IMG_001.jpg`
- `untitled.jpg`

## Responsive Images (Advanced)

For better mobile performance, use responsive images:

```html
<img 
    srcset="images/swimmer-small.jpg 480w,
            images/swimmer-medium.jpg 768w,
            images/swimmer-large.jpg 1200w"
    sizes="(max-width: 480px) 480px,
           (max-width: 768px) 768px,
           1200px"
    src="images/swimmer-large.jpg"
    alt="Swimmer in pool"
    loading="lazy"
>
```

## Checklist

Before publishing:

- [ ] All images optimized (< 100KB each)
- [ ] All images have descriptive alt text
- [ ] Images are at least 1200x800px (hero)
- [ ] Format is JPG or WebP
- [ ] Filename is descriptive
- [ ] No broken image links
- [ ] Loading="lazy" added to all images
- [ ] Images match website color scheme
- [ ] All required image slots filled

## Troubleshooting

### Images not showing?
1. Check file path (case-sensitive)
2. Verify file exists in `images/` folder
3. Check file extension matches
4. Hard refresh browser (Ctrl+Shift+R)

### Images loading slowly?
1. Reduce file size (< 100KB)
2. Use JPG instead of PNG
3. Use WebP format if possible
4. Optimize dimensions

### Images look pixelated?
1. Use higher resolution source
2. Don't upscale small images
3. Use quality JPEG (80+ quality)
4. Use original size or smaller

## Copyright & Licensing

⚠️ **Important**: Ensure you have rights to use images

### Free with Attribution
- Unsplash: No attribution required
- Pexels: No attribution required
- Pixabay: No attribution required (some require it)

### Commercial Use
- Check license before using
- Some free sites require attribution
- Consider purchasing licenses for unique images

## Performance Impact

### Image Statistics
- Average image size: 80KB
- Total for all 6 gallery items: 480KB
- With lazy loading: Only hero loads initially
- First page load: ~150KB
- Full page load: ~500KB

### Loading Performance
- First image (hero): Immediate
- Other images: Load on scroll
- Lazy loading saves ~60% bandwidth
- Mobile-optimized delivery

---

**Tip**: Test your images using Lighthouse audit (DevTools → Lighthouse → Run audit)

**Delete this file after setup!**
