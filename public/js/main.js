const sentenceList = document.querySelector('#sentenceList')
const randomSentenceButton = document.querySelector('#randomSentenceButton')

const sentences = [
    "I am going to school",
    "I like to listen to music",
    "I do sports activity every day"
]

const vocabulary = (() => {
    let words = []
    for (let sentence of sentences) {
        let wordArray = sentence.toLowerCase().split(' ')
        words = words.concat(wordArray)
    }
    return words
})()

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const makeRandomSentence = async () => {
    let numOfWords = getRandomInt(vocabulary.length)
    while(numOfWords > 0) {
        let wordIndex = getRandomInt(vocabulary.length)
        const newAudio = new Audio("sound_library/" + vocabulary[wordIndex] + '.wav')
        await playAudio(newAudio)
        numOfWords--
    }
}
randomSentenceButton.addEventListener('click', makeRandomSentence)



console.log('VOCABULARY: ', vocabulary)

for (let sentence of sentences) {
    const li = document.createElement('li')
    const p = document.createElement('p')
    const playButton = document.createElement('button')
    playButton.innerHTML = 'Play'
    playButton.addEventListener('click', () => {
        playSentence(sentence)
    })
    p.innerHTML = sentence
    li.appendChild(p)
    li.appendChild(playButton)
    sentenceList.appendChild(li)
}



const playSentence = (sentence) => {

    const sentenceArr = sentence.toLowerCase().split(" ")
    const audioArr = []

    for (const word of sentenceArr) {
        const newAudio = new Audio("sound_library/" + word + '.wav')
        newAudio.addEventListener('ended' , (ev) => {
            console.log('ENDED: ', newAudio)
        })
        audioArr.push(newAudio)
    }

    playAudioArray(audioArr)
}

/**
 * @param {Array} audioArr 
 */
const playAudioArray = async (audioArr) => {
    for(let i=0;i < audioArr.length;i++) {
        await playAudio(audioArr[i])
    }
}

/**
 * @param {HTMLAudioElement} audio 
 */
const playAudio = (audio) => {
    return new Promise(
        (resolve) => {
            audio.addEventListener('ended', ev => {
                const pause = getRandomInt(200)
                setTimeout(()=>{
                    console.log('PAUSING FOR: ', pause)
                    resolve()

                },pause)
            })
            audio.play()
        }    
    )
} 