async function approve(id, username) {
    await Swal.fire({
        title: `Aprovar ${username}`,
        html: `Você tem certeza que quer aprovar <u>${username}?</u>`,
        showCancelButton: true,
        confirmButtonText: `Aprovar`,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            let body = await fetch(`/api/admin/approve/${id}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });
            body = await body.json();
            if (body.success) location.reload()
            else Swal.showValidationMessage(body.message)
        }
    })
    location.reload()
}

async function deny(id) {
    await Swal.fire({
        title: `Multiple Clicks`,
        html: `From 1 to 500`,
        showCancelButton: true,
        input: "number",
        icon: "info",
        confirmButtonText: `Click`,
        showLoaderOnConfirm: true,
        preConfirm: async (reason) => {
            let body = await fetch(`/api/like/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({reason})
            });
            body = await body.json();
          if (body.success) {
      await Swal.fire({
        title: 'Success!',
        text: 'Clicks made successfully!',
        icon: 'success'
      })
      location.href = `/`
    } else {
      let minutos = 15 - Math.ceil((body.time  / 15000) % 15);
      let str = body.message
      let res = body.message;
      if(str.includes('minutos')) {
      res = str.replace("minutos", `${minutos}`);
}
      await Swal.fire({
        title: 'Error',
        text: `${res}`,
        icon: 'error'
      })
      location.href = `/`
    }
        }
    })
    location.reload()
}

async function note(note, username) {
    await Swal.fire({
        title: `Nota de ${username}`,
        text: note,
        confirmButtonText: `Ok`
    })
}