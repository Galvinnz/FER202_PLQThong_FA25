// src/components/CounterComponent.jsx
import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

// 1) State khởi tạo
const initialState = { count: 0 };

// 2) Reducer
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    minWidth: "100px" // nút bằng nhau, đồng bộ với Toggle
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        marginBottom: "40px"
      }}
    >
      <Card
        style={{
          width: "420px",               // khung bằng với ToggleComponent
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          borderRadius: "15px",
          border: "2px solid #f0f0f0"
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: "22px", marginBottom: "15px" }}>
          Bộ đếm đa năng
        </h2>

        <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px" }}>
          Giá trị hiện tại:{" "}
          <span style={{ color: "#0d6efd" }}>{state.count}</span>
        </p>

        <div>
          <Button
            onClick={() => dispatch({ type: "increment" })}
            style={{ ...buttonStyle, background: "#007bff", color: "white" }}
          >
            Tăng (+1)
          </Button>

          <Button
            onClick={() => dispatch({ type: "decrement" })}
            style={{ ...buttonStyle, background: "#ffc107", color: "#333" }}
          >
            Giảm (-1)
          </Button>

          <Button
            onClick={() => dispatch({ type: "reset" })}
            style={{ ...buttonStyle, background: "red", color: "white" }}
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CounterComponent;
