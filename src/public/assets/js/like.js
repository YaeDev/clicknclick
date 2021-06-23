$(document).ready(async function () {
  $('#like').click(async () => {
    await Swal.fire({
      title: 'How many clicks?',
      text: "From 1 to 500",
      showCancelButton: true,
      input: "text",
      confirmButtonText: `Click`,
      showLoaderOnConfirm: true,
      preConfirm: async (reason) => {
    let botid = location.href.split(location.host)[1].replace('/bots/like/', '').replace('/', '');
    let req = await fetch(`/api/like/826507789312327781`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' }
    })
    req = await req.json()
    if (req.success) {
      await swalWithBootstrapButtons.fire({
        title: 'Success!',
        text: 'Clicks made successfully!',
        icon: 'success'
      })
      location.href = `/`
    } else {
      let minutos = 15 - Math.ceil((req.time  / 15000) % 15);
      let str = req.message
      let res = req.message;
      if(str.includes('minutos')) {
      res = str.replace("minutos", `${minutos}`);
}
      await swalWithBootstrapButtons.fire({
        title: 'Error',
        text: `${res}`,
        icon: 'error'
      })
      location.href = `/`
    }
        }
    })
  })
})