$(document).ready(function () {

  let app = $("#app");
  let table = $("#app > table")

  $.get('/api/wav', (files, staus) => {

    let header = files[0].split('-')
    let tableHeader = `
      <tr>
        <th colspan='3' class="text-center">
          <h1>${header[0]} ${header[1]}</h1>
        <th>
      <tr>
    `

    let rowsHtml = files.map(function (file) {
      return `<tr>
        <td class="align-middle">
          <audio controls> 
            <source src="/wav/${file}" type="audio/wav">
          </audio>
        </td>
        <td class="align-middle">${file}</td>
        <td class="align-middle textbox">
          <input class="form-control"  type="text" id="${file}" name="${file}" size="30" >
        </td>
        <td class="align-middle">
          <i class="fa fa-pencil edit" style="font-size:20px;color:blue;"></i>
          <i class="fa fa-cut delete" style="font-size:20px;color:red;"></i>
          <i class="fa fa-check save" style="font-size:20px;color:green;"></i>
        </td>
      </tr>`
    }).join("")

    table.find("thead").append($(tableHeader));
    table.find("tbody").append($(rowsHtml));

    $(".save").click(function (event) {

      let annotations = $('td.textbox > input').map(function (i, el) {
        return { "fileName": $(el).attr("name"), "textDesc": $(el).val() }
      }).get()
        .filter(d => d["textDesc"].trim() !== "")


      $.ajax({
        'url': '/api/annotations',
        'method': 'POST',
        'dataType': 'json',
        processData: false,
        'contentType': 'application/json',
        'data': JSON.stringify({ annotations: annotations }),
        'success': function (data, status) {
          console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        }

      });
    })

  })

});