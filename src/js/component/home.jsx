import React, { useEffect, useState } from "react";
import { Lines } from "./lines";
import { element } from "prop-types";

/*create a component*/
const Home = () => {
  const [inputvalue, setinputvalue] = useState("");
  const [sentences, setsentences] = useState([]);

  /* Add New user in API Using [POST] */
  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/smit293", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp.text());
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*Start: Update data in API using Fetch [PUT] */

  const todos = sentences.map((element, index) => {
    return { id: index, done: false, label: element };
  });

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/smit293", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp.text());
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sentences]);
  /*End Here: Update data in API using Fetch [PUT] */

  // /* Delet All data from API*/
  const removeAlldata = () => {
    setsentences([]);
    fetch("https://playground.4geeks.com/apis/fake/todos/user/smit293", {
      method: "PUT",
      body: JSON.stringify([todos.remove]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp.text());
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // setsentences([sentences.splice(1, sentences.length)]);
  };

  /* Delet User with All data*/
  const removeUser = () => {
    setsentences([]);
    fetch("https://playground.4geeks.com/apis/fake/todos/user/smit293", {
      method: "DELETE",
      body: null,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp.text());
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*Functon for add lines */
  const addlines = () => {
    setinputvalue("");
    setsentences([...sentences, inputvalue]);
  };

  /*delete lines*/
  const remove = (ind) => {
    if (sentences.length > 1) {
      setsentences(
        sentences.filter((sentence, index) => {
          return index != ind;
        })
      );
    }
  };

  /* page load get data from API */
  window.onload = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/smit293", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok);
        console.log(resp.status);

        return resp.json();
      })
      .then((data) => {
        const loaddata = data.map((e) => {
          return e.label;
        });

        setsentences([...loaddata]);
        return console.log(JSON.stringify(loaddata));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <h1>todos</h1>
      <div className="card">
        <div className="form">
          <input
            type="text"
            className="text"
            placeholder="What needs to be done?"
            value={inputvalue}
            onChange={(e) => {
              setinputvalue(e.target.value);
            }}
          />
          <button onClick={addlines}>
            <i className="fas fa-plus"></i>
          </button>
          <button onClick={removeAlldata}>DELETE ALL DATA</button>
          <button onClick={removeUser}>DELETE USER</button>
        </div>
        {sentences.map((sentence, index) => {
          return (
            <Lines line={sentence} key={index} btn={() => remove(index)} />
          );
        })}
        <div className="foot">{sentences.length} item Left</div>
      </div>
    </div>
  );
};

export default Home;
