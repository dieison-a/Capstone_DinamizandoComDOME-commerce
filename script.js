// criando display com todos os produtos
const display = document.querySelector(".display")
const listaProdutos = document.createElement("ul")
listaProdutos.classList.add("listaProdutos")
display.appendChild(listaProdutos)

function criandoDisplay(arrayProdutos) {
    listaProdutos.innerHTML = ""
    arrayProdutos.forEach((element, i) => {

        let itemProduto = document.createElement("li")
        itemProduto.classList.add("itemProduto")
        itemProduto.id = arrayProdutos[i].id
        listaProdutos.appendChild(itemProduto)

        let imgProdutoDisplay = document.createElement("figure")
        imgProdutoDisplay.classList.add("imgProdutoDisplay")
        itemProduto.appendChild(imgProdutoDisplay)

        let imgProduto = document.createElement("img")
        imgProduto.src = arrayProdutos[i].imagem
        imgProduto.alt = arrayProdutos[i].nome
        imgProdutoDisplay.appendChild(imgProduto)

        let descricaoProduto = document.createElement("section")
        descricaoProduto.classList.add("descricaoProduto")
        itemProduto.appendChild(descricaoProduto)

        let categoriaProduto = document.createElement("h4")
        descricaoProduto.appendChild(categoriaProduto)
        let linkCategoriaProduto = document.createElement("a")
        linkCategoriaProduto.innerText = arrayProdutos[i].categoria
        linkCategoriaProduto.classList.add("linkCategoriaProduto")
        linkCategoriaProduto.id = arrayProdutos[i].categoria
        categoriaProduto.appendChild(linkCategoriaProduto)

        let nomeProduto = document.createElement("h2")
        nomeProduto.innerText = arrayProdutos[i].nome
        descricaoProduto.appendChild(nomeProduto)

        let textDescricaoProduto = document.createElement("p")
        textDescricaoProduto.innerText = arrayProdutos[i].descricao
        descricaoProduto.appendChild(textDescricaoProduto)

        let precoProduto = document.createElement("span")
        precoProduto.innerText = `R$${arrayProdutos[i].preco.toFixed(2).replace(".", ",")}`
        descricaoProduto.appendChild(precoProduto)

        let addProduto = document.createElement("a")
        addProduto.id = "addCarrinho"
        addProduto.innerText = "Adicionar ao carrinho"
        descricaoProduto.appendChild(addProduto)

        // adicionando ao Carrinho de Compras
        addProduto.addEventListener("click", (event) => {
            carrinho.push(arrayProdutos[i])
            listaCarrinho()
        })


    })
}
criandoDisplay(produtos)

// criando função do Carrinho de Compras
const carrinhoCompras = document.querySelector(".carrinhoCompras")

function listaCarrinho() {
    const produtosCarrinho = document.querySelector(".produtosCarrinho")
    produtosCarrinho.innerHTML = ""

    carrinho.forEach((_, i) => {

        let itemCarrinho = document.createElement("li")
        itemCarrinho.classList.add("itemCarrinho")
        itemCarrinho.id = carrinho[i].id
        produtosCarrinho.appendChild(itemCarrinho)

        let produtoNoCarrinho = document.createElement("figure")
        produtoNoCarrinho.classList.add("produtoNoCarrinho")
        itemCarrinho.appendChild(produtoNoCarrinho)

        let imgProduto = document.createElement("img")
        imgProduto.src = carrinho[i].imagem
        imgProduto.alt = carrinho[i].nome
        produtoNoCarrinho.appendChild(imgProduto)

        let infosItemCarrinho = document.createElement("div")
        infosItemCarrinho.classList.add("infosItemCarrinho")
        itemCarrinho.appendChild(infosItemCarrinho)

        let nomeProduto = document.createElement("p")
        nomeProduto.innerText = carrinho[i].nome
        infosItemCarrinho.appendChild(nomeProduto)

        let precoProduto = document.createElement("span")
        precoProduto.innerText = `R$${carrinho[i].preco.toFixed(2).replace(".", ",")}`
        infosItemCarrinho.appendChild(precoProduto)

        let removeProduto = document.createElement("a")
        removeProduto.id = "removerProduto"
        removeProduto.innerText = "Remover produto"
        removeProduto.href = "#"
        infosItemCarrinho.appendChild(removeProduto)

        // removendo do Carrinho de Compras
        removeProduto.addEventListener("click", (event) => {
            carrinho.splice(i, 1)
            listaCarrinho()
        })

    })

    // ocultando e mostrando partes específicas
    if (produtosCarrinho.childNodes.length > 0) {
        carrinhoVazio = document.querySelector(".carrinhoVazio").style.display = "none"
        detalhesCompra = document.querySelector(".detalhesCompra").style.display = "flex"

    }
    else {
        carrinhoVazio = document.querySelector(".carrinhoVazio").style.display = "flex"
        detalhesCompra = document.querySelector(".detalhesCompra").style.display = "none"
    }

    // contagem de produtos e soma dos valores
    let quantosItens = document.querySelector("#quantosItens")
    quantosItens.innerText = carrinho.length

    let valorTotalCompra = document.querySelector("#valorTotalCompra")
    let soma = 0
    for (let i = 0; i < carrinho.length; i++) {

        soma += carrinho[i].preco

        valorTotalCompra.innerText = `R$${soma.toFixed(2).replace(".", ",")}`
    }

}
listaCarrinho()

