$(() => {
  $('#ListaProductos').on('click', () => {
    $.ajax({
      url: '/productos',
      success: (productos) => {
        const tbody = $('tbody');
        tbody.html('');
        productos.forEach((producto) => {
          tbody.append(`
            <tr>
              <td class="id">${producto.id}</td>
              <td>
                <input type="text" class="nombre" value="${producto.nombre}" />
              </td>
              <td>
                <button class="update-button">ACTUALIZAR</button>
                <button class="delete-button">BORRAR</button>
              </td>
            </tr>
          `);
        });
      }
    });
  });

  $('#frmproducto').on('submit', (e) => {
    e.preventDefault();

    const producto = $('#producto');
    $.ajax({
      url: '/productos',
      method: 'POST',
      data: {
        nombre: producto.val()
      },
      success: (reponse) => {
        producto.val('')
        $('#ListaProductos').click();
      },
      erro: (error) => {
        console.log(error);
      }
    });
  });

  $('table').on('click', '.update-button', () => {
    const row = $(this).closest('tr');
    const id = row.find('.id').text();
    const nombre = row.find('.nombre').val();

    $.ajax({
      url: `/productos/${id}`,
      method: 'PUT',
      data: {
        nombre: nombre
      },
      success: (response) => {
        console.log(response);
        $('#ListaProductos').click();
      }
    });
  });
});