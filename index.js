const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const addEmptyElement = (list) => {
  list.innerHTML += `
    <h4>No SVGs found</h4>
`;
};

const addSVGElement = (list, svgUrl, svgName) => {
  list.innerHTML += `
    <div class="container-item">
        <object width="200px" type="image/svg+xml" data="${svgUrl}"></object>
        <p>${svgName}</p>
    </div>
    `;
};

const emptyList = (list) => {
  list.innerHTML = "";
};

const uploadFiles = (evt) => {
  const list = document.getElementById("fileList");
  const files = Array.from(evt.target.files);
  emptyList(list);
  const svgFiles = files.filter((file) => file.type === "image/svg+xml");
  if (svgFiles.length === 0) {
    addEmptyElement(list);
  }
  svgFiles.forEach((file) => {
    readFile(file).then((svgUrl) => addSVGElement(list, svgUrl, file.name));
  });
};
