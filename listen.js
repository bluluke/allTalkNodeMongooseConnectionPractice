const app = require("./server")

const { PORT = 9000 } = process.env;

app.listen(PORT, () => {
    console.log('Server started on port 9000')
})