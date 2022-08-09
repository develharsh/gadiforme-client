// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://gadifor.me";

const handleSubmitQueryModal = () => {
  const Name = $("#Name").val(),
    Phone = $("#Phone").val();
  $.ajax({
    type: "POST",
    url: `${BASE_URL}/trip/add`,
    data: { Name, Phone },
  })
    .then((resp) => {
      Swal.fire({
        icon: "success",
        title: resp.message,
        text: "We will contact you Soon",
        footer: '<a href="tel:+918077015752">Feel Free to Contact</a>',
      });
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: err.responseJSON.message,
        footer: '<a href="tel:+918077015752">Call for Support</a>',
      });
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    });
};
