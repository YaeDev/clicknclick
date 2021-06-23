$(document).ready(async function () {
  $('#like').click(async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    let { isConfirmed } = await swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "There will be a 12 hours cooldown",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm'
    })
    if (!isConfirmed) return;
    let botid = location.href.split(location.host)[1].replace('/bots/captain/', '').replace('/', '');
    let req = await fetch(`/api/pass/${botid}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' }
    })
    req = await req.json()
    if (req.success === true) {
      await swalWithBootstrapButtons.fire({
        title: 'Success',
        text: 'Now he is your captain!',
        icon: 'success'
      })
      location.href = `/users/${botid}`
    } else {
      let hours = 11 - Math.floor(req.time / 3600000);
      let minutes = 60 - Math.ceil((req.time  / 60000) % 60);
      await swalWithBootstrapButtons.fire({
        title: 'Error',
        text: `You will be able to change your captain in ${hours} hours and ${minutes} minutes`,
        icon: 'error'
      })
      location.href = `/users/${botid}`
    }
  })