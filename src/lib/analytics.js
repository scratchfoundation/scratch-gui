// This was originally a thin wrapper around `react-ga`, which only supports UA.
// We now use GTM, so we could use `react-gtm-module`, but it doesn't support GTM environments (GTM_ENV_AUTH).
// So we use the GTM snippets directly.

const GTM_ID = (process.env.GTM_ID || window.GTM_ID);
const GTM_ENV_AUTH = (process.env.GTM_ENV_AUTH || window.GTM_ENV_AUTH || '');

/**
 * Build the HTML snippets to load GTM.
 * Call this ONLY if GTM_ID is a valid Tag Manager ID. GTM_ENV_AUTH should be valid or an empty string.
 * The content of the snippets is taken from the GTM web interface. We should check there periodically for changes.
 * @returns {object} an object the GTM snippets.
 * @property {string} script The snippet to load GTM when JavaScript is enabled. Add this to the <head> element.
 * @property {string} noscript The snippet to load GTM when JavaScript is disabled. Add this to the <body> element.
 */
const makeGtmSnippets = () => ({
    script:
        `<!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${GTM_ENV_AUTH}';
            f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
        </script>
        <!-- End Google Tag Manager -->`,
    noscript:
        `<!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}${GTM_ENV_AUTH}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->`
});

if (GTM_ID) {
    // load GTM
    const snippets = makeGtmSnippets();

    const noscript = document.createElement('noscript');
    noscript.innerHTML = snippets.noscript;

    const script = document.createElement('script');
    script.innerHTML = snippets.script;

    document.head.insertBefore(script, document.head.firstChild);
    document.body.insertBefore(noscript, document.body.firstChild);
}

/**
 * Report analytics to GA4 using an interface similar to the 'react-ga' module we were using for UA.
 */
const GA4 = {
    event: ({category, action, label}) => {
        window.dataLayer = window.dataLayer || [];
        // There is no perfect mapping from UA to GA4
        // See https://support.google.com/analytics/answer/11091025
        window.dataLayer.push({
            event: category,
            action,
            label
        });
    }
};

export default GA4;
