import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min";
import DataTable from "datatables.net-bs5/js/dataTables.bootstrap5.min";
import $ from "jquery";
import { baseUrl } from "./config";
import { get, remove, post } from "./requests";
import TomSelect from "tom-select";
import formJson from "form-data-json-convert";

// import { AddSourceModal } from "./components/modal";

let titlesUrl = `${baseUrl}/titles`;
let projectsUrl = `${baseUrl}/projects`;

$(() => {
  loadTitlesTable();
  prepareAddSourceModal();

  // let addSourceBtn = ".addSource";
  // let addSourceModalId = "#addSourceModal";
  // new AddSourceModal(addSourceModalId, addSourceBtn);
});

// ------- Table Methods Start -------------
const loadTitlesTable = () => {
  let dt = new DataTable();
  let table = dt.$("#titleTable");

  let tableOptions = {
    pageLength: 100,
    processing: true,
    lengthMenu: [
      [100, 200, 500, -1],
      [100, 200, 500, "All"],
    ],
    columns: [
      { data: "project" },
      { data: "title" },
      { data: "duration" },
      { data: "fileSize" },
      { data: "segments" },
      { data: "actions" },
    ],
    columnDefs: [
      {
        targets: [5],
        orderable: false,
      },
    ],
  };

  get(titlesUrl, (data, status) => {
    let updatedData = prepareTitlesData(data);
    table.DataTable({ ...tableOptions, data: updatedData });
    $(".delete").on("click", deleteTitleHandler.bind(null, table));
  });
};

const deleteTitleHandler = (table: DataTable, event: Event) => {
  let row = $(event.target).closest("tr");
  let titleId = row.find("[data-title-id]").attr("data-title-id");
  remove(`${titlesUrl}/${titleId}`, {}, (data, status) => {
    table.DataTable().row(row).remove().draw();
  });
};

const prepareTitlesData = (data) => {
  let deleteIcon = `<i class="bi bi-trash px-2 text-danger fs-5 delete"></i>`;
  return data.map((obj, i) => {
    return {
      ...obj,
      ...{
        title: `<a data-title-id=${obj["id"]} href=${titlesUrl}?title=${obj["id"]}>${obj["title"]}</a>`,
        project: `<a data-title-id=${obj["id"]} href=${titlesUrl}?project=${obj["id"]}>${obj["project"]}</a>`,
        actions: `${deleteIcon}`,
      },
    };
  });
};

// ---------- Table Methods End -------------

export interface Project {
  id?: string;
  name: string;
}

const prepareAddSourceModal = () => {
  createProjectSearchableDropdown();
  onAddNewSourceSubmit();
};

const createProjectSearchableDropdown = () => {
  get(projectsUrl, (projects: Project[], stauts) => {
    new TomSelect("#selectProject", {
      create: addNewProject,
      options: projects.map((project, i) => {
        return { value: project.id, text: project.name };
      }),
      optionClass: "option",
      itemClass: "item",
      render: {
        option_create: (data, escape) =>
          `<div class="create text-primary">Add New Project: <strong>${escape(
            data.input
          )} </strong>&hellip;</div>`,
      },
    });
  });
};

const addNewProject = (input: string, cb: Function) => {
  toggleSpinner();
  post(
    projectsUrl,
    { name: input } as Project,
    (project: Project, status: string) => {
      cb({ value: project.id, text: project.name });
      toggleSpinner();
    }
  );
  return true;
};

const onAddNewSourceSubmit = () =>
  $("#addNewSourceSubmit").on("click", addNewSourceHandler);
const addNewSourceHandler = (event) => {
  event.preventDefault();
  const form = $("#addNewSourceForm");
  const fileObj = $(form).find("[type=file]").prop("files")[0];
  const formObj = formJson.toJson(form[0]);
  const formData = new FormData();
  for (const prop in formObj) {
    formData.append(prop, formObj[prop]);
  }
  formData.append("source", fileObj.name);
  formData.append("fileSize", fileObj.size);
  formData.append("file", fileObj);

  toggleSpinner();
  fetch(titlesUrl, { method: "POST", body: formData })
    .then((data) => {
      data.json();
      toggleSpinner();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  // console.log(res);

  // console.log(JSON.stringify(Object.fromEntries(formData)), fileObj);
};

const toggleSpinner = () => $(".overlay").toggleClass("visually-hidden");
