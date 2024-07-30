$(document).ready(function() {
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
