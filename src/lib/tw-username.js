const generateRandomUsername = () => {
    const DIGITS = 4;
    const randomNumber = Math.round(Math.random() * (10 ** DIGITS));
    const randomId = randomNumber.toString().padStart(DIGITS, '0');
    const randomUsername = `player${randomId}`;
    return randomUsername;
};

export {
    generateRandomUsername
};
