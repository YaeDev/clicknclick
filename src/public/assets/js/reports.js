async function approve(id, username) {
    await Swal.fire({
        title: `Ignorar Denúncia`,
        html: `Você deseja ignorar o report de <u>${username}?</u>`,
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

async function deny(id, username) {
    await Swal.fire({
        title: `Aprovar denúncia`,
        html: `Faça uma breve descrição sobre o porquê de você aprovar a denúncia sobre o bot <u>${username}</u>`,
        showCancelButton: true,
        input: "text",
        confirmButtonText: `Negar`,
        showLoaderOnConfirm: true,
        preConfirm: async (reason) => {
            let body = await fetch(`/api/admin/deny/${id}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({reason})
            });
            body = await body.json();
            if (body.success) location.reload()
            else Swal.showValidationMessage(body.message)
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