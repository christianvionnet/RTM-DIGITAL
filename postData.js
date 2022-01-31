//Declaro las variables que voy a utilizar
let items = [];
let url = window.location.href;
let params = url.split("?");

//Selecciono los objetos del DOM con los que voy a trabajar, en este caso los campos del formulario
const form = document.querySelector("#containerFluid");
const interferencia = document.querySelector("#taktID");
interferencia.disabled = true;
interferencia.style.cursor = "not-allowed";
const accion = document.querySelector("#accion");
const responsable = document.querySelector("#responsable");
const estado = document.querySelector("#estado");
const vencimiento = document.querySelector("#vencimiento");
const comentarios = document.querySelector("#comentarios");
const submitButton = document.querySelector("#submitButton");
const deleteButton = document.querySelector("#deleteButton");

//Agrego un manejador de eventos para el click sobre el botón CONFIRMAR
submitButton.addEventListener("click", (event) => {
  if (interferencia.value == "" || accion.value == "" || estado.value == "") {
    window.alert("Los campos con * son obligatorios");
  } else {
    window.alert("Listo!");
    if (vencimiento.value == "") {
      postData("http://10.251.225.107/chronosapi/ActionInterference/Save", {
        TaktId: interferencia.value,
        Action: accion.value,
        Responsable: responsable.value,
        Estado: estado.value,
        Vencimiento: vencimiento.value,
        Comentario: comentarios.value,
      }).then((data) => {
        console.log(data);
      });
    } else if (vencimiento.value != "") {
      putData("http://10.251.225.107/chronosapi/ActionInterference/Modify", {
        TaktId: interferencia.value,
        Action: accion.value,
        Responsable: responsable.value,
        Estado: estado.value,
        Vencimiento: vencimiento.value,
        Comentario: comentarios.value,
      });
    }

    items.push(
      accion.value,
      responsable.value,
      estado.value,
      vencimiento.value,
      comentarios.value
    );
    // console.log(items);
    setTimeout(refresh, 1000);
  }

  function refresh() {
    form.reset();
  }

  event.preventDefault();
});

//Agrego un manejador de eventos para el click sobre el botón BORRAR
deleteButton.addEventListener("click", () => {
  accion.value = "";
  responsable.value = "";
  estado.value = "";
  vencimiento.value = "";
  comentarios.value = "";
  // form.reset();
});

//Defino la funcion postData para escribir en la base de datos con la API
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

//Defino la funcion putData para sobreescribir en la base de datos con la API
async function putData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
}

//Defino la funcion getData para leer la base de datos con la API
async function getData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

//Defino que es lo que ejecutaré bien se cargue la página
//Pregunto primero si es que tengo parámetros enviados en la URL
if (params[1]) {
  getData(
    "http://10.251.225.107/chronosapi/ActionInterference/GetTakt?TaktId=" +
      params[1]
  ).then(
    (data) => {
      let venc = data.Vencimiento.split("T");
      console.log(venc[0]);
      interferencia.value = data.TaktId;
      accion.value = data.Action;
      responsable.value = data.Responsable;
      estado.value = data.Estado;
      vencimiento.value = data.Vencimiento;
      comentarios.value = data.Comentario;
      console.log(data);
      console.log(
        data.TaktId,
        data.Action,
        data.Comentario,
        data.Estado,
        data.Responsable,
        venc[0]
      );
    },
    (error) => {
      console.log("No hay taktid asociado");
      interferencia.value = params[1];
    }
  );
}
