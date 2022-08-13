let crud_crud_url =
  "https://crudcrud.com/api/aae2fac3bfff47a9b55c00482cd69567/mydata";

function savetoCrudstorage(event) {
  event.preventDefault();

  let userDetails = {
    My_Expense_Amount: document.getElementById("amount").value,
    Description: document.getElementById("des").value,
    category: document.getElementById("cat").value,
  };

  //   let userDetails_serialized = JSON.stringify(userDetails);

  axios
    .post(crud_crud_url, userDetails)
    .then((response) => {
      showNewUseronScreen(response.data);
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(crud_crud_url)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showNewUseronScreen(response.data[i]);
      }
    })

    .catch((err) => console.log(err));
});

function showNewUseronScreen(userDetails) {
  document.getElementById("amount").value = "";
  document.getElementById("des").value = "";
  document.getElementById("cat").value = "";

  const d = document.getElementById("ul");

  const li = `<li id="${userDetails._id}"> ${userDetails.My_Expense_Amount},${userDetails.Description},${userDetails.category}
  <button onclick = "editUser('${userDetails.My_Expense_Amount}','${userDetails.Description}','${userDetails.category}','${userDetails._id}')"> Edit </button>
  <button onclick = deleteUser('${userDetails._id}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
   </li>`;
  d.innerHTML = d.innerHTML + li;
}

function deleteUser(userId) {
  axios.delete(`${crud_crud_url}/${userId}`).then((response) => {
    removeUserfromScreen(userId);
  });
}

function removeUserfromScreen(userId) {
  let parent = document.getElementById("ul");

  let child = document.getElementById(userId);
  if (child) {
    parent.removeChild(child);
  }
}

function editUser(money, des, cat, userId) {
  document.getElementById("amount").value = money;
  document.getElementById("des").value = des;
  document.getElementById("cat").value = cat;

  deleteUser(userId);
}
