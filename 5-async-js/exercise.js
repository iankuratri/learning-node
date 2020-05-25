async function notifyCustomer() {
  try {
    const customer = await getCustomer(1);
    console.log("Customer:", customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log("Top Movies:", movies);
      const emailBody = await sendEmail(customer.email, movies);
      console.log("Email sent with these details:", emailBody);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}
notifyCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email",
      });
    }, 2000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ email, movies });
    }, 2000);
  });
}
