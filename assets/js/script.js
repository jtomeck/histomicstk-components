$(document).ready(function() { 

    // Component Code Toggle and Copy Code
    $('.component-container').each(function() {
        const $container = $(this);
        const $codeBlock = $container.find('.component-code');
        const $toggleCodeButton = $container.find('.toggle-code');
        const $copyCodeButton = $container.find('.copy-code');

        // Add the component's HTML code to the code block, excluding elements with #ignoreWrapper and #ignoreElement
        const $clonedComponent = $container.find('.component').clone();

        // Remove elements with #ignoreElement entirely
        $clonedComponent.find('#ignoreElement').remove();

        // Recursively process all #ignoreWrapper elements, handling nested ones first
        while ($clonedComponent.find('#ignoreWrapper').length) {
            $clonedComponent.find('#ignoreWrapper').each(function() {
                $(this).replaceWith($(this).html()); // Replaces the wrapper with its contents
            });
        }

        // Extract the remaining HTML
        let code = $clonedComponent.prop('innerHTML');

        // Function to normalize indentation
        function normalizeIndentation(html) {
            const lines = html.split('\n');
            let minIndentation = null;

            // Find the minimum indentation of non-empty lines
            lines.forEach(line => {
                const match = line.match(/^\s+/);
                if (match && line.trim()) {
                    const indentation = match[0].length;
                    if (minIndentation === null || indentation < minIndentation) {
                        minIndentation = indentation;
                    }
                }
            });

            // Remove the minimum indentation from all lines
            if (minIndentation !== null) {
                return lines.map(line => line.startsWith(' '.repeat(minIndentation)) ? line.slice(minIndentation) : line).join('\n');
            }

            return html; // If no indentation was found, return original HTML
        }

        // Normalize indentation
        code = normalizeIndentation(code);

        // Replace angle brackets for display in the code block
        code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
