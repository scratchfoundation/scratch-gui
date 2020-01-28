import GoogleAnalytics from 'react-ga';

const GA_ID = (process.env.GA_ID || window.GA_ID);
if (GA_ID) {
    GoogleAnalytics.initialize(GA_ID, {
        debug: (process.env.NODE_ENV !== 'production'),
        titleCase: true,
        sampleRate: (process.env.NODE_ENV === 'production') ? 100 : 0,
        forceSSL: true
    });
}

export default GoogleAnalytics;
