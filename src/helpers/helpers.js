// Helper Functions

/**
 * Return a random number between 2 numbers
 * @param {number} min - Min Number
 * @param {number} max - Max Max Number
 */
export const getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

/**
 * Return a string without special characters and lowered case
 * @param {string} string - String to change
 */
export const clearString = string => {
    return string.replace(/[^\w\s]/gi, '').toLowerCase()
};

/**
 * Return if userAgent is mobile or not
 * @param {string} userAgent - The user's agent
 */
export const isMobile = (userAgent) => {
    const regex =  new RegExp('Android|webOS|iPhone|iPad|' +
                    'BlackBerry|Windows Phone|'  +
                    'Opera Mini|IEMobile|Mobile' , 
                    'i');
    
    return regex.test(userAgent);
};  