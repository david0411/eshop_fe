import DevConfig from "./DevConfig.ts";
import ProdConfig from "./ProdConfig.ts";

export default function EnvConfig() {
    if(!process.env.NODE_ENV || process.env.NODE_ENV ==="development")   {
        return DevConfig;
    }   else    {
        return ProdConfig;
    }
}