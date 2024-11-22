const express = require('express');
const Hanzi = require('hanzi');
const app = express();
const pinyin = require('pinyin'); // Import a library that can handle full phrase Pinyin conversion

// Initialize Hanzi library
Hanzi.start();

// Middleware to handle JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API endpoint to analyze characters
app.post('/analyze', (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).send({ error: 'No word provided' });
    }
    // const pinyinSentence = pinyin(word, {
    //     style: pinyin.STYLE_TONE2, // This applies tone marks (e.g., ni3 hao3)
    //     heteronym: false, // Don't use heteronyms
    // }).map(item => item[0]).join(' '); // Join the pinyin for the whole sentence
    // Split the word into characters and analyze each character
    const analysis = word.split('').map((char) => {
        const decomposition = Hanzi.decompose(char);
        // const getDetails = Hanzi.getDetails(char);
        // const getRadicals = Hanzi.getRadicals(char);
        // const getComponents = Hanzi.getComponents(char);
        // const getPinyin = pinyin(char, {
        //     style: pinyin.STYLE_TONE,  // This will return pinyin with tone numbers
        //     heteronym: false, // Don't return multiple pinyin variations for a character
        // });
        //  const getCharacter = Hanzi.getCharacterFrequency(char);
        //  console.log(getCharacter)
        //  const getPhoneticSet = Hanzi.getPhoneticSet(char);
        //  console.log(getPhoneticSet);
        //  const getPinyin = Hanzi.getPinyin(char);
        //  console.log(getPinyin);
     
         // Get pinyin for each character
        // const getPinyin = pinyin(char, {
        //     style: pinyin.STYLE_TONE,  // This will return pinyin with tone numbers, e.g., Nǐ
        //     heteronym: false, // Don't return multiple pinyin variations for a character
        // });
        
        // const getPinyin = pinyin(char,{
        //     style: pinyin.STYLE_TONE,
        //     heteronym: false,
        // })
        //  console.log("Pinyin: ", getPinyin);  // For debugging
        // console.log(pinyin("中心"));
        console.log(pinyin);

        // Get Pinyin for the entire sentence or word
        const combinedComponents = [
            ...(decomposition.components1 || []),
            ...(decomposition.components2 || []),
            ...(decomposition.components3 || [])
        ];
        console.log(`Decomposition for ${char}:`, decomposition); // Log decomposition data for debugging
        // console.log(`Decomposition for ${char}:`, decomposition.components)
        // const details = Hanzi.getDetails(char);
        return {
            character: char,
            radical: decomposition.radical || 'N/A', // Extract radical
            components: combinedComponents.length > 0 ? combinedComponents : ['No components available'],
            //  pinyin: getPinyin.join(' ')
            // pinyin: getPinyin[0] // Get the first pinyin form (e.g., "Nǐ")
        };
    });
    res.send({ analysis });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
