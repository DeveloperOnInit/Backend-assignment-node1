
const express = require("express");
const app = express();
app.use(express.json());


const studentRoutes = require("./routes/routes");

app.use("/api/school", studentRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
