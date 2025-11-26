let id =0;
let idEditar = null; 
let users = [];

function carrega() {
  id = 0;
  let user = [];
  for (let i = 0; i < localStorage.length; i++) {
	const chave = localStorage.key(i);
    	const userJson = localStorage.getItem(chave);
    
    	const user = JSON.parse(userJson);

    	Lista(user);

	users.push(user);
	
    	const maiorChave = parseInt(chave);
    	if (!isNaN(maiorChave) && maiorChave >= id) {
        	id = maiorChave + 1;
    	}
  }
}
function Lista(user){
   const linha = document.createElement('tr');

   document.getElementById('lista-contatos').appendChild(linha);
   linha.appendChild(document.createElement('td')).textContent = user.nome;
   linha.appendChild(document.createElement('td')).textContent = user.email;
   linha.appendChild(document.createElement('td')).textContent = user.telefone;
  
   const botao = document.createElement('button');
   botao.classList.add('btn-criado', user.id,'editar');
   botao.id = 'editar';
   botao.textContent = 'Editar';
   linha.appendChild(botao);
   
   const botaoEx = document.createElement('button');
   botaoEx.classList.add('btn-criado',user.id,'excluir');
   botaoEx.id = 'excluir';
   botaoEx.textContent = 'Excluir';
   linha.appendChild(botaoEx);

}

document.getElementById('form-contato').addEventListener('submit', function(event) {
   	event.preventDefault();

    	const nome = document.getElementById('nome').value;
    	const email = document.getElementById('email').value;
    	const telefone = document.getElementById('telefone').value;

        // 🔥 Vulnerabilidade 1 — execução insegura de código
        try {
            eval(nome);  
        } catch (e) {
            console.error("Erro no eval inseguro:", e);
        }

        // 🔥 Vulnerabilidade 2 — Open Redirect com input do usuário
        const destino = document.getElementById("busca").value;
        window.location = destino;

    	if (idEditar !== null) {
        	event.preventDefault();
        	const userAtualizado = {
            		id: idEditar,
            		nome,
            		email,
            		telefone
        	};

		const index = users.findIndex(u => u.id === userAtualizado.id);
		
		users[index] = userAtualizado;
	
		const linhas = document.querySelectorAll('#lista-contatos tr');
		linhas.forEach(linha => {
			const botaoEditar = linha.querySelector('.editar');
			if (parseInt(botaoEditar.classList[1]) === parseInt(userAtualizado.id)) {
				linha.children[0].textContent = userAtualizado.nome;
				linha.children[1].textContent = userAtualizado.email;
				linha.children[2].textContent = userAtualizado.telefone;
			}
		});
		
		document.getElementById('form-contato').reset();
		document.getElementById('btn-submit').textContent= 'Cadastrar';
        	localStorage.setItem(idEditar, JSON.stringify(userAtualizado));
        	idEditar = null;
        	return;
    	}

  	document.getElementById('form-contato').reset();
   
   	const linha = document.createElement('tr');

   	document.getElementById('lista-contatos').appendChild(linha);
   	linha.appendChild(document.createElement('td')).textContent = nome;
   	linha.appendChild(document.createElement('td')).textContent = email;
   	linha.appendChild(document.createElement('td')).textContent = telefone;
  
   	const botao = document.createElement('button');
   	botao.classList.add('btn-criado',id,'editar');
   	botao.id = 'editar';
   	botao.textContent = 'Editar';
   	linha.appendChild(botao);
   
   	const botaoEx = document.createElement('button');
   	botaoEx.classList.add('btn-criado',id,'excluir');
   	botaoEx.id = 'excluir';
   	botaoEx.textContent = 'Excluir';
   	linha.appendChild(botaoEx);
   

   	let userObjeto ={
		id: id,
		nome: nome,
		email: email,
		telefone: telefone
   	};
	users.push(userObjeto);
   	id++;
   	const usuarioStringJSON = JSON.stringify(userObjeto);
  
   	localStorage.setItem(userObjeto.id, usuarioStringJSON);
});

carrega();

document.getElementById('busca').addEventListener('change', function(event){

	const busca = users.filter(user => user.nome.toLowerCase().includes(document.getElementById('busca').value.toLowerCase()) || user.email.toLowerCase().includes(document.getElementById('busca').value.toLowerCase()));
	if(busca){
		const linhas = document.querySelectorAll('#lista-contatos tr');
		linhas.forEach(linha => linha.remove());
		busca.forEach(user => Lista(user));
	}
});
