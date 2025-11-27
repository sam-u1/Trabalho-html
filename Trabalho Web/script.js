let id =0;
let idEditar = null; 
let users = [];

function carrega() {
  id = 0;
  for (let i = 0; i < localStorage.length; i++) {
	const chave = localStorage.key(i);
    	const userJson = localStorage.getItem(chave);
    
    	const user = JSON.parse(userJson);
    	Lista(user);

		users.push(user);
	
    	const maiorChave = Number.parseInt(chave);
    	if (!Number.isNaN(maiorChave) && maiorChave >= id) {
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
			if (Number.parseInt(botaoEditar.classList[1]) === Nmumber.parseInt(userAtualizado.id)) {
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

if (localStorage.length > 0) {
   document.getElementById('lista-contatos').addEventListener('click', function(event) {
	if (event.target.classList.contains('excluir')) {
		const tr = event.target.closest('tr');

		const id = Number.parseInt(event.target.classList[1]);

		const index = users.findIndex(user => user.id === id);

		users.splice(index,1);

		
		localStorage.removeItem(event.target.classList[1]);
		tr.remove();
		if(idEditar){
			idEditar=null;
			document.getElementById('btn-submit').textContent ='Cadastrar';
			document.getElementById('form-contato').reset();
		}
  	}
   });
}

if (localStorage.length > 0) {
   document.getElementById('lista-contatos').addEventListener('click', function(event) {
	if (event.target.classList.contains('editar')) {
		idEditar = event.target.classList[1];
		
		

		
		const userJson = localStorage.getItem(event.target.classList[1]);
		const user = JSON.parse(userJson);
			
		document.getElementById('nome').value = user.nome;
		document.getElementById('email').value = user.email;
		document.getElementById('telefone').value = user.telefone;
		
		
		
		document.getElementById('btn-submit').textContent= 'Salvar Alterações';
  	}
   });
}





