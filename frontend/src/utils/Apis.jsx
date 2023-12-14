import { backendurl } from "../constants/urls";

export const fetchData = async (url, options = {}) => {
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

export const getUserDataById = (id) => {
  return new Promise((resolve, reject) => {
    fetchData(`http://${backendurl}/profileById/${id}`).then((data) => {
      if (!data) reject();
      data.jobStr = data.job ? data.job.join(" / ") : "";
      resolve(data);
    });
  });
};

export const getProjectDataById = (id) => {
  fetchData(`http://${backendurl}/project/${id}`).then((data) => {
    if (!data) return;
    return data;
  });
};

export const getProjectsByUserId = (id) => {
  return new Promise((resolve, reject) => {
    fetchData(`http://${backendurl}/user/${id}/projects`).then((data) => {
      console.log(id);
      console.log(data);
      if (!data) return reject();
      resolve(data);
    });
  });
};

export const getMessagesByUserId = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${backendurl}/user/getMessagesByUserId?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return resolve(data);
      });
  });
};

export const getUsersByProjectId = (id) => {
  fetch(`http://${backendurl}/user/profileById/` + id, {
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

export const createNotification = (data) => {
  return new Promise((resolve, reject) => {
    fetch("http://" + backendurl + "/user/createNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return resolve(data);
      });
  });
};

export const deleteNotification = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${backendurl}/user/deleteNotification/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return resolve(data);
      });
  });
};

export const getMessagesByProjectId = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${backendurl}/project/getMessagesByProjectId?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return resolve(data);
      });
  });
};

export const setMessagesByProjectId = (id, messages) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${backendurl}/project/setMessagesByProjectId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, messages }),
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return resolve(data);
      });
  });
};

export const setMessagesByChatId = (id, messages) => {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify({ id, messages }));
    fetch(`http://${backendurl}/user/setMessagesByChatId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, messages }),
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return resolve(data);
      });
  });
};

export const createChat = (id1, id2) => {
  return new Promise((resolve, reject) => {
    fetch(`http://${backendurl}/user/createChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id1, id2 }),
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        return resolve(data);
      });
  });
};
