const BASE_URL = "http://localhost:3000";

const preProcess = () => {
  $("#homePageForm").submit(function (e) {
    e.preventDefault();
    handleSubmit();
  });
  $(document).ready(function () {//for index/fourth.component.ejs
    var silder = $(".owl-carousel");
    silder.owlCarousel({
      autoPlay: false,
      items: 1,
      center: false,
      nav: true,
      margin: 40,
      dots: false,
      loop: true,
      navText: [
        "<i class='fa fa-arrow-left' aria-hidden='true'></i>",
        "<i class='fa fa-arrow-right' aria-hidden='true'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        575: { items: 1 },
        768: { items: 2 },
        991: { items: 3 },
        1200: { items: 4 },
      },
    });
  });
};

const handleSubmit = () => {
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
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: err.responseJSON.message,
        footer: '<a href="tel:+918077015752">Call for Support</a>',
      });
    });
};
