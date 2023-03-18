import { setupApp } from './config/app'
import dotenv from 'dotenv'

dotenv.config()
const app = setupApp()
app.listen(process.env.PORT,
  () => {
    console.log(`
    ${String.fromCodePoint(0x1F525)} Server is running on port ${process.env.PORT}
    `)
  }
)
