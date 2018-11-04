window.addEventListener('DOMContentLoaded',function(){
    var form = document.getElementById('form');
    var inputNombre = document.getElementById('nombres');
    var inputApellidos = document.getElementById('apellidos');
    var inputEdad = document.getElementById('edad');
    var list = document.getElementById('tbListPers');
    var btnAdd  = document.getElementById('btnAdd');

    var todoList = [];
    var ListItem = "";
    var i=0;
    btnAdd.addEventListener("click", addItem);

    //btnRemove.addEventListener("click", removeItem);
    if (localStorage.length > 0) {
        displayList();
    }

    function addItem(){

       /* var item = "<tr id='li-"+i+"'><td>" + inputNombre.value + "</td>" +
            "<td>" + inputApellidos.value +  "</td>" +
            "<td>" + inputEdad.value +  "</td>" +
            "<td> <button type='button' data-id="+i+ " id='li-"+i+"' name='btnRemove' class='btn btn-default btn-xs btnRemove'>" +
            "<span class='glyphicon glyphicon-remove'></span>" +
            "</button></td></tr>";
        list.insertAdjacentHTML('beforeend',item);*/
        todoList.push({ nombres: inputNombre.value,apellidos: inputApellidos.value,edad: inputEdad.value });
        addToLocalStorage();
        limpiarTabla();
        displayList();
        form.reset();
    }

    function removeItem(){
        var dataId = this.getAttribute("data-id");

        todoList = [];
        todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.splice(dataId, 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        limpiarTabla();
        displayList();
    }


    function addToLocalStorage() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else {
            alert("browser doesn't support local storage!");
        }
    }
    function displayList(){
        todoList = JSON.parse(localStorage.getItem("todoList"));

        for (var i = 0; i < todoList.length; i++) {

            var item = "<tr id='li-"+i+"'><td>" + todoList[i].nombres + "</td>" +
                "<td>" + todoList[i].apellidos +  "</td>" +
                "<td>" + todoList[i].edad +  "</td>" +
                "<td> <button type='button' data-id="+i+ " id='li-"+i+"' name='btnRemove' class='btn btn-danger btn-xs btnRemove'>" +
                "<span class='glyphicon glyphicon-trash'></span>" +
                "</button></td></tr>";
            list.insertAdjacentHTML('beforeend',item);

        }
        var btnRemove  = document.getElementsByClassName('btnRemove');
        for (var i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener('click',removeItem,false);
        }
    }

    function limpiarTabla(){
        var tbListPers = document.getElementById("tbListPers");
        // alert(tbListPers);
        while (tbListPers.firstChild) {
            //alert(tbListPers.firstChild);
            tbListPers.removeChild(tbListPers.firstChild);
        }
    }
});