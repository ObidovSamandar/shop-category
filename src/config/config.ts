import dotenv from "dotenv"
import Path from "path"

dotenv.config({path: Path.join(__dirname,'../','.env')})


interface Config {
    HttpPort: string
    MongoHost: string
    MongoPort: number
    MongoDatabase: string
    MongoPassword: string
    MongoUser: string
    MongoAuthDisable: boolean
    NodeEnv: string 
    JwtSecretWord:string
}

let config: Config = {
    HttpPort: getConf("HTTP_PORT", ""),
    MongoHost: getConf("MONGO_HOST", ""),
    MongoPort: parseInt(getConf("MONGO_PORT", "")),
    MongoDatabase: getConf("MONGO_DATABASE", ""),
    MongoPassword: getConf("MONGO_PASSWORD", ""),
    MongoUser: getConf("MONGO_USER", ""),
    NodeEnv: getConf("NODE_ENV", "development"),
    MongoAuthDisable: true,
    JwtSecretWord: getConf('SECRET_WORD','')
}

function getConf(name: string, def: string = ""): string {
    if (process.env[name]) {
        return process.env[name] || ""
    }

    return def
}

export default config
