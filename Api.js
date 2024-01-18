const container = document.querySelector(".container");
const template = document.getElementById("template_pokemon").content;
const btn_Back = document.getElementById("btn_Back");
const btn_following = document.getElementById("btn_following");
let url_following, url_Back, result, json;

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    result = await fetch("https://pokeapi.co/api/v2/pokemon");
    json = await result.json();

    validateFetchError(result);
    disableButtons();
    let pokemons = getListOfPokemon(json);
    assignUrl(json);

    renderPokemon(pokemons);
  } catch (err) {
    handleCatchError(err);
  }

  // Se asignan eventos a botón "siguiente"
  document.addEventListener("click", async (e) => {
    if (e.target.matches(".btn_following")) {
      addPreloader();
      setTimeout(async () => {
        try {
          container.innerHTML = "";
          result = await fetch(url_following);
          json = await result.json();

          validateFetchError(result);
          enableButtons();
          let pokemons = getListOfPokemon(json);
          assignUrl(json);

          renderPokemon(pokemons);
        } catch (err) {
          handleCatchError(err);
        }
      }, 1000);
    }
 //condicional para botón "atras"

 if(e.target.matches("#btn_Back")){
    addPreloader();
      setTimeout(async () => {
        try {
          container.innerHTML = "";
          result = await fetch(url_Back);
          json = await result.json();

          validateFetchError(result);
          assignUrl(json);
          if (url_Back === null){
            disableButtons();
          }
          
          let pokemons = getListOfPokemon(json);
          

          renderPokemon(pokemons);
        } catch (err) {
          handleCatchError(err);
        }
      }, 1000);

 }


  });

  function validateFetchError(res) {
    if (!res.ok) {
      throw { statusText: res.statusText, status: res.status };
    }
  }

  // Desactivar botón atrás
  function disableButtons() {
    btn_Back.disabled = true;
  }

  // Activar botón atrás
  function enableButtons() {
    btn_Back.disabled = false;
  }

  // Se asignan páginas que contiene la API
  function assignUrl(json) {
    url_following = json.next;
    url_Back = json.previous;
  }

  // Obtener propiedades del objeto
  function getListOfPokemon(json) {
    return json.results;
  }

  // Renderizar pokemones al DOM
  function renderPokemon(pokemons) {
    pokemons.forEach(async (el) => {
      let resImage = await fetch(el.url);
      let jsonImage = await resImage.json();
      template.querySelector(".pokemon_image").src = jsonImage.sprites.front_default;
      template.querySelector(".pokemon_image").alt = el.name;
      template.querySelector("figcaption").textContent = el.name;

      let clone = document.importNode(template, true);
      container.appendChild(clone);
    });
  }

  function handleCatchError(err) {
    let message = err.statusText || "Ocurrió un error";
    container.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
  }

  function addPreloader() {
    container.innerHTML = `<div class="container_preloader" style="width: 100%; height: 250px">
      <img src="./image/Preloader.gif" alt="" style="width: 300px; height: 250px;"> 
    </div>`;
  }
});
