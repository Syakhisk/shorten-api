document.addEventListener("DOMContentLoaded", function () {
  // const form = document.querySelector("form")
  form.addEventListener("submit", onSubmit)
  copy.addEventListener("click", onCopy)

  async function onSubmit(e){
    e.preventDefault()
    const formData = new FormData(form)

    const data = {
      short: formData.get("short"),
      long: formData.get("long")
    }


    const res = await fetch("/create", {
      method: 'POST', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      body: JSON.stringify(data) 
    });

    const json = await res.json()
    renderResult(json)
  }

  function renderResult(res){
    console.log(res)
    const msgEl = document.createElement("div")
    const successClass = "bg-green-400 border border-green-900 p-2 text-white rounded my-3 bg-opacity-90"
    const failClass = "bg-red-400 border border-red-900 p-2 text-white rounded my-3 bg-opacity-90"

    const shortenedEl = document.createElement("div")

    if(res.code == 200){
      msgEl.classList.add(...successClass.split(" "))
      msgEl.innerText = "Success!"

      shortened_container.classList.remove("hidden")
      shortened.value = `http://sakis.me/${res.short}`

      form.classList.add("hidden")
    } else if(res.code == 409){
      msgEl.classList.add(...failClass.split(" "))
      msgEl.innerText = "Short URL Already Exist!"
    } else if(res.code == 400){
      msgEl.classList.add(...failClass.split(" "))
      msgEl.innerText = "Bad Request!"
    }

    msg.innerHTML = ""
    msg.appendChild(msgEl)
  }

  function onCopy(){
    navigator.clipboard.writeText(shortened.value)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        alert('Error in copying text: ', err);
        console.log(err)
      });
  }

})


