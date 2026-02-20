import app from "./app";
import env from "@config/env";

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${env.BASE_URL}:${port}`);
});
