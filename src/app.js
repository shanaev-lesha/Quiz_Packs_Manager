import express from "express";

export const app = express();

app.use(express.json());

app.use((req,res,next) => {
    console.log("запрос получен");
    next({woo: "war"});

})

app.use((req,res,next) => {
    console.log("запрос получен");
    next(1);

})

app.post("/health", (req, res) => {
  res.json({ status: "works" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use ((error,req,res) => {
    console.error(error);
    res.status(500).send("error")
}
)

// export default app;
