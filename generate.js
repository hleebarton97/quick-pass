const getRandomValues = require('get-random-values');
module.exports = {
    /**
     * Return JSON object containing the three
     * psuedo-random cryptographic strings.
     * 
     * @param {Number} size
     */
    JSONFormattedPsuedoRandomCryptoUint8Strings: function(size) {
        // Generate strings
        let hex_string = this.stringOfHexChars(this.psuedoRandomCryptoUint8Array(size));
        let ascii_string = this.stringOfAsciiChars(this.psuedoRandomCryptoUint8Array(size));
        let alphaNum_string = this.stringOfAlphaNumChars(this.psuedoRandomCryptoUint8Array(size));
        // Create object of all three strings
        let obj = {
            hex: hex_string,
            ascii: ascii_string,
            alphaNum: alphaNum_string,
        };
        // Format object in JSON
        let json = JSON.stringify(obj);

        return json;
    },
    /**
     * Generate an array of psuedo random cryptographic
     * values based on a specific size. The returned array
     * is half the size specified.
     * 
     * @param {Number} size
     */
    psuedoRandomCryptoUint8Array: function(size) {
        let array = new Uint8Array(size); // Generate array
        getRandomValues(array); // Generate random values cryptographically
        // Randomly select half of the values (not same position)
        let selection = []; // Init array of selected positions
        let values = []; // Values at position selected
        let pos; // Init position variable
        for(let i = 0; i < array.length / 2; i++) {
            do { // Get random position
                pos = Math.floor(Math.random() * array.length); // 0 to full array length
            } while(selection.includes(pos)); // Generate until not repeated in selection array

            selection.push(pos); // Add to selected values
            values.push(array[pos]); // Value of at position
        }

        return values;
    },

    /**
     * Generate a psuedo random cryptographically secure
     * string of alpha-numeric characters based on each decimal 
     * value contained in an array.
     * Ranges: (0-9, a-z, A-Z)
     * 
     * @param {Array} values 
     */
    stringOfAlphaNumChars(values) {
        let char_array = this.arrayOfAlphaNumChars(values); // Get array of ascii characters
        // Create string from new character array
        let secure_string = ''; // Init secure string of hex chars
        for(const alpha_num of char_array) { // Parse each hex value
            secure_string += alpha_num;
        }
        return secure_string.substring(0, values.length);
    },

    /**
     * Generate an array of alpha-numeric values based
     * on an array of decimal values.
     * 
     * @param {Array} values 
     */
    arrayOfAlphaNumChars(values) {
        let char_array = []; // Init array of alpha-numeric characters

        do {
            for(const value of values) {
                // Check that the value is within (0-9, a-z, A-Z) value range
                if(value > 47 && value < 58 || value > 64 && value < 91 || value > 96 && value < 123) {
                    let ascii_char = String.fromCharCode(value); // Convert to ascii character
                    char_array.push(ascii_char); // Add character to array
                }
            }
            values = this.psuedoRandomCryptoUint8Array(values.length * 2); // Generate more values
        } while(char_array.length < values.length); // Check that we have generated enough alpha-numeric values
        return char_array;
    },

    /**
     * Generate a psuedo random cryptographically secure
     * string of ascii characters based on each decimal 
     * value contained in an array.
     * 
     * @param {Array} values 
     */
    stringOfAsciiChars(values) {
        let char_array = this.arrayOfAsciiChars(values); // Get array of ascii characters
        // Create string from new character array
        let secure_string = ''; // Init secure string of hex chars
        for(const ascii of char_array) { // Parse each hex value
            secure_string += ascii;
        }
        return secure_string.substring(0, values.length);
    },

    /**
     * Generate an array of ascii values based
     * on an array of decimal values.
     * 
     * @param {Array} values 
     */
    arrayOfAsciiChars(values) {
        let char_array = []; // Init array of characters

        do {
            for(const value of values) {
                if(value > 32 && value < 127) { // Check that the value is within ASCII value range
                    let ascii_char = String.fromCharCode(value); // Convert to ascii character
                    char_array.push(ascii_char); // Add character to array
                }
            }
            values = this.psuedoRandomCryptoUint8Array(values.length * 2); // Generate more values
        } while(char_array.length < values.length); // Check that we have generated enough ascii values
        return char_array;
    },

    /**
     * Generate a psuedo random cryptographically secure
     * string of hex characters based on each decimal 
     * value contained in an array.
     * 
     * @param {Array} values 
     */
    stringOfHexChars(values) {
        let char_array = this.arrayOfHexChars(values); // Get array of hex characters
        // Create string from new character array
        let secure_string = ''; // Init secure string of hex chars
        for(const hex of char_array) { // Parse each hex value
            secure_string += hex;
        }
        return secure_string.substring(0, values.length);
    },

    /**
     * Generate an array of hexadecimal values based
     * on an array of decimal values.
     * 
     * @param {Array} values 
     */
    arrayOfHexChars(values) {
        let char_array = []; // Init array of characters
        for(const value of values) { // Parse array of decimal values
            let hex_string = value.toString(16).toUpperCase(); // Convert to hex
            char_array.push(hex_string); // Add string to array
        }
        return char_array;
    }
};