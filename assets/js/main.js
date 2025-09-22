const inputs = Array.from(document.querySelectorAll(".form_input"));
const toupdate = Array.from(document.querySelectorAll(".form_input"));

let search = document.querySelector(".search_in");
const form = document.querySelector("form");
const add = document.querySelector(".add_btn");
let sites = JSON.parse(localStorage.getItem("sites") || "[]");
const removeall = document.querySelector(".removeall_btn");
const errmsg = Array.from(document.querySelectorAll(".err_mes"));



// functions 
const display = () => {
  const result = sites.map((site, index) => {
    return ` <tr>
      <th scope="row">${index}</th>
      <td>${site.sitename}</td>
      <td> <a>${site.sitelink}</a> </td>
      <td>${site.email}</td>
      <td>${site.password}</td>
      <td> <button type="button" onclick='removeitem(${index})' class="btn btn-outline-danger"> Remove </button> </td>
      <td> <button type="button" onclick='edititem(${index})' class="btn btn-outline-success"> Edit </button> </td>
    </tr>`;
  })
  // tabledata: class in table body
  document.querySelector(".tabledata").innerHTML = result.join(" ");
}

removeitem = (index) => {
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your Site has been deleted.",
      icon: "success"
    });
    
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  display();
  }
});

};

edititem = (index) => {
  editindex = index;
  console.log(` edit index = ${index}`)
  add.textContent = "Update"; //btn text
  add.classList.add("update"); // no effect of class, just to know what is the btn role now.
  gitolddata(index);

  //....


  form.addEventListener("submit", () => {
    if (!add.classList.contains("update")) { return };
    if (namevalidation() && emailvalidation() && passwordvalidation()) {
      console.log(`update index = ${index}`)
      sites[editindex].sitename = inputs[0].value;  // add the new data to sites.
      sites[editindex].sitelink = inputs[1].value;
      sites[editindex].email = inputs[2].value;
      sites[editindex].password = inputs[3].value;
      console.log("from  form. 2")
      localStorage.setItem("sites", JSON.stringify(sites));
      display();
      finishediting();
    }

  });



};

function finishediting() {
  form.reset();
  add.textContent = "add";
  add.classList.remove("update");
  removenalidationclasses();
};
namevalidation = () => {
  const regex = /^[A-Z]{1,}[A-z ]*$/;                //   /^[A-Z][a-z]*[0-9]$/;
  if (regex.test(inputs[0].value)) {
    errmsg[0].textContent = " ";
    console.log(`${inputs[0].value} == ${regex.test(inputs[0].value)}`);
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
  }
  else {
    errmsg[0].textContent = "invalid name, should start with Capetal letter";
    errmsg[0].classList.add("text-danger");
    console.log(`${inputs[0].value} == ${regex.test(inputs[0].value)}`);
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
    return false;

  }
};

emailvalidation = () => {
  const regex = /^[a-z]{2,}@[a-z]{1,}\.[a-z]{1,}$/;
  if (regex.test(inputs[2].value)) {
    errmsg[2].textContent = " ";
    console.log(`${inputs[2].value} from1 == ${regex.test(inputs[2].value)}`);

    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    errmsg[2].textContent = "invalid email, EX: abc@gmail.com";
    errmsg[2].classList.add("text-danger");
    console.log(`${inputs[2].value} from else == ${regex.test(inputs[2].value)}`);

    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
};

passwordvalidation = () => {
  const regex = /^[a-z1-9]{6,20}$/;
  if (regex.test(inputs[3].value)) {
    errmsg[3].textContent = " ";
    console.log(`${inputs[3].value} from1 == ${regex.test(inputs[2].value)}`);

    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    errmsg[3].textContent = "invalid password, * at least should contains 3 numbers & 3 letters.";
    errmsg[3].classList.add("text-danger");
    console.log(`${inputs[3].value} from else == ${regex.test(inputs[3].value)}`);

    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
};
gitolddata = (index) => {
  console.log(` old data index = ${index}`)
  toupdate[0].value = sites[index].sitename;     // display the old data in input box.
  toupdate[1].value = sites[index].sitelink;
  toupdate[2].value = sites[index].email;
  toupdate[3].value = sites[index].password;
}

removenalidationclasses = ()=>{
  inputs[0].classList.remove("is-valid" );
  inputs[0].classList.remove("is-invalid" );

  inputs[2].classList.remove("is-valid" );
  inputs[2].classList.remove("is-invalid" );

  inputs[3].classList.remove("is-valid" );
  inputs[3].classList.remove("is-invalid" );

}
// event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (add.classList.contains("update")) { return; } // if btn has update class, then update the data, don't add a new row.
  const info = {
    sitename: inputs[0].value,
    sitelink: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value
  };

  if (namevalidation() && emailvalidation() && passwordvalidation()) {
    console.log(e);
    sites.push(info);
    localStorage.setItem("sites", JSON.stringify(sites));
    form.reset();
    removenalidationclasses()
    
  }
display();

});

removeall.addEventListener("click", () => {
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your sites has been deleted.",
      icon: "success"
    });
    localStorage.removeItem("sites");
  sites = [];
  display();
  }
});
  display();
});

search.addEventListener("input", () => {
  console.log(search.value);
  const result = sites.filter((site) => {
    return site.sitename.toLowerCase().includes(search.value.toLowerCase());
  });
  console.log(`result = ${result}`);


  const result2 = result.map((site, index) => {
    return ` <tr>
      <th scope="row">${index}</th>
      <td>${site.sitename}</td>
      <td> <a>${site.sitelink}</a> </td>
      <td>${site.email}</td>
      <td>${site.password}</td>
      <td> <button type="button" onclick='removeitem(${index})' class="btn btn-outline-danger"> Remove </button> </td>
      <td> <button type="button" onclick='edititem(${index})' class="btn btn-outline-success"> Edit </button> </td>
    </tr>`;
  })
  // tabledata: class in table body
  document.querySelector(".tabledata").innerHTML = result2.join(" ");



});

inputs[0].addEventListener("blur", namevalidation);
inputs[2].addEventListener("blur", emailvalidation);
inputs[3].addEventListener("blur", passwordvalidation);

//  function call
display();