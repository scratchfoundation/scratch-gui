import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-30688952-5', {
    debug: (process.env.NODE_ENV !== 'production'),
    titleCase: true,
    sampleRate: (process.env.NODE_ENV === 'production') ? 100 : 0,
    forceSSL: true
});

export default GoogleAnalytics;
