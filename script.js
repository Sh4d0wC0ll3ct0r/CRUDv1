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
    eventos();

    //btnRemove.addEventListener("click", removeItem);
    if (localStorage.length > 0) {
        displayList();
    }
    function eventos(){

        document.addEventListener('click',function(e){
            // Fixed

            if(e.target.tagName.toLowerCase() === 'button'){

                        if(e.target.id  === 'btnAdd'){
                            console.log(e.target.id);
                            addItem();
                        }
                        if(e.target.name === 'btnEdit'){
                            editItem(e.target.id);
                        }
                        if(e.target.name === 'update'){
                            guardarItem(e.target.id);
                        }
                        if(e.target.name === 'btnRemove'){
                            removeItem(e.target.id);
                        }
            }
        })
    }
    function addItem(){
        todoList.push({ nombres: inputNombre.value,apellidos: inputApellidos.value,edad: inputEdad.value });
        addToLocalStorage();
        limpiarTabla();
        displayList();
        form.reset();
    }

    function removeItem(id){
        removeToLocalStorage(id);
        limpiarTabla();
        displayList();
    }
    function editItem(dataId){
        console.log(dataId);
        getToLocalStorage();
        inputNombre.value =    todoList[dataId].nombres;
        inputApellidos.value = todoList[dataId].apellidos;
        inputEdad.value = todoList[dataId].edad;
        document.getElementById("btnAdd").setAttribute("id",dataId);
        document.getElementById(dataId).setAttribute("name","update");
        document.getElementById(dataId).innerText = "Guardar";
        document.getElementById("TituloEditar").innerText = "Editar Persona";
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
            todoList.splice(dataId, 1,todoListCopia[0]);
            localStorage.setItem("todoList", JSON.stringify(todoList));
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
        todoList = [];
        todoList.push({ nombres: inputNombre.value,apellidos: inputApellidos.value,edad: inputEdad.value });
        editToLocalStorage(dataId);
        document.getElementsByName("update")[0].id = "btnAdd";
        document.getElementById("btnAdd").innerText = "Agregar";
        document.getElementById("btnAdd").setAttribute("name","");
        document.getElementById("TituloEditar").innerText = "Agregar Persona";
        limpiarTabla();
        displayList();
        form.reset();

    }
    function displayList(){
        todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.innerHTML="";
        for (var i = 0; i < todoList.length; i++) {

            var item = "<tr id='li-"+i+"'><td>" + todoList[i].nombres + "</td>" +
                "<td>" + todoList[i].apellidos +  "</td>" +
                "<td>" + todoList[i].edad +  "</td>" +
                "<td> <button type='button'  id="+i+" name='btnRemove' class='btn btn-danger glyphicon glyphicon-trash btnRemove'>" +
                "</button> <button type='button' data-id="+i+ " id="+i+" name='btnEdit' class='btn btn-primary glyphicon glyphicon-edit btnEdit'>" +
                "</button></td></tr>";
            list.insertAdjacentHTML('beforeend',item);

        }

    }

    function limpiarTabla(){
        var tbListPers = document.getElementById("tbListPers");

        while (tbListPers.firstChild) {

            tbListPers.removeChild(tbListPers.firstChild);
        }
    }
});