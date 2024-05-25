import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { receipeRoutes } from './modules/recipe/recipe.router'
import { userRoutes } from './modules/user/user.route'
const app:Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/recipes',receipeRoutes)
app.use('/api/users',userRoutes)
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app;