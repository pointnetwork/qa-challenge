import fastify from "fastify"
import {generate} from "randomstring"

const posts = []
const token = generate(16)

const server = fastify()

server.get('/posts', (req, res) => {
    res.status(200).send(posts)
})

server.get('/token', (req, res) => {
    res.status(200).send(token)
})

server.post('/addPost', (req, res) => {
    const authHeader = req.headers.authorization
    if (authHeader !== `Bearer ${token}`) {
        return res.status(401).send("Unauthorized")
    }
    const post = req.body.post
    if (!post || typeof post !== "string") {
        return res.status(400).send("Bad payload")
    }
    posts.push(post)
    res.status(200).send("OK")
})

const port = process.env.PORT ?? 3000

server.listen({port}).then(() => {
    console.log(`Server started on port ${port}`)
})
