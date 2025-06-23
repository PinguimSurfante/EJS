$(".forms").on("submit", function (e) {
  e.preventDefault();

  console.log("Fetch sendo chamado");

  const id = $(this).data("doc");
  const endpoint = `/edit/${id}`;

  const title = $(this).find("input[name='title']").val();
  const conteudo = $(this).find("textarea[name='conteudo']").val();

  const data = {
    title: title,
    conteudo: conteudo,
  };

  fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao Atualizar");
      return res.json();
    })
    .then((result) => {
      console.log("Atualizado com sucesso");
      window.location.href = `/blog/${result.post.id}`;
    })
    .catch((e) => console.error("Erro ao atualizar:", e));
});
