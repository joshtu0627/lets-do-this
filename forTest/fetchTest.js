const handleSubmit = async () => {
  const isLoggedInResponse = await fetch(
    "http://localhost:8000/api/1.0/user/isLoggedIn",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTcwMTYyMjcwOSwiZXhwIjoxNzAxNjI2MzA5fQ.cdMwvdpszSGr8REu9vfhI-VyvJ_0E1rJ2mtSaZmW-Kc`,
      },
    }
  );
  console.log(isLoggedInResponse);
};

handleSubmit();
