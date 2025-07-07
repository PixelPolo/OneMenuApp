// https://www.npmjs.com/package/cors#configuring-cors
import cors from "cors";

const localhost8080 = "http://localhost:8080";
const localhost4200 = "http://localhost:4200";
const angularClient = "https://onemenu-frontend.onrender.com";

const whitelist: string[] = [localhost8080, localhost4200, angularClient];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    console.log("CORS request from:", origin);
    if (origin == undefined) callback(null, true); // Dev only
    else if (origin && whitelist.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

export default cors(corsOptions);
