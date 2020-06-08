const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  Profiles = require("./models/profiles");

const uri =
  "mongodb+srv://roshatron:roshatron@facemash-nw9vx.mongodb.net/facemash?retryWrites=true&w=majority";

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  handleError(error);
}
mongoose.Promise = Promise;
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/profiles", (req, res) => {
  Profiles.find()
    .then((profiles) => {
      res.json(profiles);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/profiles/list", (req, res) => {
  Profiles.find().then((profiles) => {
    res.render("profiles.ejs", { profiles: profiles });
  });
});

app.post("/profiles", (req, res) => {
  Profiles.create(req.body)
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/profiles/new", (req, res) => {
  res.render("new");
});

app.get("/profiles/:id", (req, res) => {
  Profiles.findById(req.params.id)
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/profiles/:id", (req, res) => {
  Profiles.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/profiles/:id", (req, res) => {
  Profiles.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ msg: "Deleted" });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(process.env.port || 3000, console.log("Server Started"));