// pesquisando por categoria do produto
const pesquisaCategoria = document.querySelector("#pesquisaCategoria")
const botaoPesquisa = document.querySelector("#botaoPesquisa")
botaoPesquisa.addEventListener("click", (event) => {
    let filtrando = filtroCategorias()
    if (filtrando.length == 0) {
        semProduto = document.querySelector(".semProduto").style.display = "flex"
    }
    else {
        semProduto = document.querySelector(".semProduto").style.display = "none"
    }
    criandoDisplay(filtrando)
})

function filtroCategorias() {
    let categorias = []
    for (let i = 0; i < produtos.length; i++) {
        if (pesquisaCategoria.value == produtos[i].categoria) {
            categorias.push(produtos[i])
        }
    }
    return categorias
}

// pesquisando por itens no Menu
const itensTodos = document.querySelector("#Todos")
itensTodos.addEventListener("click", (event) => {
    let links = linkTodos()
    if (links.length == 0) {
        semProduto = document.querySelector(".semProduto").style.display = "flex"
    }
    else {
        semProduto = document.querySelector(".semProduto").style.display = "none"
    }
    criandoDisplay(links)
})
function linkTodos() {
    let categorias = []
    for (let i = 0; i < produtos.length; i++) {
        if (itensTodos.id == "Todos") {
            categorias.push(produtos[i])
        }
    }
    return categorias
}

const itensAcessorios = document.querySelector("#Acessórios")
itensAcessorios.addEventListener("click", (event) => {
    let links = linkAcessorios()
    if (links.length == 0) {
        semProduto = document.querySelector(".semProduto").style.display = "flex"
    }
    else {
        semProduto = document.querySelector(".semProduto").style.display = "none"
    }
    criandoDisplay(links)
})
function linkAcessorios() {
    let categorias = []
    for (let i = 0; i < produtos.length; i++) {
        if (itensAcessorios.id == produtos[i].categoria) {
            categorias.push(produtos[i])
        }
    }
    return categorias
}

const itensCalcados = document.querySelector("#Calçados")
itensCalcados.addEventListener("click", (event) => {
    let links = linkCalcados()
    if (links.length == 0) {
        semProduto = document.querySelector(".semProduto").style.display = "flex"
    }
    else {
        semProduto = document.querySelector(".semProduto").style.display = "none"
    }
    criandoDisplay(links)
})
function linkCalcados() {
    let categorias = []
    for (let i = 0; i < produtos.length; i++) {
        if (itensCalcados.id == produtos[i].categoria) {
            categorias.push(produtos[i])
        }
    }
    return categorias
}

const itensCamisetas = document.querySelector("#Camisetas")
itensCamisetas.addEventListener("click", (event) => {
    let links = linkCamisetas()
    if (links.length == 0) {
        semProduto = document.querySelector(".semProduto").style.display = "flex"
    }
    else {
        semProduto = document.querySelector(".semProduto").style.display = "none"
    }
    criandoDisplay(links)
})
function linkCamisetas() {
    let categorias = []
    for (let i = 0; i < produtos.length; i++) {
        if (itensCamisetas.id == produtos[i].categoria) {
            categorias.push(produtos[i])
        }
    }
    return categorias
}

// selecionando pelas categorias nos cards
const linkCategoriaProduto = document.getElementsByClassName("listaProdutos")[0]

linkCategoriaProduto.addEventListener("click", (event) => {
    if(event.target.classList.contains("linkCategoriaProduto")){
        let click = event.target.id
        console.log(click);
        let links = linksCards(event)
        console.log(links);
        if (links.length == 0) {
            semProduto = document.querySelector(".semProduto").style.display = "flex"
        }
        else {
            semProduto = document.querySelector(".semProduto").style.display = "none"
        }
        criandoDisplay(links)
    }
})
function linksCards(event) {
    let categorias = []
    for (let i = 0; i < produtos.length; i++) {
        if (event.target.innerText == produtos[i].categoria) {
            categorias.push(produtos[i])
        }
    }
    return categorias
}