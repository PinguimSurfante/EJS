import express from "express"

const app = express();
const port = process.env.PORT || 3000;


let info = []
let numero = 1

app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", { info })
})

app.get("/add", (req, res) => {
    res.render("adicionar.ejs")
})



app.get("/about", (req,res) => {
    res.render("about.ejs")
})

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const post = info.find((p) => p.id == id);

  if (!post) {
    return res.status(404).send("Post não encontrado");
  }

  res.render("editar.ejs", { post });
});

app.get("/blog/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = info.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post não encontrado");
  }

  res.render("page.ejs", { post });
});



app.post("/submit", (req, res) => {
    console.log(req.body)
    const { title, conteudo } = req.body;
    info.push({
        id: numero++,
        title: title,
        conteudo: conteudo
    });


    res.redirect("/")
})

app.delete("/remove/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = info.findIndex(p => p.id === id);


    if (post !== -1) {
        info.splice(post, 1);
        res.json({ redirect: "/" });
    } else {
        res.status(404).json({ error: "Post não encontrado" });
    }

})

app.put("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const post = info.find((p) => p.id === id)
    const { title, conteudo } = req.body

    if(!post) {
        return res.status(400).send("Id não encontrado")
    }

    post.title = title
    post.conteudo = conteudo

    console.log(info)

    res.json({ message: "Post atualizado com sucesso", post });
})


app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})