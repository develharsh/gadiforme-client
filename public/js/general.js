// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://gadifor.me";

$(document).ready(function () {
  emailCondition();
});

const sendEmail = async (type, message) => {
  // return alert(message);
  $.ajax({
    type: "POST",
    url: `${BASE_URL}/general/sendmail/${type}`,
    data: { message },
  });
};

const emailCondition = () => {
  const visitor = localStorage.getItem("visitor");
  if (!visitor) {
    localStorage.setItem("visitor", new Date().getDay());
    sendEmail("visitor", "new visitor");
  } else if (new Date().getDay() !== Number(visitor)) {
    sendEmail("visitor", "regular visitor");
    localStorage.setItem("visitor", new Date().getDay());
  }
};

const handleSubmitQueryModal = async () => {
  try {
    const Name = $("#Name").val(),
      Phone = $("#Phone").val(),
      fromState = $("#fromState").val(),
      fromCity = $("#fromCity").val();
    // fromPlace = $("#fromPlace").val(),
    // toState = $("#toState").val(),
    // toCity = $("#toCity").val(),
    // toPlace = $("#toPlace").val();
    const payload = {
      Name,
      Phone,
      From: {
        State: fromState,
        City: fromCity,
        // Place: fromPlace,
      },
      // To: {
      //   State: toState,
      //   City: toCity,
      //   Place: toPlace,
      // },
    };
    // return console.log(payload)
    const resp = await $.ajax({
      type: "POST",
      url: `${BASE_URL}/query/add`,
      data: payload,
    });
    Swal.fire({
      icon: "success",
      title: resp.message,
      text: "We will contact you Soon",
      footer: '<a href="tel:+918077015752">Feel Free to Contact</a>',
    });
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: err.responseJSON?.message
        ? err.responseJSON.message
        : "Something went wrong, Please Call for Support",
      footer: '<a href="tel:+918077015752">Call for Support</a>',
    });
  }
};
