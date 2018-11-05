window.addEventListener('DOMContentLoaded',function(){
    var form = document.getElementById('form');
    var inputNombre = document.getElementById('nombres');
    var inputApellidos = document.getElementById('apellidos');
    var inputEdad = document.getElementById('edad');
    var list = document.getElementById('tbListPers');
    var btnAdd  = document.getElementById('btnAdd');
    var TituloEditar = document.getElementById('TituloEditar');

    var todoList = [];
    var ListItem = "";
    var i=0;
    btnAdd.addEventListener("click", addItem);

    //btnRemove.addEventListener("click", removeItem);
    if (localStorage.length > 0) {
        displayList();
    }

    function addItem(){
        todoList.push({ nombres: inputNombre.value,apellidos: inputApellidos.value,edad: inputEdad.value });
        addToLocalStorage();
        limpiarTabla();
        displayList();
        form.reset();
    }

    function removeItem(){
        var dataId = this.getAttribute("data-id");
        removeToLocalStorage(dataId);
        limpiarTabla();
        displayList();
    }
    function editItem(){

        var dataId = this.getAttribute("data-id");
        getToLocalStorage();
        inputNombre.value =    todoList[dataId].nombres;
        inputApellidos.value = todoList[dataId].apellidos;
        inputEdad.value = todoList[dataId].edad;
        btnAdd.removeEventListener('click',addItem);
        btnAdd.innerHTML = "Guardar";
        btnAdd.setAttribute("id","btnGuardar");
        TituloEditar.innerHTML = "Editar Personas";
        var btnGuardar  = document.getElementById('btnGuardar');

        todoList = [];
        //todoList.push({ nombres: inputNombre.value,apellidos: inputApellidos.value,edad: inputEdad.value });

        btnGuardar.addEventListener('click',function(){
            guardarItem(dataId);
        } ,false);

    }
    function getToLocalStorage() {

        if (typeof(Storage) !== "undefined") {
            todoList = JSON.parse(localStorage.getItem("todoList"));
        }
        else {
            alert("browser doesn't support local storage!");
        }
    }

    function addToLocalStorage() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else {
            alert("browser doesn't support local storage!");
        }
    }
    function editToLocalStorage(dataId){

        var todoListCopia = todoList.slice();
        if (typeof(Storage) !== "undefined") {
            todoList = [];
            todoList = JSON.parse(localStorage.getItem("todoList"));
            //todoList[dataId] = todoListCopia;

            todoList.splice(dataId, 1,todoListCopia[0]);
            localStorage.setItem("todoList", JSON.stringify(todoList));
           // todoList.map(function(dato){ console.log(dato.nombres , todoListCopia[0].nombres );});
           // localStorage.setItem("todoList", JSON.stringify(todoList));
           /* if (dato === todoList ){
months.splice(4, 1, 'May');
            }*/
        }
        else {
            alert("browser doesn't support local storage!");
        }
    }
    function removeToLocalStorage(dataId)
    {
        if (typeof(Storage) !== "undefined") {
            todoList = [];
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList.splice(dataId, 1);
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else {
            alert("browser doesn't support local storage!");
        }

    }

    function guardarItem(dataId)
    {
        todoList.push({ nombres: inputNombre.value,apellidos: inputApellidos.value,edad: inputEdad.value });
        console.log(dataId);
        console.log(todoList);

        editToLocalStorage(dataId);
        limpiarTabla();
        displayList();
    }
    function displayList(){
        todoList = JSON.parse(localStorage.getItem("todoList"));

        for (var i = 0; i < todoList.length; i++) {

            var item = "<tr id='li-"+i+"'><td>" + todoList[i].nombres + "</td>" +
                "<td>" + todoList[i].apellidos +  "</td>" +
                "<td>" + todoList[i].edad +  "</td>" +
                "<td> <button type='button' data-id="+i+ " id='li-"+i+"' name='btnRemove' class='btn btn-danger btn-xs btnRemove'>" +
                "<span class='glyphicon glyphicon-trash'></span>" +
                "</button> <button type='button' data-id="+i+ " id='li-"+i+"' name='btnEdit' class='btn btn-danger btn-xs btnEdit'>" +
                "<span class='glyphicon glyphicon-edit'></span>" +
                "</button></td></tr>";
            list.insertAdjacentHTML('beforeend',item);

        }
        var btnRemove = document.getElementsByClassName('btnRemove');
        var btnEdit =   document.getElementsByClassName('btnEdit');
        for (var i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener('click',removeItem,false);
            btnEdit[i].addEventListener('click',editItem,false);
        }
    }

    function limpiarTabla(){
        var tbListPers = document.getElementById("tbListPers");

        while (tbListPers.firstChild) {

            tbListPers.removeChild(tbListPers.firstChild);
        }
    }
});