const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const app = express();
const mime = require("mime-types");

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// SYNC DATABASE - RUN ONCE!!!
/*const db = require('./app/models/index.ts');
db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });*/

app.use("/uploads", (req, res, next) => {
  const file = req.path.slice(1); // remove leading slash
  const type = mime.lookup(file);

  if (type) {
    res.setHeader("Content-Type", type);
    next();
  } else {
    res.sendStatus(404);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Artstore API" });
});

require("./app/common/routes/delivery_method.routes.ts")(app);
require("./app/common/routes/payment_method.routes.ts")(app);
require("./app/common/routes/product_period.routes.ts")(app);
require("./app/common/routes/product_material.routes.ts")(app);
require("./app/common/routes/product_topic.routes.ts")(app);

require("./app/microservice/routes/user.routes.ts")(app);
require("./app/microservice/routes/product.routes.ts")(app);
require("./app/microservice/routes/order.routes.ts")(app);
require("./app/microservice/routes/user_cart.routes.ts")(app);
require("./app/microservice/routes/voucher.routes.ts")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
