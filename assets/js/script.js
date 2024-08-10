$(document).ready(function() {
    // Generate colors from base colors
    $(document).ready(function() {
        function hexToHSL(hex) {
            let r = 0, g = 0, b = 0;
            if (hex.length === 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            } else if (hex.length === 7) {
                r = parseInt(hex[1] + hex[2], 16);
                g = parseInt(hex[3] + hex[4], 16);
                b = parseInt(hex[5] + hex[6], 16);
            }
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h = 0, s = 0, l = (max + min) / 2;
            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            s = s * 100;
            l = l * 100;
            h = Math.round(h * 360);
            s = Math.round(s);
            l = Math.round(l);
            return { h, s, l };
        }
    
        function setDynamicColors(colorVar, prefix) {
            const hex = $(":root").css(colorVar).trim();
            const { h, s, l } = hexToHSL(hex);
            const hoverL = Math.min(l + 10, 100);
            const contentL = l > 50 ? l - 64 : l + 64;
    
            $(":root").css(`--${prefix}-h`, h);
            $(":root").css(`--${prefix}-s`, `${s}%`);
            $(":root").css(`--${prefix}-l`, `${l}%`);
            $(":root").css(`--${prefix}-hover`, `hsl(${h}, ${s}%, ${hoverL}%)`);
            $(":root").css(`--${prefix}-content`, `hsl(${h}, ${s}%, ${contentL}%)`);
        }
    
        setDynamicColors('--primary', 'primary');
        setDynamicColors('--secondary', 'secondary');
        setDynamicColors('--accent', 'accent');
    });    

    // Component Code Toggle and Copy Code
    $('.component-container').each(function() {
        const $container = $(this);
        const $codeBlock = $container.find('.component-code');
        const $toggleCodeButton = $container.find('.toggle-code');
        const $copyCodeButton = $container.find('.copy-code');

        // Add the component's HTML code to the code block
        const code = $container.find('.component').prop('innerHTML')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        $codeBlock.html(code);

        // Initially hide the code block
        $codeBlock.hide();

        // Toggle code block
        $toggleCodeButton.on('click', function() {
            if ($codeBlock.is(':visible')) {
                $codeBlock.slideUp(300, function() {
                    $toggleCodeButton.text('Show Code');
                    $copyCodeButton.hide();
                });
            } else {
                $codeBlock.slideDown(300, function() {
                    $toggleCodeButton.text('Hide Code');
                    $copyCodeButton.show();
                });
            }
        });

        // Copy code to clipboard
        $copyCodeButton.on('click', function() {
            navigator.clipboard.writeText($codeBlock.text())
                .then(function() {
                    $copyCodeButton.text('Copied!');
                    setTimeout(function() {
                        $copyCodeButton.text('Copy Code');
                    }, 2000);
                });
        });
    });
});
