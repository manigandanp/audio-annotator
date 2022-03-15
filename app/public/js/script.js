$(document).ready(function () {

  let baseUrl = "http://localhost:8000"
  let table = $("#app > table")
  $.get(`${baseUrl}/annotations/titles`, (files, staus) => {
    console.log(files);
    let tableHeader = `
      <tr>
        <th class="text-center" scope="col">
          <h1>Titles</h1>
        <th>
      <tr>
    `

    let rowsHtml = files.map(function (file) {
      return `<tr>
        <td class="align-middle col-md-3">
          <p><a href="/annotation?title=${encodeURIComponent(file.title)}" > ${file.title} </a> </p>
        </td>
      </tr>`
    }).join("")

    table.find("thead").append($(tableHeader));
    table.find("tbody").append($(rowsHtml));

    // $("p > a").click(function (event) {
    //   event.preventDefault()
    //   let title = $(event.target).text()
    // })

    // $(".save").click(function (event) {

    //   let annotations = $('td.textbox > input').map(function (i, el) {
    //     return { "fileName": $(el).attr("name"), "textDesc": $(el).val().trim() }
    //   }).get()
    //     .filter(d => d["textDesc"].trim() !== "")
    //   $.ajax({
    //     'url': '/api/annotations',
    //     'method': 'POST',
    //     'dataType': 'json',
    //     processData: false,
    //     'contentType': 'application/json',
    //     'data': JSON.stringify({ annotations: annotations }),
    //     'success': function (data, status) {
    //       $(event.target).parent().append(`<span>${status}</span>`)
    //       console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    //     },
    //     'error': function (xhr, status, err) {
    //       $(event.target).parent().append(`<span>${err}</span>`)
    //       console.log("err: " + JSON.stringify(err) + "\nStatus: " + status);
    //     }
    //   });
    // })

  })

});