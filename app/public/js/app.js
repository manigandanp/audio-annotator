$(document).ready(function () {

  let app = $("#app");
  let table = $("#app > table")

  let urlParams = new URLSearchParams(window.top.location.search)
  let chapterName = urlParams.get('chapter')
  let bookName = urlParams.get('book')

  $.get(`/api/${bookName}/${chapterName}/wavs`, (files, staus) => {

    let tableHeader = `
      <tr>
        <th colspan='3' class="text-center" scope="col">
          <h1>${bookName} ${chapterName}</h1>
        <th>
      <tr>
    `

    let rowsHtml = files.map(function (file) {
      return `<tr>
        <td class="align-middle col-md-3">
          <p> ${file} </p>
          <audio controls> 
            <source src="/api/${bookName}/${chapterName}/wavs/${file}" type="audio/wav">
          </audio>
        </td>
        <td class="align-middle textbox col-md-7">
          <input class="form-control"  type="text" id="${file}" name="${file}" size="30" >
        </td>
        <td class="align-middle col-md-2">
          <div class="d-flex justify-content-around">
            <i class="fa fa-pencil edit" style="font-size:20px;color:blue;"></i>
            <i class="fa fa-cut delete" style="font-size:20px;color:red;"></i>
            <i class="fa fa-check save" style="font-size:20px;color:green;"></i>
          </div>
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