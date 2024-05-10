# Projeto Recipes App

Este é um projeto de app de receitas que utiliza React Hooks e Context API. O projeto consiste em desenvolver um sistema que permite visualizar, buscar, filtrar, favoritar, compartilhar e acompanhar o processo de preparação de receitas e drinks. A base de dados serão 2 APIs distintas, uma para comidas e outra para bebidas. O layout tem como foco dispositivos móveis, dessa forma todos os protótipos vão estar desenvolvidos em telas menores.

## Funcionalidades

* Buscar receitas por ingrediente, nome ou primeira letra
* Explorar receitas por categoria
* Acessar os detalhes de cada receita, com ingredientes, instruções e vídeo
* Iniciar, pausar e finalizar o preparo de uma receita
* Favoritar e desfavoritar receitas

## Tecnologias utilizadas

* HTML
* LocalStorage
* CSS
* JavaScript
* React
* React Hooks
* Context API
* React Router
* Jest
* React Testing Library

## Instalação do projeto localmente

Para instalar o projeto localmente, siga os seguintes passos:

Clone o repositório com o comando 

```javascript
git clone git@github.com:brenolg/App-Recipes-React-Context.git
```

Entre na pasta do projeto com o comando 

```javascript
cd App-Recipes
```

Instale as dependências com o comando

```javascript
 npm install
```

Inicie o servidor local com o comando

```javascript
 npm start
```

Abra o navegador e acesse o endereço http://localhost:3000

## Requisitos do projeto

1. Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login
2. Desenvolva a tela de maneira que a pessoa consiga escrever seu email no input de email e sua senha no input de senha
3. Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos
4. Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave `user`
5. Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login
6. Implemente o header de acordo com a necessidade de cada tela
7. Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil
8. Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la
9. Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo
10. Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter
11. Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas
12. Caso a busca retorne mais de uma receita, renderize as 12 primeiras encontradas, exibindo a imagem e o nome de cada uma
13. Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas
14. Exiba o menu inferior apenas nas telas indicadas pelo protótipo
15. Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior
16. Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card
17. Implemente os botões de categoria para serem utilizados como filtro
18. Implemente o filtro das receitas por meio da API ao clicar no filtro de categoria
19. Implemente o filtro como um toggle, o qual se for selecionado novamente, o app deve retornar as receitas sem nenhum filtro
20. Redirecione a pessoa usuária ao clicar no card para a tela de detalhes, que deve mudar a rota e conter o id da receita na URL
21. Realize uma request para a API passando o `id` da receita que deve estar disponível nos parâmetros da URL
22. Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes seguidos pelas quantidades, instruções, um vídeo do youtube incorporado e recomendações
23. Implemente as recomendações. Para receitas de comida, a recomendação deverá ser bebida, já para as receitas de bebida a recomendação deverá ser comida
24. Implemente os 6 cards de recomendação, mostrando apenas 2. O scroll é horizontal, similar a um `carousel`
25. Desenvolva um botão de nome "Start Recipe" que deve ficar fixo na parte de baixo da tela o tempo todo
26. Implemente a solução de forma que, caso a receita já tenha sido feita, o botão "Start Recipe" desapareça
27. Redirecione a pessoa usuária caso o botão "Start Recipe" seja clicado, a rota deve mudar para a tela de receita em progresso
28. Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com suas respectivas quantidades e instruções
29. Desenvolva um checkbox para cada item da lista de ingredientes
30. Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita
31. Implemente a solução de modo que o botão de finalizar receita ("Finish Recipe") só pode estar habilitado quando todos os ingredientes estiverem _"checkados"_ (marcados)
32. Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo
33. Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar
34. Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um botão de compartilhar
35 Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard
36. Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros
37. Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita
38. Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas), respeitando os atributos descritos no protótipo
39. Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, um botão de compartilhar e um de "desfavoritar"
40. Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, nome, se é alcoólica ou não, um botão de compartilhar e um de "desfavoritar"
41. Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard
42. Desenvolva a solução de modo que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do `localStorage` e da tela
43. Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros
44. Redirecione a pessoa usuária ao clicar na foto ou no nome da receita, a rota deve mudar para a tela de detalhes daquela receita
45. Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo
46. Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível
47. Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout"
48. Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas
49. Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas
50. Redirecione a pessoa usuária que ao clicar no botão de "Logout", o `localStorage` deve ser limpo e a rota deve mudar para a tela de login

## Agradecimentos
Agradecemos à Trybe por nos proporcionar esta oportunidade de aprendizado e desenvolvimento de habilidades. Também agradecemos aos instrutores, colegas e mentores que nos apoiaram e orientaram durante o projeto.
