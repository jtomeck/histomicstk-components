document.addEventListener('DOMContentLoaded', function () {
    const components = document.querySelectorAll('.component-container');

    components.forEach(container => {
        const component = container.querySelector('.component');
        const codeBlock = container.querySelector('.component-code');
        const toggleButton = container.querySelector('.toggle-code');
        const copyButton = container.querySelector('.copy-code');

        if (component && codeBlock && toggleButton && copyButton) {
            // Generate the code version of the component
            const code = component.outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            codeBlock.innerHTML = code;

            // Toggle between component and code view
            toggleButton.addEventListener('click', () => {
                const isCodeVisible = !codeBlock.classList.contains('hidden');
                codeBlock.classList.toggle('hidden', isCodeVisible);
                component.classList.toggle('hidden', !isCodeVisible);
                copyButton.classList.toggle('hidden', isCodeVisible);
                toggleButton.textContent = isCodeVisible ? 'Show Code' : 'Show Component';
            });

            // Copy code to clipboard
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(codeBlock.innerText);
                alert('Code copied to clipboard');
            });
        } else {
            console.log('One or more elements are missing in container:', container);
        }
    });
});
