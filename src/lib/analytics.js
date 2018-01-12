import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-30688952-5', {
    debug: (process.env.NODE_ENV !== 'production'),
    titleCase: true,
    sampleRate: 100,
    forceSSL: true
});

export default GoogleAnalytics;
