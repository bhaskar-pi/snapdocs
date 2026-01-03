import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT || 4001,
};

export default ENV;
