const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('', (req,res) => {
    res.render('Talkative AI Backend')
})

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})