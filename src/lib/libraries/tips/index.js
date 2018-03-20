import danceImage from './lets-dance.png';
import musicImage from './make-music.png';
import nameImage from './animate-a-name.png';

export default [
    {
        name: 'Make Music',
        externalURL: 'https://resources.scratch.mit.edu/www/cards/en/nameCards.pdf',
        videoURL: 'https://player.vimeo.com/video/163472795?title=0&byline=0&portrait=0;hd_off=0&',
        iconURL: musicImage,
        description: 'Choose instruments, add sounds, and press keys to play music.',
        featured: true
    },
    {
        name: "Let's Dance",
        externalURL: 'https://resources.scratch.mit.edu/www/cards/en/danceCards.pdf',
        videoURL: 'https://player.vimeo.com/video/124055657?title=0&byline=0&portrait=0;hd_off=0&',
        iconURL: danceImage,
        description: 'Design an animated dance scene with music and dance moves.',
        featured: true
    },
    {
        name: 'Animate a Name',
        externalURL: 'https://resources.scratch.mit.edu/www/cards/en/nameCards.pdf',
        videoURL: 'https://player.vimeo.com/video/111342687?title=0&byline=0&portrait=0;hd_off=0&',
        iconURL: nameImage,
        description: 'Animate the letters of your username, initials, or favorite word.',
        featured: true
    }
];
