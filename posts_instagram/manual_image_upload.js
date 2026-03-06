document.addEventListener('DOMContentLoaded', () => {
    // Apply drop/paste visual handlers to all slides after they are generated

    // Create an invisible file input for clicking
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    let currentTargetSlide = null;

    // Handle file input selection
    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0] && currentTargetSlide) {
            applyImageToSlide(e.target.files[0], currentTargetSlide);
        }
        // Reset input so the same file can be selected again if needed
        fileInput.value = '';
        currentTargetSlide = null;
    });

    // We need to attach events to slides, but they are generated dynamically
    // So we use event delegation on the document body

    // 1. Click to upload
    document.addEventListener('click', (e) => {
        // Find if we clicked on a slide or inside a slide
        const slide = e.target.closest('.post-capture-area');
        if (slide) {
            // Only trigger if holding Shift key to avoid triggering on normal clicks
            // or if the user clicks directly on the background image part (not text)
            if (e.shiftKey) {
                currentTargetSlide = slide;
                fileInput.click();
            }
        }
    });

    // Add a small tooltip to let users know how to use it
    const addTooltip = () => {
        const tooltip = document.createElement('div');
        tooltip.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px 15px; border-radius: 8px; z-index: 10000; font-family: 'Inter', sans-serif; font-size: 12px; pointer-events: none; border: 1px solid #333; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                <strong>Custom Image Override:</strong><br>
                • <strong>Drop</strong> any image directly onto a slide<br>
                • <strong>Paste (Ctrl+V)</strong> an image onto a slide<br>
                • <strong>Shift+Click</strong> a slide to browse for an image
            </div>
        `;
        document.body.appendChild(tooltip);
    }

    // Add tooltip after a short delay
    setTimeout(addTooltip, 1000);

    // 2. Drag and Drop
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        const slide = e.target.closest('.post-capture-area');
        if (slide) {
            slide.style.boxShadow = 'inset 0 0 0 50px rgba(18, 200, 122, 0.4)';
            e.dataTransfer.dropEffect = 'copy';
        }
    });

    document.addEventListener('dragleave', (e) => {
        e.preventDefault();
        const slide = e.target.closest('.post-capture-area');
        if (slide) {
            slide.style.boxShadow = 'none';
        }
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        const slide = e.target.closest('.post-capture-area');
        if (slide) {
            slide.style.boxShadow = 'none';
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                applyImageToSlide(e.dataTransfer.files[0], slide);
            }
        }
    });

    // 3. Paste from clipboard
    document.addEventListener('paste', (e) => {
        // Find which slide we're currently hovering over
        const hoveredElements = document.querySelectorAll(':hover');
        let slide = null;
        for (let i = hoveredElements.length - 1; i >= 0; i--) {
            if (hoveredElements[i].classList.contains('post-capture-area')) {
                slide = hoveredElements[i];
                break;
            }
        }

        if (slide && e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
            e.preventDefault();
            applyImageToSlide(e.clipboardData.files[0], slide);
        }
    });

    // Helper function to apply the file to the slide
    function applyImageToSlide(file, slide) {
        if (!file.type.match('image.*')) {
            alert('Por favor, selecione apenas arquivos de imagem.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;

            // Ensure slide structure hasn't changed. We're looking for .carousel-image-bg
            let imgEl = slide.querySelector('.carousel-image-bg');
            if (imgEl) {
                imgEl.src = dataUrl;
                // Add a small visual indicator that it worked
                slide.style.transition = 'transform 0.2s ease';
                slide.style.transform = 'scale(0.98)';
                setTimeout(() => { slide.style.transform = 'scale(1)'; }, 200);
            } else {
                console.error("Could not find .carousel-image-bg inside the slide.");
            }
        };
        reader.readAsDataURL(file);
    }
});
