import app from "./app";
import ENV from "./env";

const port = ENV.PORT;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
