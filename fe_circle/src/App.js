import React from 'react'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
function App() {
  return (
    <div className="App">
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

export default App
