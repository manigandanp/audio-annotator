let baseUrl = "http://localhost:8000"
$(document).ready(function () {

  let table = $("#app table")
  let urlParams = new URLSearchParams(window.top.location.search)
  let title = urlParams.get('title')
  $('#title').text(title)

  $.get(`${baseUrl}/annotations/titles/${title}`, (files, staus) => {
    // setting this for future use
    let sortedFiles = files.sort(sortByEndSample)
    window.annotations = sortedFiles

    let tableHeader = `
      <tr>
        <th colspan='3' class="text-center" scope="col">
          <h1>${title}</h1>
        <th>
      <tr>
    `

    let rowsHtml = sortedFiles.map(function (file) { return generateTableRow(file) }).join("")

    table.find("thead").append($(tableHeader));
    table.find("tbody").append($(rowsHtml));

    $("#merge").click(function (event) {
      let checkedInputElms = $("input[type=checkbox]:checked")
      let filesToMerge = checkedInputElms.map(function (i, el) {
        let filename = $(el).attr('id')
        return annotations.filter((obj) => obj.filename == filename)
      }).get()
      let postData = getPostDataForMergeSignals(filesToMerge)
      let endPoint = `${baseUrl}/segment/samples`
      let METHOD = 'POST'
      console.log("Merging signal....");
      ajaxRequest(METHOD, endPoint, postData, function (data, status) {
        console.log("Successfull signal has been merged", status);
        window.annotations = [...window.annotations, ...data].sort(sortByEndSample)
        let rows = data.map((file) => generateTableRow(file)).join("")
        checkedInputElms.last().parent().parent().parent().after($(rows))
        checkedInputElms.map(function (i, el) {
          $(el).prop('checked', false)
          $(el).parent().parent().parent().find('input.textdesc').prop('disabled', true)
        })
        // alert("Successfully merged")
      }, function (xhr, status, err) {
        console.log(`Error while merging signals ${status} - ${err}`);
        alert("Error while merging")
      })
    });

    // $('.edit').click(function (event) {
    $('body').on('click', '.edit', function (event) {
      $(event.target).parent().parent().find('span').remove()
      $(event.target).parent().parent().parent().find('input.textdesc').first().prop('disabled', false)
    })

    // $('.save').click(function (event) {
    $('body').on('click', '.save', function (event) {
      let el = $(event.target).parent().parent().parent().find('input.textdesc').first()
      let textDesc = cleanStr(el.val())
      if (textDesc) {
        let filename = el.attr('id')
        let obj = window.annotations.filter((obj) => obj.filename == filename)[0]
        let updatedObj = Object.assign({}, obj, { text_desc: textDesc })
        let endPoint = `${baseUrl}/annotations`
        let METHOD = 'PUT'
        console.log("Updating annotaions....");
        ajaxRequest(METHOD, endPoint, updatedObj, function (data, status) {
          console.log("Successfull signal has been merged", status, data);
          updateStatus($(event.target).parent().parent(), status)
          el.prop('disabled', true)
          // alert("Successfully saved annotaions")
        }, function (xhr, status, err) {
          console.log(`Error while updating annotations ${status} - ${err}`);
          // $("").parent().find('span').remove('span')
          updateStatus($(event.target).parent().parent(), status)
          // alert("Error while saving..")
        })
      } else updateStatus($(event.target).parent().parent(), "No Desc")
    })


    // $("input.textdesc").change(function (event) {
    $("body").on('change', "input.textdesc", function (event) {
      let textDesc = cleanStr($(this).val())
      let filename = $(this).attr('id')
      let targetElm = $(event.target).parent().parent().find('.saveicons')
      if (textDesc) {
        let obj = window.annotations.filter((obj) => obj.filename == filename)[0]
        let updatedObj = Object.assign({}, obj, { text_desc: textDesc })
        let endPoint = `${baseUrl}/annotations`
        let METHOD = 'PUT'
        console.log("Updating annotaions....");
        ajaxRequest(METHOD, endPoint, updatedObj, function (data, status) {
          console.log("Successfull signal has been merged", status, data);
          updateStatus(targetElm, status)
          $(event.target).prop('disabled', true)
        }, function (xhr, status, err) {
          console.log(`Error while updating annotations ${status} - ${err}`);
          updateStatus(targetElm, status)
        })
      } else updateStatus(targetElm, "No Desc")

    })

    $("textarea").change(function (event) {
      $(this).val($(this).val().trim().replace(/“|”|<\/\s?div>|…/g, '').replace(/–/g, '-').replace(/‘|’/g, "'"))
    })

  })

});

function updateStatus(targetElm, status) {
  targetElm.find('span').remove('span')
  targetElm.append(`<span>${status}</span>`)
}


function sortByEndSample(a, b) { if (a.end < b.end) return -1; else return 0 }

function generateTableRow(file) {
  let absolute_filepath = file.filename
  let filename = getFilename(absolute_filepath)
  let textDescTD = file.text_desc
    ? `<input class="form-control textdesc"  type="text" id="${absolute_filepath}" name="${filename}" size="30" value="${file.text_desc}" disabled></input>`
    : `<input class="form-control textdesc"  type="text" id="${absolute_filepath}" name="${filename}" size="30" > </input>`

  return `<tr>
        <td class="align-middle col-md-3">
          <audio controls> 
            <source src="/api/wavs?wav=${absolute_filepath}" type="audio/wav">
          </audio>
        </td>
        <td class="align-middle col-md-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="${absolute_filepath}" name="${filename}" value="${filename}">
            <label class="form-check-label" for="${filename}" > ${filename} </label>
          </div>
        </td>
        <td class="align-middle textbox col-md-6">
          ${textDescTD}
        </td>
        <td class="align-middle saveicons col-md-1">
          <div class="d-flex justify-content-around">
            <i class="fa fa-pencil edit" style="font-size:20px;color:blue;"></i>
            <i class="fa fa-check save" style="font-size:20px;color:green;"></i>
          </div>
        </td>
      </tr>`
}


function cleanStr(str) {
  return str.trim().replace(/\s\s+/g, ' ')
}

function getPostDataForMergeSignals(filesToMerge) {
  let firstObj = filesToMerge[0],
    lastObj = filesToMerge.slice(-1)[0],
    start = firstObj.start,
    end = lastObj.end;
  let result = {
    title: firstObj.title,
    start: start,
    end: end,
    source: firstObj.source,
    destination: firstObj.filename.split('/').slice(0, -1).join('/'),
    file_prefix: `${start}_${end}`
  }

  return result
}

function getFilename(filePath) {
  return filePath.split('/').slice(-1)[0]
}

function ajaxRequest(method, endPoint, data, successcb, errorcb) {

  $.ajax({
    'url': `${endPoint}`,
    'method': method,
    'dataType': 'json',
    processData: false,
    crossDomain: true,
    'contentType': 'application/json',
    'data': JSON.stringify(data),
    'success': successcb,
    'error': errorcb
    // 'success': function (data, status) {
    //   $(event.target).parent().append(`<span>${status}</span>`)
    //   console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    // },
    // 'error': function (xhr, status, err) {
    //   $(event.target).parent().append(`<span>${err}</span>`)
    //   console.log("err: " + JSON.stringify(err) + "\nStatus: " + status);
    // }
  })
}

