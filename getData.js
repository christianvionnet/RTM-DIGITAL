let url = window.location.href;
let params = url.split("index");

alert(params[1]);

// const form = document.querySelector("#containerFluid");
// const interferencia = document.querySelector("#taktID");
// const accion = document.querySelector("#accion");
// const responsable = document.querySelector("#responsable");
// const estado = document.querySelector("#estado");
// const vencimiento = document.querySelector("#vencimiento");
// const comentarios = document.querySelector("#comentarios");
// const submitButton = document.querySelector("#submitButton");

async function getData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const taktId = 364594;

getData(
  "http://10.251.225.107/chronosapi/ActionInterference/GetTakt?TaktId=" + taktId
).then((data) => {
  console.log(data);
});

if (taktId) {
  getData(
    "http://10.251.225.107/chronosapi/ActionInterference/GetTakt?TaktId=" +
      taktId
  )
    .then((data) => {
      console.log(data);
      console.log(
        data.TaktId,
        data.Action,
        data.Comentario,
        data.Estado,
        data.Responsable
      );
    })
    .catch((err) => console.log(err));
}

// vamos a usar params
if (params[1]) {
  getData(
    "http://10.251.225.107/chronosapi/ActionInterference/GetTakt?TaktId=" +
      params[1]
  ).then((data) => {
    if (data.TaktId == "") {
      console.log("holis");
    } else {
      console.log("Hay taktid");
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
    }
  });
}

getData(
  "http://10.251.225.107/chronosapi/ActionInterference/GetTakt?TaktId=" +
    params[1]
).then((data) => {
  if (data.TaktId == "") {
    console.log("holis");
  } else {
    console.log("Hay taktid");
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
  }
});

submitButton.addEventListener("click", (event) => {
  if (interferencia.value == "" || accion.value == "" || estado.value == "") {
    window.alert("Los campos con * son obligatorios");
  } else {
    window.alert("Listo!");
    if (vencimiento.value == "") {
      Vencimiento.value = "1-1-1990T00:00";
    }
    postData("http://10.251.225.107/chronosapi/ActionInterference/Save", {
      TaktId: interferencia.value,
      Action: accion.value,
      Responsable: responsable.value,
      Estado: estado.value,
      // Vencimiento: vencimiento.value,
      Comentario: comentarios.value,
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
    items.push(
      accion.value,
      responsable.value,
      estado.value,
      vencimiento.value,
      comentarios.value
    );
    console.log(items);
    setTimeout(refresh, 1000);
  }

  function refresh() {
    form.reset();
  }

  event.preventDefault();
});
