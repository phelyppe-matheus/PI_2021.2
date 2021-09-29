const turnOnEditMode = (id) => {
        console.log('try to edit')
        const servicoDiv = document.getElementById(id)
        const itens_servico_span = servicoDiv.querySelectorAll('span')
        const itens_servico_input = servicoDiv.querySelectorAll('input')

        limit = new Date(itens_servico_span[6].innerText)

        itens_servico_input[0].value = itens_servico_span[1].innerText
        itens_servico_input[1].value = itens_servico_span[2].innerText
        itens_servico_input[2].value = itens_servico_span[3].innerText
        itens_servico_input[3].value = itens_servico_span[4].innerText
        itens_servico_input[4].value = limit.toISOString().split('T')[0]

        itens_servico_input[0].hidden = false
        itens_servico_input[1].hidden = false
        itens_servico_input[2].hidden = false
        itens_servico_input[3].hidden = false
        itens_servico_input[4].hidden = false

        itens_servico_span[1].hidden = true
        itens_servico_span[2].hidden = true
        itens_servico_span[3].hidden = true
        itens_servico_span[4].hidden = true
        itens_servico_span[6].hidden = true

        servicoDiv.editmode = true
}

const turnOffEditMode = (id) => {
    console.log('try to edit')
    const servicoDiv = document.getElementById(id)
    const itens_servico_span = servicoDiv.querySelectorAll('span')
    const itens_servico_input = servicoDiv.querySelectorAll('input')

    itens_servico_span[1].innerText = itens_servico_input[0].value
    itens_servico_span[2].innerText = itens_servico_input[1].value
    itens_servico_span[3].innerText = itens_servico_input[2].value
    itens_servico_span[4].innerText = itens_servico_input[3].value
    itens_servico_span[6].innerText = new Date(itens_servico_input[4].value.split('-'))

    itens_servico_input[0].hidden = true
    itens_servico_input[1].hidden = true
    itens_servico_input[2].hidden = true
    itens_servico_input[3].hidden = true
    itens_servico_input[4].hidden = true

    itens_servico_span[1].hidden = false
    itens_servico_span[2].hidden = false
    itens_servico_span[3].hidden = false
    itens_servico_span[4].hidden = false
    itens_servico_span[6].hidden = false

    servicoDiv.editmode = false
}

const editMode = async (id) => {
    console.log('send the edit')
    const servicoDiv = document.getElementById(id)
    const itens_servico_input = servicoDiv.querySelectorAll('input')

    const title = itens_servico_input[0].value
    const budget = itens_servico_input[1].value
    const description = itens_servico_input[2].value
    const comments = itens_servico_input[3].value
    const limit = itens_servico_input[4].value

    const service = {
        title: title,
        budget: budget,
        description: description,
        comments: comments,
        limit: new Date(limit.split('-')),
        register: new Date(Date.now())
    }

    const init = {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(service)
    }

    const response = await fetch(`http://localhost:3000/servicos/${id}`, init)
    const dados = await response.json()

    createServicoTemplate({id: dados.id, ...service})
    turnOffEditMode(id)
}

const editServico = (id) => {
    return () => {document.getElementById(id).editmode ? editMode(id) : turnOnEditMode(id)}
}

const deleteServico = (id) => {
    return async () => {
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }
        }

        const response = await fetch(`http://localhost:3000/servicos/${id}`, init)
        if (await response.status === 204){
            document.getElementById(id).remove()
        }
    }
}

const createServico = async () => {
    const title = document.getElementById('title').value
    const budget = document.getElementById('budget').value
    const description = document.getElementById('description').value
    const comments = document.getElementById('comments').value
    const limit = document.getElementById('limit').value

    const service = {
        title: title,
        budget: budget,
        description: description,
        comments: comments,
        limit: new Date(limit.split('-')),
        register: new Date(Date.now())
    }

    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(service)
    }

    const response = await fetch('http://localhost:3000/servicos', init)
    const dados = await response.json()

    createServicoTemplate({id: dados.id, ...service})
}

const createServicoTemplate = (dados) => {
    const containerFilmeElement = document.getElementById('container-services')

    const template = document.getElementById('service-template')

    const servicoElement = document.importNode(template.content, true)

    const itens_servico = servicoElement.querySelectorAll('span')
    const delete_button = servicoElement.querySelector('button.delete-button')
    const edit_button = servicoElement.querySelector('button.edit-button')

    servicoElement.querySelector('div').id = dados.id
    itens_servico[0].innerText = dados.id
    itens_servico[1].innerText = dados.title
    itens_servico[2].innerText = dados.budget
    itens_servico[3].innerText = dados.description
    itens_servico[4].innerText = dados.comments
    itens_servico[5].innerText = new Date(dados.register).toISOString().split('T')[0]
    itens_servico[6].innerText = new Date(dados.limit).toISOString().split('T')[0]

    delete_button.onclick = deleteServico(dados.id)
    edit_button.onclick = editServico(dados.id)
    containerFilmeElement.prepend(servicoElement)
}

const carregarServicos = async () => {
    const response = await fetch('http://localhost:3000/servicos')
    const dados = await response.json()

    dados.reverse().forEach(item => {
         createServicoTemplate(item)
         console.log(item.id)
    });
}

window.onload = () => {
    carregarServicos()
    console.log('successfully loaded')
    const btnNovoServices = document.getElementById('btnAddServices')
    btnNovoServices.onclick = createServico
}


