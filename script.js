window.addEventListener('DOMContentLoaded',function(){
    var form = document.getElementById('form');
    var inputNombre = document.getElementById('nombres');
    var inputApellidos = document.getElementById('apellidos');
    var inputEdad = document.getElementById('edad');
    var list = document.getElementById('tbListPers');
    var btnAdd  = document.getElementById('btnAdd');

    var id = 1;
    var todoList = [];
    var ListItem = "";
    btnAdd.addEventListener("click", addItem);
    displayList();
    function addItem(){
       // console.log('hola mundo2',inputNombre.value);
        var item = "<tr id='li-"+id+"'><td>" + inputNombre.value + "</td>" +
            "<td>" + inputApellidos.value +  "</td>" +
            "<td>" + inputEdad.value +  "</td></tr>";

        list.insertAdjacentHTML('beforeend',item);
        ListItem = { nombres: inputNombre.value,apellidos: inputApellidos.value,edad: inputEdad.value };
        todoList.push(ListItem);
        id++;
        addToLocalStorage();
        form.reset();
    }
    function displayList(){
        todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.forEach(function (e) {
            console.log(e);
            var item = "<tr id='li-"+id+"'><td>" + e.nombres + "</td>" +
                "<td>" + e.apellidos +  "</td>" +
                "<td>" + e.edad +  "</td></tr>";
            list.insertAdjacentHTML('beforeend',item);
            id++;
        })
    }
    function addToLocalStorage() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else {
            alert("browser doesn't support local storage!");
        }
    }

},false);