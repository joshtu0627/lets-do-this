const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
};

const getUserDataById = (id) => {
  fetchData(`http://localhost:8000/api/1.0/user/profileById/${id}`).then(
    (data) => {
      if (!data) return;
      data.jobStr = data.job ? data.job.join(" / ") : "";
      return data;
    }
  );
};

const getProjectDataById = (id) => {
  fetchData(`http://localhost:8000/api/1.0/project/${id}`).then((data) => {
    if (!data) return;
    return data;
  });
};

const getProjectsByUserId = (id) => {
  fetch(`http://127.0.0.1:8000/api/1.0/user/${user.id}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      //   console.log(resp);
      return resp.json();
    })
    .then((data) => {
      //   console.log(data);
      return data;
    });
};

const getUsersByProjectId = (id) => {
  fetch("http://localhost:8000/api/1.0/user/profileById/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      //   console.log(resp);
      return resp.json();
    })
    .then((data) => {
      //   console.log(data);
      return data;
    });
};
