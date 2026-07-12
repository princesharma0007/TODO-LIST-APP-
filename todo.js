let title = document.getElementById("title");
let desc = document.getElementById("desc");
let btn = document.getElementById("addBtn");
let list = document.getElementById("list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

 // Show all tasks
function showTasks() {

    list.innerHTML = "";

    tasks.forEach(function (item, index) {

        let task = document.createElement("div");
        task.className = "border p-3 rounded mt-3 bg-gray-100";

        task.innerHTML = `
            <h2 class="text-lg font-bold">${item.title}</h2>
            <p class="mt-1">${item.desc}</p>

            <button class="deleteBtn bg-red-500 text-white px-3 py-1 rounded mt-3">
                Delete
            </button>

            <button class="editBtn bg-blue-500 text-white px-3 py-1 rounded mt-3">
                Edit
            </button>
        `;



        // delete 
        task.querySelector(".deleteBtn").onclick = function () {

            Swal.fire({
                title: "Delete Task?",
                text: "You won't be able to recover it!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ef4444",
                cancelButtonColor: "#3b82f6",
                confirmButtonText: "Yes, Delete"
            }).then((result) => {

                if (result.isConfirmed) {

                    tasks.splice(index, 1);
                    saveTasks();
                    showTasks();

                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Task deleted successfully.",
                        timer: 1200,
                        showConfirmButton: false
                    });
                }

            });

        };

        // Edit
        task.querySelector(".editBtn").onclick = function () {

            let newTitle = prompt("Edit title", item.title);
            let newDesc = prompt("Edit description", item.desc);

            if (newTitle !== null && newDesc !== null) {

                tasks[index].title = newTitle;
                tasks[index].desc = newDesc;

                saveTasks();
                showTasks();
            }

        };

        list.appendChild(task);

    });

}

// Add Task
btn.onclick = function () {

    if (title.value.trim() === "" || desc.value.trim() === "") {
        alert("Fill all fields");
        return;
    }

    tasks.push({
        title: title.value,
        desc: desc.value
    });
    Swal.fire({
        icon: "success",
        title: "Task Added!",
        text: "Your task has been added successfully.",
        timer: 1500,
        showConfirmButton: false
    });
    saveTasks();
    showTasks();

    title.value = "";
    desc.value = "";

};
 
// Load tasks on page refresh
showTasks();
