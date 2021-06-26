// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNDcxNTY3MiwianRpIjoiZTZhMDZkOTQtMDQxMC00NjRkLTgxMjYtNGNiYTdjNmRmMTE0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjYwZDcyYzMzZDJmNDY3OTBjOTY2MWM5NCIsIm5iZiI6MTYyNDcxNTY3MiwiZXhwIjoxNjI1MzIwNDcyfQ.8KLCFGR7wEtXKgKpFoPa_jpFQyYsfdlE-HpIGkcDbr8';

// GET REQUEST
function getTodos() {
  axios
    .get('http://localhost:5000/api/movies', {
      timeout: 5000
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

function signUp() {
    axios
    .post('http://localhost:5000/api/auth/signup',
    {
        "email": "myemail@email.com",
        "password": "password"
    })
    .then(
        res => showOutput(res))
    .catch(err => console.error(err));
}

function signIn() {
    axios
    .post('http://localhost:5000/api/auth/login',
    {
        "email": "myemail@email.com",
        "password": "password"
    })
    .then(res => showOutputWithToken(res))
    .catch(err => console.error(err));
}

function newMovie() {
    let ran = Math.random();
    var data = JSON.stringify({
        "name": "Dark Knight " + ran,
        "casts": [
          "Christiann Bale",
          "Heath Ledger",
          "Aaron Eckhart",
          "Michael Caine"
        ],
        "genres": [
          "Action",
          "Crime"
        ]
      });
    var config = {
    method: 'post',
    url: 'http://localhost:5000/api/movies',
    headers: { 
        'Authorization': 'Bearer ' + axios.defaults.headers.common['X-Auth-Token'], 
        'Content-Type': 'application/json;charset=utf-8'
    },
    data : data
    };
    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

// POST REQUEST
function addTodo() {
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
    .patch('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated Todo',
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'New Todo',
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
      // validateStatus: function(status) {
      //   return status < 500; // Reject only if status is greater or equal to 500
      // }
    })
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert('Error: Page Not Found');
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCE
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
});
// axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Show output in browser
function showOutputWithToken(res) {
    axios.defaults.headers.common['X-Auth-Token'] = res.data.token;
    console.log(axios.defaults.headers.common['X-Auth-Token']);
    alert('Token Set! now you can add items!')
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('signup').addEventListener('click', signUp);
document.getElementById('signin').addEventListener('click', signIn);
document.getElementById('post').addEventListener('click', newMovie);
//document.getElementById('update').addEventListener('click', updateTodo);
//document.getElementById('delete').addEventListener('click', removeTodo);
//document.getElementById('sim').addEventListener('click', getData);
//document.getElementById('headers').addEventListener('click', customHeaders);
//document
//  .getElementById('transform')
//  .addEventListener('click', transformResponse);
//document.getElementById('error').addEventListener('click', errorHandling);
//document.getElementById('cancel').addEventListener('click', cancelToken);
